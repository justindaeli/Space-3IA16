export function WelcomeHeader() {
  return (
    <section className="border-y-4 border-sky-700 bg-white px-1 py-6 sm:py-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-700">Portal Kelas · Semester Ganjil & Genap 2026</p>
          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Ruang Kelas 3IA16</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">Tempat kelas menyimpan tugas, bahan kuliah, dan kabar terbaru.</p>
        </div>
        <div className="border-l-2 border-amber-500 pl-3 text-left text-xs text-slate-600 sm:min-w-44">
          <p className="font-semibold text-slate-900">Program Studi Informatika</p>
          <p className="mt-1">Kelas aktif · 36 mahasiswa</p>
        </div>
      </div>
    </section>
  );
}
