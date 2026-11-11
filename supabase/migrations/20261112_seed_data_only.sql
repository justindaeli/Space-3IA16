-- Generated from data/db.json. Schema already created by 20261106.
-- This imports seed data only.

INSERT INTO public.users (id, name, email, username, password_hash, password_salt, role, status, initials, avatar_url, created_at, last_login_at) VALUES
('55b872da-5ee1-5801-b184-119b4d7b10bd','Administrator 3IA16','admin@space3ia16.id','admin','199f2d00c4c4d016bedddb423af72f46b21fd22b4eb204dd51c6732f72d0cff8ca79b262def6539c108f121c166735592a2b3fc167ca9253298324ad09a8cdd8','b30a0b199eb7830566baa1d90031b924','admin','active','AD',NULL,'2026-11-01 00:00:00+00',NULL),
('4717772a-c1c5-517b-b4d2-f1f6aa1e5efe','Justin Daeli','justindaeli@space3ia16.id','justindaeli','d52dcc9e0ac259c2e8fe6c9b40426ef4dabd3f1f9f28aed57b285472e4984dab2940443661a31b2abe438bd435c1784f3e541bf1daad238077425883f7c9ca60','44a9a14760c300b6f75bf63efa4f567a','user','active','JD',NULL,'2026-11-02 00:00:00+00',NULL),
('59344979-06bd-5308-bd01-ab85d19abb87','Alya Putri','alyaputri@space3ia16.id','alyaputri','d52dcc9e0ac259c2e8fe6c9b40426ef4dabd3f1f9f28aed57b285472e4984dab2940443661a31b2abe438bd435c1784f3e541bf1daad238077425883f7c9ca60','44a9a14760c300b6f75bf63efa4f567a','user','active','AP',NULL,'2026-11-02 00:00:00+00',NULL),
('ff8e8139-49d1-5845-933e-4206502fb899','Rafi Athallah','rafiathallah@space3ia16.id','rafiathallah','d52dcc9e0ac259c2e8fe6c9b40426ef4dabd3f1f9f28aed57b285472e4984dab2940443661a31b2abe438bd435c1784f3e541bf1daad238077425883f7c9ca60','44a9a14760c300b6f75bf63efa4f567a','user','active','RA',NULL,'2026-11-03 00:00:00+00',NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.tasks (id, title, description, course, deadline, status, created_at) VALUES
('a5297157-807d-5cbe-a6a0-3a91c5c0bf84','Implementasi Algoritma Bresenham','Buat algoritma garis dan lingkaran menggunakan OpenGL / WebGL.','Grafika Komputer','2026-11-12 23:59:00+00','todo','2026-11-01 00:00:00+00'),
('92b15751-3dfb-5aa3-9586-a0bf3974c5e5','Proyek Routing & Subnetting Lab 4','Konfigurasi topologi jaringan OSPF dan analisis packet loss di Cisco Packet Tracer.','Jaringan Komputer','2026-11-09 18:00:00+00','in-progress','2026-11-01 00:00:00+00'),
('65e40f5a-c998-52a2-a576-c3f93fc3e0e1','Wireframe High-Fidelity Dashboard','Selesaikan desain prototipe antarmuka sistem web dengan standar kegunaan Nielsen.','IMK','2026-11-15 20:00:00+00','done','2026-11-01 00:00:00+00'),
('32920bd5-4989-56f1-a5a8-f0f82a7b4620','Slide Presentasi Evaluasi Heuristik','Persiapkan 10 slide evaluasi antarmuka untuk presentasi kelompok minggu depan.','IMK','2026-11-16 12:00:00+00','todo','2026-11-01 00:00:00+00'),
('e3da99c4-dc7a-5c6a-88ad-7c76a84274a2','Simulasi CPU Scheduling Multilevel Queue','Buat laporan hasil analisis performa algoritma penjadwalan proses.','Sistem Operasi','2026-11-18 23:59:00+00','in-progress','2026-11-01 00:00:00+00') ON CONFLICT (id) DO NOTHING;

INSERT INTO public.materials (id, title, course, type, url, uploaded_at) VALUES
('e8227759-5503-594a-bb88-399fd0cb815a','Modul 3 — Heuristic Evaluation & Usability','IMK','modul','https://example.com/modul-imk-3.pdf','2026-10-28 00:00:00+00'),
('609f35c3-9623-5fcc-8946-0afe7992c084','Slide Kuliah: Arsitektur OSI Layer & TCP/IP','Jaringan Komputer','slide','https://example.com/slide-jarkom-osi.pdf','2026-10-30 00:00:00+00'),
('0eb34e3b-8e6c-59b2-b267-3efac60f9877','Catatan Praktikum Routing Statis & OSPF','Jaringan Komputer','catatan','https://example.com/catatan-routing.pdf','2026-11-01 00:00:00+00'),
('48117d7c-370d-577e-8d2c-9f776f8af4d4','Slide Transformasi 2D & 3D Grafika','Grafika Komputer','slide','https://example.com/slide-grafkom.pdf','2026-11-03 00:00:00+00'),
('7335b6a6-8ddf-511c-a98b-d938da2b7cde','Modul Praktikum Virtual Memory & Paging','Sistem Operasi','modul','https://example.com/modul-os-paging.pdf','2026-11-04 00:00:00+00') ON CONFLICT (id) DO NOTHING;

INSERT INTO public.announcements (id, title, created_at) VALUES
('d3adc56c-ba6f-549d-a9fd-f370c30b019d','Kumpulkan draft UI dan laporan lab sebelum Kamis 23:59 WIB','2026-11-05 00:00:00+00') ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.users, public.tasks, public.materials, public.announcements, public.activity_logs FROM anon, authenticated;

DROP POLICY IF EXISTS allow_users_access ON public.users;
DROP POLICY IF EXISTS allow_activity_logs_access ON public.activity_logs;
DROP POLICY IF EXISTS anon_select_tasks ON public.tasks;
DROP POLICY IF EXISTS anon_insert_tasks ON public.tasks;
DROP POLICY IF EXISTS anon_update_tasks ON public.tasks;
DROP POLICY IF EXISTS anon_select_materials ON public.materials;
DROP POLICY IF EXISTS anon_select_announcements ON public.announcements;

CREATE INDEX IF NOT EXISTS tasks_deadline_idx ON public.tasks (deadline);
