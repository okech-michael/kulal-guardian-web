/*
  Backend scaffold for Safaricom Daraja STK Push.
  - Does not hardcode credentials; reads required values from environment variables.
  - Endpoint: POST /api/donations/mpesa
    body: { phone, amount, type, donation_id? }
    
  Updated to support multi-step donation flow:
  - Accepts donation_id to update donation record with Daraja response
  - Stores checkout_request_id and merchant_request_id in donation record
  - Updates payment_status to 'initiated'

  NOTE: To enable live requests, set the following env vars in your deployment environment:
    DARAJA_CONSUMER_KEY
    DARAJA_CONSUMER_SECRET
    DARAJA_PASSKEY
    DARAJA_SHORTCODE
    DARAJA_BASE_URL
    DARAJA_CALLBACK_URL
    PUBLIC_SUPABASE_URL
    SUPABASE_SERVICE_ROLE_KEY

  The handler will return 501 if credentials are not configured.
*/

import { getSupabaseAdmin, normalizePhone, updateDonation } from "./_shared.js";

function parseRequestBody(req) {
  if (typeof req?.body === "string") {
    try {
      return JSON.parse(req.body) || {};
    } catch {
      return {};
    }
  }

  return req?.body || {};
}

function describeDarajaResponse(payload, fallback) {
  if (!payload || typeof payload !== "object") return fallback;

  return payload.errorMessage || payload.errorDescription || payload.ResponseDescription ||
    payload.ResultDesc || payload.raw || fallback;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { phone, amount, type, donation_id } = parseRequestBody(req);
  if (!phone || !amount) return res.status(400).json({ message: "Missing phone or amount" });

  if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
    return res.status(400).json({ message: "Amount must be greater than zero", field: "amount" });
  }

  const normalizedPhone = normalizePhone(phone);
  if (!normalizedPhone || !/^2547\d{8}$/.test(normalizedPhone)) {
    return res.status(400).json({ message: "Phone number must be a valid Safaricom number in the format 07XXXXXXXX." });
  }

  if (!donation_id) {
    return res.status(400).json({ message: "Missing donation ID" });
  }

  const markFailed = async (reason) => {
    try {
      await updateDonation(getSupabaseAdmin(), donation_id, {
        payment_status: "failed",
        failure_reason: reason,
      });
    } catch (error) {
      console.error("Unable to mark donation failed:", error);
    }
  };

  const {
    DARAJA_CONSUMER_KEY,
    DARAJA_CONSUMER_SECRET,
    DARAJA_PASSKEY,
    DARAJA_SHORTCODE,
    DARAJA_BASE_URL,
    DARAJA_CALLBACK_URL,
  } = process.env;

  const darajaBaseUrl = DARAJA_BASE_URL?.replace(/\/$/, "");

  const missing = [];
  if (!DARAJA_CONSUMER_KEY) missing.push("DARAJA_CONSUMER_KEY");
  if (!DARAJA_CONSUMER_SECRET) missing.push("DARAJA_CONSUMER_SECRET");
  if (!DARAJA_PASSKEY) missing.push("DARAJA_PASSKEY");
  if (!DARAJA_SHORTCODE) missing.push("DARAJA_SHORTCODE");
  if (!darajaBaseUrl) missing.push("DARAJA_BASE_URL");
  if (!DARAJA_CALLBACK_URL) missing.push("DARAJA_CALLBACK_URL");

  if (missing.length) {
    await markFailed("Daraja credentials are not configured");
    return res.status(501).json({
      message: "Daraja credentials not configured. Missing environment variables.",
      missing,
    });
  }

  try {
    new URL(darajaBaseUrl);
    new URL(DARAJA_CALLBACK_URL);
  } catch {
    await markFailed("Invalid Daraja URL configuration");
    return res.status(500).json({
      message: "Invalid Daraja URL configuration",
      fields: ["DARAJA_BASE_URL", "DARAJA_CALLBACK_URL"],
    });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data: donation, error: donationError } = await supabase
      .from("donations")
      .select("id, amount, payment_status")
      .eq("id", donation_id)
      .maybeSingle();
    if (donationError || !donation) {
      return res.status(404).json({ message: "Donation not found" });
    }
    if (!["pending", "failed", "cancelled"].includes(donation.payment_status)) {
      return res.status(409).json({ message: "This donation is already being processed" });
    }

    // 1. Get access token
    const tokenRes = await fetch(`${darajaBaseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${DARAJA_CONSUMER_KEY}:${DARAJA_CONSUMER_SECRET}`).toString("base64")}`,
      },
    });

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      let detail;
      try {
        detail = JSON.parse(text);
      } catch {
        detail = text;
      }
      await markFailed("Failed to obtain Daraja token");
      return res.status(502).json({
        message: "Failed to obtain Daraja token",
        status: tokenRes.status,
        detail,
        reason: describeDarajaResponse(detail, "Daraja rejected the OAuth request"),
        hint: "Check that your Daraja consumer key/secret are correct, the sandbox account is active, and the app is using the same environment in Vercel.",
      });
    }

    const tokenJson = await tokenRes.json();
    const accessToken = tokenJson.access_token;

    // 2. Prepare STK Push payload
    const timestampParts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Nairobi",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date()).reduce((parts, part) => {
      if (part.type !== "literal") parts[part.type] = part.value;
      return parts;
    }, {});
    const timestamp = `${timestampParts.year}${timestampParts.month}${timestampParts.day}${timestampParts.hour}${timestampParts.minute}${timestampParts.second}`;
    const password = Buffer.from(`${DARAJA_SHORTCODE}${DARAJA_PASSKEY}${timestamp}`).toString("base64");

    const stkBody = {
      BusinessShortCode: DARAJA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: normalizedPhone,
      PartyB: DARAJA_SHORTCODE,
      PhoneNumber: normalizedPhone,
      CallBackURL: DARAJA_CALLBACK_URL,
      AccountReference: `WazeeDonation-${type}`,
      TransactionDesc: `Donation ${type}`,
    };

    const stkRes = await fetch(`${darajaBaseUrl}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stkBody),
    });

    const stkText = await stkRes.text();
    let stkJson;
    try {
      stkJson = JSON.parse(stkText);
    } catch {
      stkJson = { raw: stkText };
    }

    if (!stkRes.ok) {
      await markFailed("Daraja STK Push failed");
      return res.status(502).json({
        message: "Daraja STK Push failed",
        status: stkRes.status,
        detail: stkJson,
        reason: describeDarajaResponse(stkJson, "Daraja rejected the STK Push request"),
        hint: "Check that your sandbox shortcode, passkey, callback URL, and phone number format are valid for Safaricom's test environment.",
      });
    }

    // If donation_id provided, update donation record with Daraja response
    try {
      const checkoutRequestId = stkJson?.CheckoutRequestID || null;
      const merchantRequestId = stkJson?.MerchantRequestID || null;
      if (!checkoutRequestId || !merchantRequestId) {
        await markFailed("Daraja returned no request identifiers");
        return res.status(502).json({ message: "Daraja returned an incomplete STK response" });
      }

      await updateDonation(supabase, donation_id, {
        checkout_request_id: checkoutRequestId,
        merchant_request_id: merchantRequestId,
        payment_status: "initiated",
        failure_reason: null,
      });
    } catch (err) {
      await markFailed("Unable to save Daraja request identifiers");
      return res.status(500).json({ message: "Payment was initiated but could not be recorded" });
    }

    return res.status(200).json({ success: true, data: stkJson, donation_id });
  } catch (err) {
    await markFailed("Unexpected payment initiation error");
    return res.status(500).json({ message: "Internal server error", error: String(err) });
  }
}
