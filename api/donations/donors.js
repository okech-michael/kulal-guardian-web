/*
  POST /api/donations/donors
  Creates or retrieves a donor by email/phone.
  
  Request body:
  {
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    country: string,
    region_or_county: string,
    city_or_town: string
  }
  
  Response: { donor_id: UUID }
*/

import { getSupabaseAdmin, isEmail, normalizePhone } from "./_shared.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    first_name,
    last_name,
    email,
    phone_number,
    country,
    region_or_county,
    city_or_town,
  } = req.body || {};

  // Validate required fields
    if (!first_name?.trim() || !last_name?.trim() || !email?.trim() || !phone_number?.trim() || !country?.trim() || !region_or_county?.trim() || !city_or_town?.trim()) {
    return res.status(400).json({
        message: "First name, last name, email, phone number, country, county/region, and town/city are required",
    });
  }

  // Basic email validation
    if (!isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

    const normalizedPhone = normalizePhone(phone_number);
    if (!normalizedPhone) {
      return res.status(400).json({ message: "Phone number must be a valid Kenyan mobile number" });
    }

  try {
      const supabase = getSupabaseAdmin();
      const { data: existing } = await supabase
        .from("donors")
        .select("id")
        .or(`email.eq.${email.trim().toLowerCase()},phone_number.eq.${normalizedPhone}`)
        .limit(1)
        .maybeSingle();

    if (existing) {
        const { error } = await supabase.from("donors").update({
          first_name: first_name.trim(),
          last_name: last_name.trim(),
          email: email.trim().toLowerCase(),
          phone_number: normalizedPhone,
          country: country.trim(),
          region_or_county: region_or_county.trim(),
          city_or_town: city_or_town.trim(),
          updated_at: new Date().toISOString(),
        }).eq("id", existing.id);
        if (error) throw error;
        return res.status(200).json({ donor_id: existing.id, is_new: false });
    }

    // Create new donor
    const { data: newDonor, error } = await supabase
      .from("donors")
      .insert([
        {
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            email: email.trim().toLowerCase(),
            phone_number: normalizedPhone,
            country: country.trim(),
            region_or_county: region_or_county.trim(),
            city_or_town: city_or_town.trim(),
        },
      ])
      .select("id")
      .single();

    if (error) {
      console.error("Error creating donor:", error);
      // If it's a unique constraint error, try to fetch the existing record
      if (error.code === "23505") {
        const { data: existingDonor } = await supabase
          .from("donors")
          .select("id")
          .or(`email.eq.${email},phone_number.eq.${phone_number}`)
          .single();

        if (existingDonor) {
          return res
            .status(200)
            .json({ donor_id: existingDonor.id, is_new: false });
        }
      }
      return res
        .status(500)
        .json({ message: "Failed to create donor record", error: error.message });
    }

    return res
      .status(201)
      .json({ donor_id: newDonor.id, is_new: true });
  } catch (err) {
    console.error("Server error:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: String(err) });
  }
}
