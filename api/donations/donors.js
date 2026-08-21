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

function parseRequestBody(req) {
  if (!req || typeof req !== "object") return {};

  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body) || {};
    } catch {
      return {};
    }
  }

  return req.body || {};
}

function splitFullName(fullName) {
  if (!fullName || typeof fullName !== "string") return { firstName: "", lastName: "" };

  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const body = parseRequestBody(req);

  const first_name = body.first_name ?? body.firstName ?? splitFullName(body.name || body.fullName).firstName;
  const last_name = body.last_name ?? body.lastName ?? splitFullName(body.name || body.fullName).lastName;
  const email = body.email;
  const phone_number = body.phone_number ?? body.phoneNumber ?? body.phone;
  const country = body.country ?? body.countryName ?? body.locationCountry ?? "";
  const region_or_county = body.region_or_county ?? body.regionOrCounty ?? body.region ?? body.county ?? body.state ?? "";
  const city_or_town = body.city_or_town ?? body.cityOrTown ?? body.city ?? body.town ?? body.locationCity ?? "";

  const missingFields = [];

  if (!first_name?.trim()) missingFields.push("first name");
  if (!last_name?.trim()) missingFields.push("last name");
  if (!email?.trim()) missingFields.push("email");
  if (!phone_number?.trim()) missingFields.push("phone number");
  if (!country?.trim()) missingFields.push("country");
  if (!region_or_county?.trim()) missingFields.push("county/region");
  if (!city_or_town?.trim()) missingFields.push("town/city");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: "Missing required donor fields",
      missingFields,
      received: {
        first_name: first_name ?? null,
        last_name: last_name ?? null,
        email: email ?? null,
        phone_number: phone_number ?? null,
        country: country ?? null,
        region_or_county: region_or_county ?? null,
        city_or_town: city_or_town ?? null,
      },
    });
  }

  if (!isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format", field: "email" });
  }

  const normalizedPhone = normalizePhone(phone_number);
  if (!normalizedPhone) {
    return res.status(400).json({
      message: "Phone number must be a valid Kenyan mobile number",
      field: "phone_number",
    });
  }

  try {
    const supabase = getSupabaseAdmin();
    const cleanEmail = email.trim().toLowerCase();

    const { data: existing } = await supabase
      .from("donors")
      .select("id")
      .or(`email.eq.${cleanEmail},phone_number.eq.${normalizedPhone}`)
      .limit(1)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from("donors")
        .update({
          first_name: first_name.trim(),
          last_name: last_name.trim(),
          email: cleanEmail,
          phone_number: normalizedPhone,
          country: country.trim(),
          region_or_county: region_or_county.trim(),
          city_or_town: city_or_town.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

      if (error) throw error;
      return res.status(200).json({ donor_id: existing.id, is_new: false });
    }

    const { data: newDonor, error } = await supabase
      .from("donors")
      .insert([
        {
          first_name: first_name.trim(),
          last_name: last_name.trim(),
          email: cleanEmail,
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

      if (error.code === "23505") {
        const { data: existingDonor } = await supabase
          .from("donors")
          .select("id")
          .or(`email.eq.${cleanEmail},phone_number.eq.${normalizedPhone}`)
          .limit(1)
          .maybeSingle();

        if (existingDonor) {
          return res.status(200).json({ donor_id: existingDonor.id, is_new: false });
        }
      }

      return res.status(500).json({
        message: "Failed to create donor record",
        error: error.message,
        field: "database",
      });
    }

    return res.status(201).json({ donor_id: newDonor.id, is_new: true });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: String(err),
    });
  }
}
