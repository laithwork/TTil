-- TTIL database. Run once in Supabase SQL Editor.
-- The Netlify function uses SUPABASE_SERVICE_ROLE_KEY server-side.
create table if not exists public.ttil_state (
  id text primary key check (id = 'main'),
  state jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.ttil_state enable row level security;
revoke all on table public.ttil_state from anon, authenticated;
grant all on table public.ttil_state to service_role;
create index if not exists ttil_state_updated_at_idx on public.ttil_state(updated_at);
