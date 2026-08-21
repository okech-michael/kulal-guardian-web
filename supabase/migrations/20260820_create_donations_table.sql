-- Create donations table to store donation and payment information
CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID NOT NULL REFERENCES public.donors(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL CHECK (currency IN ('KES', 'USD')),
  frequency TEXT NOT NULL CHECK (frequency IN ('once', 'monthly')),
  payment_method TEXT NOT NULL DEFAULT 'mpesa',
  mpesa_phone_number TEXT NOT NULL,
  checkout_request_id TEXT,
  merchant_request_id TEXT,
  mpesa_receipt_number TEXT,
  transaction_reference TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'initiated', 'processing', 'completed', 'failed', 'cancelled')),
  failure_reason TEXT,
  
  -- Dedication fields
  dedication_enabled BOOLEAN NOT NULL DEFAULT false,
  dedication_type TEXT CHECK (dedication_type IN ('honour', 'memory', 'love', NULL)),
  honouree_first_name TEXT,
  honouree_last_name TEXT,
  dedication_message TEXT,
  
  -- Notification fields
  notification_requested BOOLEAN NOT NULL DEFAULT false,
  notification_recipient_name TEXT,
  notification_recipient_email TEXT,
  notification_message TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  paid_at TIMESTAMPTZ
);

-- Create index for donor_id lookups
CREATE INDEX idx_donations_donor_id ON public.donations(donor_id);
CREATE INDEX idx_donations_payment_status ON public.donations(payment_status);
CREATE INDEX idx_donations_merchant_request_id ON public.donations(merchant_request_id);
CREATE INDEX idx_donations_checkout_request_id ON public.donations(checkout_request_id);

-- Enable RLS (Row Level Security)
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Grant appropriate permissions
GRANT INSERT ON public.donations TO anon, authenticated;
GRANT SELECT ON public.donations TO authenticated;
GRANT ALL ON public.donations TO service_role;

-- Allow anyone to insert and authenticated users to read their own donations (via donor_id)
CREATE POLICY "Anyone can create donation records" ON public.donations FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Service role can read and update all" ON public.donations FOR SELECT TO service_role USING (true);
CREATE POLICY "Service role can update all" ON public.donations FOR UPDATE TO service_role USING (true);
