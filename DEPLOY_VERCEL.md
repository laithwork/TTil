# Deploy TTIL on Vercel

This package includes the Vite storefront, a Vercel API function, and Supabase persistence for products, inventory, orders, settings, accounts, and uploaded Studio images.

## Required Vercel environment variables

Add these in **Project → Settings → Environment Variables** for Production, Preview, and Development:

- `SUPABASE_URL` — your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — the server-only service-role key
- `TTIL_SESSION_SECRET` — a new random secret of at least 32 characters
- `PUBLIC_ORIGIN` — the final Vercel production URL, for example `https://your-project.vercel.app`

Never use the Supabase service-role key in a `VITE_` variable. It belongs only in Vercel's server environment.

## Deploy

1. Import the unzipped project folder into Vercel or connect its Git repository.
2. Keep the detected framework as **Vite**. The included `vercel.json` supplies the build and routing configuration.
3. Add the four environment variables above.
4. Redeploy after saving the variables.
5. Open `/api/catalog`. A working deployment returns JSON beginning with `{"products":...}`.
6. Open `/admin` to enter Studio access.

The database schema is in `supabase/schema.sql`. It has already been applied to the configured TTIL Supabase project; use it only if deploying against a different project.
