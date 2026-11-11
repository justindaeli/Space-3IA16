-- Repair existing users table created by an incomplete/older migration.
-- Run this before rerunning 20261112_full_schema_seed_rls.sql.

ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS password_hash text,
  ADD COLUMN IF NOT EXISTS password_salt text,
  ADD COLUMN IF NOT EXISTS avatar_url text,
  ADD COLUMN IF NOT EXISTS last_login_at timestamptz;

-- Existing rows, if any, must be populated before NOT NULL is applied.
-- Seed SQL supplies values for new rows.

ALTER TABLE public.users
  ALTER COLUMN password_hash SET NOT NULL,
  ALTER COLUMN password_salt SET NOT NULL;

ALTER TABLE public.users
  DROP CONSTRAINT IF EXISTS users_role_check,
  DROP CONSTRAINT IF EXISTS users_status_check;

ALTER TABLE public.users
  ADD CONSTRAINT users_role_check CHECK (role IN ('admin', 'user')),
  ADD CONSTRAINT users_status_check CHECK (status IN ('active', 'inactive'));

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.users FROM anon, authenticated;
DROP POLICY IF EXISTS allow_users_access ON public.users;
