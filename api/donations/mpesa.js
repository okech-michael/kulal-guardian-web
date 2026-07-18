/*
  Backend scaffold for Safaricom Daraja STK Push.
  - Does not hardcode credentials; reads required values from environment variables.
  - Endpoint: POST /api/donations/mpesa
    body: { phone, amount, type }

  NOTE: To enable live requests, set the following env vars in your deployment environment:
    DARAJA_CONSUMER_KEY
    DARAJA_CONSUMER_SECRET
    DARAJA_PASSKEY
    DARAJA_SHORTCODE
    DARAJA_CALLBACK_URL

  The handler will return 501 if credentials are not configured.
*/

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { phone, amount, type } = req.body || {};
  if (!phone || !amount) return res.status(400).json({ message: "Missing phone or amount" });

  function normalizePhone(raw) {
    const digits = String(raw).replace(/\D/g, "");
    if (!digits) return null;
    if (digits.startsWith("254")) return digits;
    if (digits.startsWith("07")) return `254${digits.slice(1)}`;
    if (digits.startsWith("7")) return `254${digits}`;
    return digits;
  }

  const normalizedPhone = normalizePhone(phone);
  if (!normalizedPhone || !/^2547\d{8}$/.test(normalizedPhone)) {
    return res.status(400).json({ message: "Phone number must be a valid Safaricom number in the format 07XXXXXXXX." });
  }

  const {
    DARAJA_CONSUMER_KEY,
    DARAJA_CONSUMER_SECRET,
    DARAJA_PASSKEY,
    DARAJA_SHORTCODE,
    DARAJA_CALLBACK_URL,
  } = process.env;

  const missing = [];
  if (!DARAJA_CONSUMER_KEY) missing.push("DARAJA_CONSUMER_KEY");
  if (!DARAJA_CONSUMER_SECRET) missing.push("DARAJA_CONSUMER_SECRET");
  if (!DARAJA_PASSKEY) missing.push("DARAJA_PASSKEY");
  if (!DARAJA_SHORTCODE) missing.push("DARAJA_SHORTCODE");
  if (!DARAJA_CALLBACK_URL) missing.push("DARAJA_CALLBACK_URL");

  if (missing.length) {
    return res.status(501).json({
      message: "Daraja credentials not configured. Missing environment variables.",
      missing,
    });
  }

  try {
    // 1. Get access token
    const tokenRes = await fetch(`https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials`, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${DARAJA_CONSUMER_KEY}:${DARAJA_CONSUMER_SECRET}`).toString("base64")}`,
      },
    });

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      return res.status(502).json({
        message: "Failed to obtain Daraja token",
        status: tokenRes.status,
        detail: text,
        hint: "Check that your Daraja consumer key/secret are correct, the sandbox account is active, and the app is using the same environment in Vercel.",
      });
    }

    const tokenJson = await tokenRes.json();
    const accessToken = tokenJson.access_token;

    // 2. Prepare STK Push payload
    const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
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

    const stkRes = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
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
      return res.status(502).json({
        message: "Daraja STK Push failed",
        status: stkRes.status,
        detail: stkJson,
        hint: "Check that your sandbox shortcode, passkey, callback URL, and phone number format are valid for Safaricom's test environment.",
      });
    }

    return res.status(200).json({ success: true, data: stkJson });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: String(err) });
  }
}
