import { createClient } from "@supabase/supabase-js";

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase server credentials are not configured");
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function normalizePhone(raw) {
  const digits = String(raw ?? "").replace(/\D/g, "");
  if (digits.startsWith("2547") && digits.length === 12) return digits;
  if (digits.startsWith("07") && digits.length === 10) return `254${digits.slice(1)}`;
  if (digits.startsWith("7") && digits.length === 9) return `254${digits}`;
  return null;
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? "").trim());
}

export function sendJson(res, status, payload) {
  if (res.headersSent) return;
  res.status(status).json(payload);
}

export async function updateDonation(supabase, donationId, values) {
  const { data, error } = await supabase
    .from("donations")
    .update({ ...values, updated_at: new Date().toISOString() })
    .eq("id", donationId)
    .select("id, payment_status")
    .maybeSingle();

  if (error) throw error;
  return data;
}
