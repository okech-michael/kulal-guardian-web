/*
  GET /api/donations/:id
  Retrieves donation status and details.
  
  Query params: none
  
  Response: { id, payment_status, mpesa_receipt_number, transaction_reference, ... }
*/

import { getSupabaseAdmin } from "./_shared.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Missing donation ID" });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data: donation, error } = await supabase
      .from("donations")
      .select("id, payment_status, mpesa_receipt_number, transaction_reference, amount, currency, frequency, created_at, paid_at, failure_reason")
      .eq("id", id)
      .single();

    if (error || !donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    return res.status(200).json(donation);
  } catch (err) {
    console.error("Server error:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: String(err) });
  }
}
