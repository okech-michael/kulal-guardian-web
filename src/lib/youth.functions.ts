import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const schema = z.object({
  full_name: z.string().trim().min(2).max(120),
  gender: z.enum(["Female", "Male", "Other", "Prefer not to say"]),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  phone_number: z.string().trim().min(7).max(25),
  email: z.string().trim().email().max(255),
  ward: z.string().trim().min(1).max(80),
  village: z.string().trim().min(1).max(80),
  education_level: z.string().trim().min(1).max(80),
  interests: z.string().trim().min(2).max(500),
  motivation: z.string().trim().min(10).max(1500),
});

export const submitYouthRegistration = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const supabase = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
    );
    const { error } = await supabase.from("youth_registrations").insert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
