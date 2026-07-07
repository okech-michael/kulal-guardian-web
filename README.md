# Wazee wa Mazingira

## Production Deployment

This project is designed to deploy to Vercel.

### Vercel build settings
- Build command: `npm run build`
- Output directory: `dist/client`

### Required environment variables
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY` or `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SENDGRID_API_KEY`
- `SENDGRID_FROM_EMAIL`
- `DARAJA_CONSUMER_KEY`
- `DARAJA_CONSUMER_SECRET`
- `DARAJA_PASSKEY`
- `DARAJA_SHORTCODE`
- `DARAJA_CALLBACK_URL`

### Notes
- `DARAJA_CALLBACK_URL` should be set to your live URL for `/api/donations/callback`.
- Keep secrets private; do not commit `.env`.

### Local setup
1. Copy `.env.example` to `.env`
2. Add your credentials
3. Run:
   ```bash
   npm install
   npm run dev
   ```

### API routes
- `POST /api/donations/mpesa`, initiates Daraja STK Push
- `POST /api/donations/callback`, receives Daraja payment confirmation

### Production check
- Run `npm run build` before deployment.
