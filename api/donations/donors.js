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

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
  if (!first_name || !last_name || !email || !phone_number) {
    return res.status(400).json({
      message: "Missing required fields: first_name, last_name, email, phone_number",
    });
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    // Check if donor already exists by email or phone
    const { data: existing } = await supabase
      .from("donors")
      .select("id")
      .or(`email.eq.${email},phone_number.eq.${phone_number}`)
      .single();

    if (existing) {
      return res.status(200).json({ donor_id: existing.id, is_new: false });
    }

    // Create new donor
    const { data: newDonor, error } = await supabase
      .from("donors")
      .insert([
        {
          first_name,
          last_name,
          email,
          phone_number,
          country: country || "Kenya",
          region_or_county: region_or_county || "",
          city_or_town: city_or_town || "",
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
