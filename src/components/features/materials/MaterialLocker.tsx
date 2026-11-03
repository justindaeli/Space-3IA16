import type { Material } from "@/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { MaterialItem } from "@/components/features/materials/MaterialItem";
import { BookOpen } from "lucide-react";

interface MaterialLockerProps {
  materials: Material[];
}

function groupByCourse(items: Material[]): Map<string, Material[]> {
  const groups = new Map<string, Material[]>();
  for (const material of items) {
    const current = groups.get(material.course) ?? [];
    current.push(material);
    groups.set(material.course, current);
  }
  return groups;
}

export function MaterialLocker({ materials }: MaterialLockerProps) {
  const grouped = groupByCourse(materials);

  return (
    <section id="materi" className="scroll-mt-24 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-zinc-100 sm:text-xl">
            Repository Materi
          </h2>
          <p className="text-xs text-zinc-400">
            Koleksi modul, slide kuliah, dan catatan praktikum kelas 3IA16
          </p>
        </div>
        <span className="rounded-full border border-zinc-700/80 bg-zinc-800/80 px-3 py-1 text-xs font-medium text-zinc-300">
          {materials.length} Berkas
        </span>
      </div>

      {materials.length === 0 ? (
        <EmptyState
          title="Locker Masih Kosong"
          description="Belum ada modul, slide, atau catatan perkuliahan yang diunggah."
          icon={<BookOpen className="h-6 w-6 text-zinc-500" />}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {[...grouped.entries()].map(([course, items]) => (
            <article
              key={course}
              className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 shadow-lg shadow-black/20 backdrop-blur transition-all duration-200 hover:border-zinc-700"
            >
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                <h3 className="text-sm font-semibold text-zinc-100">{course}</h3>
                <span className="text-xs text-zinc-400">{items.length} materi</span>
              </div>

              <ul className="divide-y divide-zinc-800/60">
                {items.map((item) => (
                  <MaterialItem key={item.id} material={item} />
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
