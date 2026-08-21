/*
  POST /api/donations/create
  Creates a donation record for a donor.
  
  Request body:
  {
    donor_id: UUID,
    amount: number (in KES),
    currency: "KES" | "USD",
    frequency: "once" | "monthly",
    mpesa_phone_number: string,
    dedication_enabled: boolean,
    dedication_type?: "honour" | "memory" | "love",
    honouree_first_name?: string,
    honouree_last_name?: string,
    dedication_message?: string,
    notification_requested?: boolean,
    notification_recipient_name?: string,
    notification_recipient_email?: string,
    notification_message?: string
  }
  
  Response: { donation_id: UUID, checkout_request_id?: string, merchant_request_id?: string }
*/

import { getSupabaseAdmin, isEmail, normalizePhone } from "./_shared.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    donor_id,
    amount,
    currency,
    frequency,
    mpesa_phone_number,
    dedication_enabled,
    dedication_type,
    honouree_first_name,
    honouree_last_name,
    dedication_message,
    notification_requested,
    notification_recipient_name,
    notification_recipient_email,
    notification_message,
  } = req.body || {};

  // Validate required fields
  if (!donor_id || !amount || !currency || !frequency || !mpesa_phone_number) {
    return res.status(400).json({
      message:
        "Missing required fields: donor_id, amount, currency, frequency, mpesa_phone_number",
    });
  }

  if (!["KES", "USD"].includes(currency)) {
    return res.status(400).json({ message: "Currency must be KES or USD" });
  }

  if (!["once", "monthly"].includes(frequency)) {
    return res.status(400).json({ message: "Frequency must be 'once' or 'monthly'" });
  }

  if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
    return res.status(400).json({ message: "Amount must be greater than zero" });
  }

  const normalizedPhone = normalizePhone(mpesa_phone_number);
  if (!normalizedPhone || !/^2547\d{8}$/.test(normalizedPhone)) {
    return res.status(400).json({
      message:
        "Invalid M-Pesa phone number. Must be a valid Safaricom number in the format 07XXXXXXXX.",
    });
  }

  if (dedication_enabled &&
      (!["honour", "memory", "love"].includes(dedication_type) ||
        !honouree_first_name?.trim() || !honouree_last_name?.trim())) {
    return res.status(400).json({ message: "Dedication type and honouree names are required" });
  }

  if (notification_requested &&
      (!dedication_enabled || !notification_recipient_name?.trim() ||
        !isEmail(notification_recipient_email))) {
    return res.status(400).json({ message: "A valid notification recipient name and email are required" });
  }

  try {
    const supabase = getSupabaseAdmin();
    // Validate donor exists
    const { data: donor, error: donorError } = await supabase
      .from("donors")
      .select("id")
      .eq("id", donor_id)
      .single();

    if (donorError || !donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    // Create donation record
    const { data: donation, error: donationError } = await supabase
      .from("donations")
      .insert([
        {
          donor_id,
          amount: Math.round(amount),
          currency,
          frequency,
          mpesa_phone_number: normalizedPhone,
          payment_status: "pending",
          dedication_enabled: dedication_enabled || false,
          dedication_type: dedication_enabled ? dedication_type : null,
          honouree_first_name:
            dedication_enabled && dedication_type ? honouree_first_name : null,
          honouree_last_name:
            dedication_enabled && dedication_type ? honouree_last_name : null,
          dedication_message:
            dedication_enabled && dedication_type ? dedication_message : null,
          notification_requested: notification_requested && dedication_enabled ? true : false,
          notification_recipient_name: notification_requested && dedication_enabled ? notification_recipient_name : null,
          notification_recipient_email: notification_requested && dedication_enabled ? notification_recipient_email : null,
          notification_message: notification_requested && dedication_enabled ? notification_message : null,
        },
      ])
      .select("id")
      .single();

    if (donationError) {
      console.error("Error creating donation:", donationError);
      return res.status(500).json({
        message: "Failed to create donation record",
        error: donationError.message,
      });
    }

    return res.status(201).json({ donation_id: donation.id });
  } catch (err) {
    console.error("Server error:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: String(err) });
  }
}
