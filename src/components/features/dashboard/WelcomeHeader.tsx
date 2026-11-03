export function WelcomeHeader() {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-6 dark:border-zinc-800 dark:bg-zinc-800/60">
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        KelasIn16 Hub
      </p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Selamat datang di KelasIn16
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        Kelola tugas kelompok, bagikan materi kuliah, dan kolaborasi satu tempat —
        tanpa berpindah platform.
      </p>
    </section>
  );
}
