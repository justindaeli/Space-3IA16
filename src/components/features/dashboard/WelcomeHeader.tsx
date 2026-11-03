import { Sparkles } from "lucide-react";

export function WelcomeHeader() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-zinc-800/90 bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-950 p-6 shadow-xl shadow-black/40 sm:p-8">
      {/* Subtle ambient neon glow in top-right corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-gradient-to-tr from-indigo-500/10 via-blue-500/5 to-transparent blur-2xl"
      />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-blue-500/25 bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-blue-400">
              <Sparkles className="h-3 w-3 text-blue-400" />
              Space 3IA16 Hub
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl">
            Selamat datang di{" "}
            <span className="bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Space 3IA16
            </span>
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
            Pusat kolaborasi terpadu mahasiswa Informatika: kelola papan tugas, arsip materi
            kuliah, dan pantau pengumuman kelas tanpa berpindah platform.
          </p>
        </div>

        {/* Live / Online badge in top-right */}
        <div className="flex items-center gap-2 self-start rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-medium text-emerald-400 shadow-sm backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span>Kelas 3IA16 • Active</span>
        </div>
      </div>
    </section>
  );
}
