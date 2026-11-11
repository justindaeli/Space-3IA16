import json, uuid
from pathlib import Path

def uid(value): return str(uuid.uuid5(uuid.NAMESPACE_URL, 'space3ia16:' + value))
def sql(value):
    if value is None: return 'NULL'
    return "'" + str(value).replace("'", "''") + "'"
def row(values): return '(' + ','.join(values) + ')'

root = Path(__file__).parents[1]
data = json.loads((root / 'data/db.json').read_text(encoding='utf-8'))
user_ids = {u['id']: uid(u['id']) for u in data['users']}
out = [
    '-- Generated from data/db.json. Run once in Supabase SQL Editor.',
    'CREATE EXTENSION IF NOT EXISTS pgcrypto;',
    "CREATE TABLE IF NOT EXISTS public.users (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, email text UNIQUE NOT NULL, username text UNIQUE NOT NULL, password_hash text NOT NULL, password_salt text NOT NULL, role text NOT NULL DEFAULT 'user' CHECK (role IN ('admin','user')), status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive')), initials text NOT NULL, avatar_url text, created_at timestamptz NOT NULL DEFAULT now(), last_login_at timestamptz);",
    "CREATE TABLE IF NOT EXISTS public.tasks (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), title text NOT NULL, description text NOT NULL DEFAULT '', course text NOT NULL, deadline timestamptz NOT NULL, status text NOT NULL DEFAULT 'todo' CHECK (status IN ('todo','in-progress','done')), created_at timestamptz NOT NULL DEFAULT now());",
    "CREATE TABLE IF NOT EXISTS public.materials (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), title text NOT NULL, course text NOT NULL, type text NOT NULL CHECK (type IN ('modul','slide','catatan')), url text, uploaded_at timestamptz NOT NULL DEFAULT now());",
    "CREATE TABLE IF NOT EXISTS public.announcements (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), title text NOT NULL, created_at timestamptz NOT NULL DEFAULT now());",
    "CREATE TABLE IF NOT EXISTS public.activity_logs (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid, user_name text NOT NULL, action text NOT NULL, target text NOT NULL, details text, created_at timestamptz NOT NULL DEFAULT now());",
]
sets = [
 ('users','id,name,email,username,password_hash,password_salt,role,status,initials,created_at', data['users'], lambda x: row([sql(user_ids[x['id']]),sql(x['name']),sql(x['email']),sql(x['username']),sql(x['passwordHash']),sql(x['passwordSalt']),sql(x['role']),sql(x['status']),sql(x['initials']),sql(x['createdAt'])])),
 ('tasks','id,title,description,course,deadline,status', data['tasks'], lambda x: row([sql(uid(x['id'])),sql(x['title']),sql(x.get('description','')),sql(x['course']),sql(x['deadline']),sql(x['status'])])),
 ('materials','id,title,course,type,url,uploaded_at', data['materials'], lambda x: row([sql(uid(x['id'])),sql(x['title']),sql(x['course']),sql(x['type']),sql(x.get('url')),sql(x['uploadedAt'])])),
 ('announcements','id,title,created_at', data['announcements'], lambda x: row([sql(uid(x['id'])),sql(x['title']),sql(x['createdAt'])])),
]
for table, columns, items, encode in sets:
    out += [f'INSERT INTO public.{table} ({columns}) VALUES', ',\n'.join(encode(x) for x in items) + ' ON CONFLICT (id) DO NOTHING;']
out += [
 'ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;', 'ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;', 'ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;', 'ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;', 'ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;',
 'REVOKE ALL ON public.users, public.tasks, public.materials, public.announcements, public.activity_logs FROM anon, authenticated;',
 'DROP POLICY IF EXISTS allow_users_access ON public.users;', 'DROP POLICY IF EXISTS allow_activity_logs_access ON public.activity_logs;', 'DROP POLICY IF EXISTS anon_select_tasks ON public.tasks;', 'DROP POLICY IF EXISTS anon_insert_tasks ON public.tasks;', 'DROP POLICY IF EXISTS anon_update_tasks ON public.tasks;', 'DROP POLICY IF EXISTS anon_select_materials ON public.materials;', 'DROP POLICY IF EXISTS anon_select_announcements ON public.announcements;',
 'CREATE INDEX IF NOT EXISTS tasks_deadline_idx ON public.tasks(deadline);',
]
(root / 'supabase/migrations/20261112_full_schema_seed_rls.sql').write_text('\n\n'.join(out) + '\n', encoding='utf-8')
print({k: len(v) for k, v in data.items()})
