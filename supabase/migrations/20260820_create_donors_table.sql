-- Create donors table to store donor information
CREATE TABLE public.donors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  country TEXT NOT NULL,
  region_or_county TEXT NOT NULL,
  city_or_town TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(email, phone_number)
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.donors ENABLE ROW LEVEL SECURITY;

-- Grant appropriate permissions
GRANT INSERT ON public.donors TO anon, authenticated;
GRANT SELECT ON public.donors TO authenticated;
GRANT ALL ON public.donors TO service_role;

-- Allow anyone to insert and authenticated users to read
CREATE POLICY "Anyone can create donor records" ON public.donors FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Service role can read all" ON public.donors FOR SELECT TO service_role USING (true);
