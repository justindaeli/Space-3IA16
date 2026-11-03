/*
# Create class hub tables (tasks, materials, announcements)

1. New Tables
- `tasks`: group assignments shown on the Kanban board. Columns: id, title, description, course, deadline (timestamptz), status (todo / in-progress / done), created_at.
- `materials`: lecture modules, slides, and notes grouped by course. Columns: id, title, course, type (modul / slide / catatan), url (optional link to the file), uploaded_at.
- `announcements`: class announcements shown on the dashboard. Columns: id, title, created_at.

2. Security
- Row Level Security is enabled on all three tables.
- This app has no sign-in screen, so the shared class data is intentionally readable and writable by anonymous visitors (roles anon and authenticated).
- `tasks`: SELECT, INSERT, and UPDATE only. No DELETE is granted or allowed.
- `materials` and `announcements`: SELECT only. Content is managed by the team, not through the app.

3. Important Notes
- Status and material type are restricted to fixed values by CHECK constraints.
- An index on tasks.deadline supports the nearest-deadline lookup.
*/

CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  course text NOT NULL,
  deadline timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in-progress', 'done')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS tasks_deadline_idx ON tasks (deadline);

CREATE TABLE IF NOT EXISTS materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  course text NOT NULL,
  type text NOT NULL CHECK (type IN ('modul', 'slide', 'catatan')),
  url text,
  uploaded_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE ON tasks TO anon, authenticated;
GRANT SELECT ON materials TO anon, authenticated;
GRANT SELECT ON announcements TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_tasks" ON tasks;
CREATE POLICY "anon_select_tasks" ON tasks FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_tasks" ON tasks;
CREATE POLICY "anon_insert_tasks" ON tasks FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_tasks" ON tasks;
CREATE POLICY "anon_update_tasks" ON tasks FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_materials" ON materials;
CREATE POLICY "anon_select_materials" ON materials FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_announcements" ON announcements;
CREATE POLICY "anon_select_announcements" ON announcements FOR SELECT
  TO anon, authenticated USING (true);
