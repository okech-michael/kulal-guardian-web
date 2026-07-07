# Production Environment Setup

This project is configured to run on Vercel with a static client bundle and Node API routes.

## Vercel configuration
- `vercel.json` already routes all traffic through `api/server.js`, which handles both page rendering and API endpoints.
- Production build command: `npm run build`
- Output directory: `dist/client`

## Required environment variables

### Supabase
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY` (alias for `SUPABASE_ANON_KEY`)
- `SUPABASE_SERVICE_ROLE_KEY`

### SendGrid
- `SENDGRID_API_KEY`
- `SENDGRID_FROM_EMAIL`

### M-Pesa Daraja
- `DARAJA_CONSUMER_KEY`
- `DARAJA_CONSUMER_SECRET`
- `DARAJA_PASSKEY`
- `DARAJA_SHORTCODE`
- `DARAJA_CALLBACK_URL`

### Other
- `VITE_SUPABASE_URL` (optional client-side alias)
- `VITE_SUPABASE_PUBLISHABLE_KEY` (optional client-side alias)

## Notes
- Do not commit API keys or secrets to source control.
- In Vercel, add these variables under Project Settings › Environment Variables.
- `DARAJA_CALLBACK_URL` must be a public HTTPS URL that points to `/api/donations/callback`.

## Local development
- Copy `.env.example` to `.env` and fill in secrets locally.
- Run the app locally with:
  ```bash
  npm install
  npm run dev
  ```
