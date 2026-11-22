# Space 3IA16

Portal kolaborasi kelas berbasis Next.js dan Supabase. Pengguna dapat melihat tugas, pengumuman, serta mengunduh materi; hanya administrator yang dapat mengelola tugas dan konten.

## Menjalankan secara lokal

1. Salin `.env.example` menjadi `.env.local`.
2. Isi `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (atau
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` untuk proyek lama), `SUPABASE_SERVICE_ROLE_KEY`,
   dan `SESSION_SECRET`.
3. Install dependency dan jalankan aplikasi:

   ```bash
   npm ci
   npm run dev
   ```

## Deploy ke Netlify

Hubungkan repository GitHub ini ke Netlify dan gunakan konfigurasi berikut:

- Build command: `npm run build`
- Branch produksi: `master`
- Node.js: `20`

Tambahkan environment variables berikut di **Site configuration → Environment variables**:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — publishable key untuk klien browser
- `SUPABASE_SERVICE_ROLE_KEY` — server-only, jangan gunakan awalan `NEXT_PUBLIC_`
- `SESSION_SECRET` — secret acak minimal 32 karakter

Netlify akan membuat deploy preview untuk pull request jika Deploy Previews diaktifkan. Migration Supabase dijalankan terpisah menggunakan Supabase CLI; deploy aplikasi tidak mengubah database secara otomatis.

## Validasi

```bash
npx tsc --noEmit
npm run lint
npm run build
```
