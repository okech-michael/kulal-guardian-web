/*
  Callback endpoint for Safaricom Daraja payment confirmations.
  Safaricom will POST payment confirmation data to this URL.
  
  Expected callback structure from Daraja:
  {
    Body: {
      stkCallback: {
        MerchantRequestID: string,
        CheckoutRequestID: string,
        ResultCode: number (0 = success, non-zero = failure),
        ResultDesc: string,
        CallbackMetadata?: {
          Item: [
            { Name: "Amount", Value: number },
            { Name: "MpesaReceiptNumber", Value: string },
            { Name: "TransactionDate", Value: string },
            { Name: "PhoneNumber", Value: string }
          ]
        }
      }
    }
  }
*/

import sgMail from "@sendgrid/mail";
import { getSupabaseAdmin } from "./_shared.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const callback = req.body?.Body?.stkCallback;
    if (!callback?.MerchantRequestID || !callback?.CheckoutRequestID) {
      return res.status(400).json({ message: "Callback is missing request identifiers" });
    }

    const supabase = getSupabaseAdmin();
    const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc } = callback;
    const items = Array.isArray(callback.CallbackMetadata?.Item)
      ? callback.CallbackMetadata.Item
      : callback.CallbackMetadata?.Item ? [callback.CallbackMetadata.Item] : [];
    const receipt = items.find((item) => item.Name === "MpesaReceiptNumber")?.Value || null;

    const { data: donation, error: findError } = await supabase
      .from("donations")
      .select("*")
      .or(`merchant_request_id.eq.${MerchantRequestID},checkout_request_id.eq.${CheckoutRequestID}`)
      .limit(1)
      .maybeSingle();

    if (findError) throw findError;
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    if (!["pending", "initiated", "processing"].includes(donation.payment_status)) {
      return res.status(200).json({ success: true, duplicate: true });
    }

    const isSuccess = Number(ResultCode) === 0;
    const isCancelled = Number(ResultCode) === 1032 || Number(ResultCode) === 1037;
    const paymentStatus = isSuccess ? "completed" : isCancelled ? "cancelled" : "failed";
    const now = new Date().toISOString();
    const update = {
      payment_status: paymentStatus,
      mpesa_receipt_number: receipt,
      transaction_reference: receipt || CheckoutRequestID,
      failure_reason: isSuccess ? null : (ResultDesc || "M-Pesa payment was not completed"),
      updated_at: now,
      ...(isSuccess ? { paid_at: now } : {}),
    };

    const { data: updated, error: updateError } = await supabase
      .from("donations")
      .update(update)
      .eq("id", donation.id)
      .in("payment_status", ["pending", "initiated", "processing"])
      .select("id")
      .maybeSingle();

    if (updateError) throw updateError;
    if (!updated) return res.status(200).json({ success: true, duplicate: true });

    if (isSuccess && donation.notification_requested && donation.notification_recipient_email &&
        process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL) {
      try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        await sgMail.send({
          to: donation.notification_recipient_email,
          from: process.env.SENDGRID_FROM_EMAIL,
          subject: "A donation has been dedicated to you",
          text: `${donation.notification_recipient_name || "Hello"}, a donation has been dedicated to you in support of conservation around Mount Kulal.${donation.notification_message ? `\n\n${donation.notification_message}` : ""}`,
        });
      } catch (notificationError) {
        console.error("Dedication notification could not be delivered:", notificationError);
      }
    }

    return res.status(200).json({ success: true, payment_status: paymentStatus });
  } catch (error) {
    console.error("Error processing callback:", error);
    return res.status(500).json({ message: "Failed to process callback" });
  }
}
