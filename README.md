# TTIL Store + Studio

A local working storefront and private, two-person administration dashboard. This is a custom small-store system, not a complete replacement for every Shopify feature.

## Open it

The running preview is at http://localhost:4173. Studio is at http://localhost:4173/admin.

After a restart, double-click **Start Store.cmd** in this folder. Keep its window open while using the store. Node.js 24 or newer is required. On a new computer run `npm install` and `npm run build` first. Open the web address, not index.html.

## Your dashboard

Sign in using one of the two accounts you provided. Passwords are stored as salted hashes in the private database, not in the website code. There is no public signup. Change the initial passwords in Store settings before public launch, since they were shared in chat.

- **Products:** add/edit products; upload up to eight JPEG, PNG or WebP photos; choose the cover; edit name, caption, description, price, category, display order and draft/active/archived status.
- **Variants:** add colors with swatches and individual sizes, SKUs and quantities.
- **Inventory:** see and edit pieces remaining per color and size. Orders reserve stock; cancellation restores it once. Stale stock edits are rejected so an order cannot be accidentally overwritten.
- **Orders:** customer and delivery details, items, totals, notes, tracking text, pending/confirmed/fulfilled/cancelled status, and manual paid/unpaid tracking for cash on delivery.
- **Customers:** customer records derived from orders and CSV export.
- **Discounts:** percent/fixed codes, minimum spend, expiry and use limits.
- **Analytics:** real order/revenue/stock figures; no invented sales.
- **Store settings:** homepage photograph and copy, delivery fee, free-shipping threshold, contact details, shipping/return text, order switch, password change and data export.

## Before taking real orders

Checkout is intentionally paused. The three sample products, prices, stock, descriptions and generated imagery are examples. Review them, add contact/policy information and final garment measurements, then enable **Accept orders** in Store settings.

Cash on delivery only. No money is collected online. Mark paid only after collecting it. Fulfilled orders are terminal; there is not yet a returns/refunds workflow. Courier tracking is a text field, not a shipping integration. There are no automatic email/SMS notifications; check Studio for new orders.

## Photography status

The hero and Studio Journal use the real behind-the-scenes photographs supplied for this project. Each example product has dedicated generated front and back on-model gallery photography; hover a desktop product card to see the back, or open the product to use the labeled Front/Back controls. These product renders are still provisional until real samples are photographed. Uploaded replacements in Studio automatically become the live gallery. Prompts and image sources are recorded in asset-provenance.json.

## Private data and backups

Persistent data is in `data/store.sqlite`. Uploaded images are in `public/media`. Neither credentials nor session data are included in the dashboard's JSON export. Exports contain customer personal data; keep them private.

For a full restorable backup, stop the server and copy the entire `data` and `public/media` folders to private backup storage. The dashboard export is for record-keeping, not one-click restoration. Do not publish the data folder, export files, or setup credentials. The app only serves compiled website assets and public media.

## Hosting

This preview is local to this computer; the link is not publicly accessible. Public launch still requires a host with persistent storage, HTTPS, backups, and final delivery/returns/privacy terms. Set `HOST`, `PORT`, `PUBLIC_ORIGIN`, `COOKIE_SECURE=true`, and `NODE_ENV=production` on an HTTPS deployment. Keep the database outside any public directory. Use a correctly configured trusted reverse proxy; don't expose a raw HTTP server publicly. No deployment was performed.

## Development and verification

`npm test` runs isolated API workflow checks using a temporary database. `npm run build` builds the website. `npm start` serves it at port 4173. Changes to frontend code need a rebuild; server changes need a restart. `npm run dev` is available for development but production preview is the verified mode.

The initial setup script requires two password environment variables only on a fresh installation; it refuses to overwrite existing accounts. Do not commit passwords, the database, or private exports.
