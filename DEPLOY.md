# Deploy TTIL

This ZIP is a production Node.js application. It is not a static-site upload because orders, stock, accounts and uploaded images need a server and persistent storage.

## Provider settings

- Install: `npm ci`
- Build: `npm run build` (optional because `dist` is included, but recommended)
- Start: `npm start`
- Health check: `/api/catalog`
- Node: 24 or newer

## Required environment

- `NODE_ENV=production`
- `HOST=0.0.0.0`
- `PUBLIC_ORIGIN=https://your-final-domain.example` (exact origin; no trailing slash)
- `COOKIE_SECURE=true`
- `TTIL_DATA_DIR=/your/persistent-volume/data`
- `TTIL_MEDIA_DIR=/your/persistent-volume/media`
- `PORT` is normally supplied by the hosting provider

Mount one persistent volume and point both TTIL paths inside it. The app copies the starter media into an empty persistent media directory on first start. Back up both paths. Never expose the data directory as a public folder.

## First live check

1. Open `/` and confirm all images load.
2. Use **Studio access** in the storefront footer.
3. Sign in and immediately change each initial password to a unique 10+ character password.
4. Review example product names, prices, stock, policies and contact details.
5. Keep **Accept orders** off until every value is final.

Cash on delivery is the only payment method in this version. A domain, HTTPS certificate, privacy/returns wording, courier process, monitoring and automated backups are still hosting/operations responsibilities.
