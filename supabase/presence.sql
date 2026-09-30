-- Run in the TTIL Supabase project's SQL Editor before enabling live visitors.
-- Stores only an anonymous browser ID, current page, cart/checkout flags and last heartbeat.
create table if not exists public.ttil_presence (
  id uuid primary key,
  state jsonb not null,
  updated_at timestamptz not null default now()
);

create index if not exists ttil_presence_updated_at_idx on public.ttil_presence(updated_at);
alter table public.ttil_presence enable row level security;
revoke all on table public.ttil_presence from anon, authenticated;
grant all on table public.ttil_presence to service_role;
