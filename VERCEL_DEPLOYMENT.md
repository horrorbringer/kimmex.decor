# Vercel Deployment

## Project settings

- Framework preset: Next.js
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: leave empty

## Environment variables

Add these in Vercel Project Settings -> Environment Variables for Production,
Preview, and Development as needed:

```bash
NEXT_PUBLIC_API_URL=https://api-kmd.kimmex.com.kh/api
NEXT_PUBLIC_SITE_URL=https://kmdecor.com
```

`NEXT_PUBLIC_API_URL` must include `/api`. If it is missing, the app falls back
to localhost and Vercel pages will not talk to the live Laravel backend.

## Backend requirements

The Laravel API must allow the Vercel/storefront origin in CORS. On the cPanel
server `.env`, set:

```bash
FRONTEND_URL=https://kmdecor.com
SANCTUM_STATEFUL_DOMAINS=kmdecor.com,www.kmdecor.com
SESSION_DOMAIN=.kmdecor.com
```

If you use the temporary Vercel URL before connecting the final domain, set
`FRONTEND_URL` to that Vercel URL, then run the backend post-deploy workflow again
so config cache is rebuilt.

The API domain must also have a valid SSL certificate for the exact API hostname.
If `NEXT_PUBLIC_API_URL=https://api-kmd.kimmex.com.kh/api`, cPanel AutoSSL must
cover `api-kmd.kimmex.com.kh`. A certificate for `*.myserverhosts.com` will fail
browser and Vercel server-side API requests.
