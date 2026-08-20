CREATE TABLE public.threat_snapshots (
  id uuid primary key default gen_random_uuid(),
  payload jsonb not null,
  created_at timestamptz not null default now()
);
GRANT SELECT ON public.threat_snapshots TO anon;
GRANT SELECT ON public.threat_snapshots TO authenticated;
GRANT ALL ON public.threat_snapshots TO service_role;
ALTER TABLE public.threat_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Threat snapshots are public to read" ON public.threat_snapshots FOR SELECT USING (true);
CREATE INDEX threat_snapshots_created_at_idx ON public.threat_snapshots (created_at DESC);