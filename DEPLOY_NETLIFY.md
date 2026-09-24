# TTIL deployment

The Supabase project is ready at `dexmbiowqsppitrowqpt`, with the `ttil_state` table protected by RLS. The Netlify site already has `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` configured as server-only variables.

Deploy this source project with Netlify's build pipeline so `netlify/functions/api.mjs` is compiled. A manual Netlify Drop of `dist` alone will recreate the JSON error because it does not publish the function.

```powershell
npm install
npx netlify deploy --build --prod --site ttil-hat
```

After deployment, open `/`, then use the footer's **Studio access** link. The first request seeds the Supabase state row. Orders created through cash-on-delivery checkout are stored in that row and appear in the dashboard's Orders page; product uploads, inventory, discounts and settings use the same protected state.
