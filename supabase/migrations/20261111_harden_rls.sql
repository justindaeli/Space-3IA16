-- Lock direct anon/authenticated access. Next.js server routes use service role
-- after performing application-level authentication and authorization.

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.users FROM anon, authenticated;
REVOKE ALL ON TABLE public.activity_logs FROM anon, authenticated;
REVOKE ALL ON TABLE public.tasks FROM anon, authenticated;
REVOKE ALL ON TABLE public.materials FROM anon, authenticated;
REVOKE ALL ON TABLE public.announcements FROM anon, authenticated;

DROP POLICY IF EXISTS "allow_users_access" ON public.users;
DROP POLICY IF EXISTS "allow_activity_logs_access" ON public.activity_logs;
DROP POLICY IF EXISTS "anon_select_tasks" ON public.tasks;
DROP POLICY IF EXISTS "anon_insert_tasks" ON public.tasks;
DROP POLICY IF EXISTS "anon_update_tasks" ON public.tasks;
DROP POLICY IF EXISTS "anon_select_materials" ON public.materials;
DROP POLICY IF EXISTS "anon_select_announcements" ON public.announcements;
DROP POLICY IF EXISTS "users_select_own" ON public.users;
DROP POLICY IF EXISTS "activity_logs_select_admin" ON public.activity_logs;

-- No policies intentionally: direct client access is denied by default.
-- Keep service-role access server-only; never expose its key to the browser.
