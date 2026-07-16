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
NEXT_PUBLIC_API_URL=/backend
API_ORIGIN_URL=http://api-kmd.kimmex.com.kh/api
NEXT_PUBLIC_SITE_URL=https://kmdecor.com
```

`NEXT_PUBLIC_API_URL=/backend` makes the browser call the Vercel site over HTTPS.
Vercel then rewrites `/backend/*` to `API_ORIGIN_URL`. This avoids browser
mixed-content blocking while the cPanel API does not have a valid SSL
certificate.

Keep the leading slash in `/backend`. The app normalizes this defensively, but
the intended Vercel value is exactly `/backend`, not `backend`.

After the API subdomain has valid SSL, change the variables to:

```bash
NEXT_PUBLIC_API_URL=https://api-kmd.kimmex.com.kh/api
API_ORIGIN_URL=https://api-kmd.kimmex.com.kh/api
```

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

## Production checks

After each frontend and backend deployment, check:

```bash
curl -I https://kmdecor.com
curl -sS https://kmdecor.com/backend/health
curl -sS https://kmdecor.com/backend/home
```

While using the temporary Vercel domain, replace `https://kmdecor.com` with
`https://kimmex-decor.vercel.app`.

The health endpoint should return `"status":"ok"` and
`"checks":{"database":true}`. The home endpoint should return backend-managed
featured products, services, projects, and brands.
