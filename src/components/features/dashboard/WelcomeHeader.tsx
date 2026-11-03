import { panelClass } from "@/lib/ui-classes";

export function WelcomeHeader() {
  return (
    <section className={`${panelClass} px-6 py-8`}>
      <p className="text-xs font-medium uppercase tracking-wider text-blue-400">
        Kelas 3IA16
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
        Selamat datang di Space 3IA16
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
        Kelola tugas kelompok, bagikan materi kuliah, dan kolaborasi dalam satu tempat.
      </p>
    </section>
  );
}
