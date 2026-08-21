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

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const data = req.body;
    console.log("M-Pesa callback received:", JSON.stringify(data));

    // Acknowledge receipt immediately
    res.status(200).json({ success: true });

    // Process callback asynchronously
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase credentials not configured");
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const stkCallback = data?.Body?.stkCallback;

    if (!stkCallback) {
      console.error("Invalid callback structure");
      return;
    }

    const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } =
      stkCallback;

    // Extract callback metadata
    let mpesaReceiptNumber = null;
    let transactionDate = null;
    let amount = null;
    let phoneNumber = null;

    if (CallbackMetadata?.Item) {
      const items = Array.isArray(CallbackMetadata.Item)
        ? CallbackMetadata.Item
        : [CallbackMetadata.Item];

      items.forEach((item) => {
        if (item.Name === "MpesaReceiptNumber") mpesaReceiptNumber = item.Value;
        if (item.Name === "TransactionDate") transactionDate = item.Value;
        if (item.Name === "Amount") amount = item.Value;
        if (item.Name === "PhoneNumber") phoneNumber = item.Value;
      });
    }

    // Find donation by merchant request ID or checkout request ID
    const { data: donation, error: fetchError } = await supabase
      .from("donations")
      .select("*")
      .or(
        `merchant_request_id.eq.${MerchantRequestID},checkout_request_id.eq.${CheckoutRequestID}`
      )
      .single();

    if (fetchError || !donation) {
      console.error("Donation not found for callback:", { MerchantRequestID, CheckoutRequestID });
      return;
    }

    // Prevent duplicate updates (idempotency)
    if (donation.payment_status !== "initiated" && donation.payment_status !== "processing") {
      console.log("Donation already processed, skipping duplicate callback");
      return;
    }

    // Determine payment status based on ResultCode
    let paymentStatus = "failed";
    let failureReason = ResultDesc || "Unknown error";

    if (ResultCode === 0) {
      // Success
      paymentStatus = "completed";
      failureReason = null;
    }

    // Update donation record with payment result
    const updateData = {
      payment_status: paymentStatus,
      mpesa_receipt_number: mpesaReceiptNumber,
      transaction_reference: CheckoutRequestID,
      failure_reason: failureReason,
      updated_at: new Date().toISOString(),
    };

    if (paymentStatus === "completed") {
      updateData.paid_at = new Date().toISOString();
    }

    const { error: updateError } = await supabase
      .from("donations")
      .update(updateData)
      .eq("id", donation.id);

    if (updateError) {
      console.error("Error updating donation:", updateError);
      return;
    }

    console.log("Donation updated successfully:", {
      donation_id: donation.id,
      payment_status: paymentStatus,
      mpesa_receipt_number: mpesaReceiptNumber,
    });

    // TODO: Send notification email to donor
    // TODO: Notify admins of successful donation
  } catch (err) {
    console.error("Error processing callback:", err);
    return res.status(500).json({ message: "Failed to process callback" });
  }
}
