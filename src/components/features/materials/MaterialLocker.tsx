import type { Material } from "@/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { MaterialItem } from "@/components/features/materials/MaterialItem";

interface MaterialLockerProps {
  materials: Material[];
}

function groupByCourse(materials: Material[]): Map<string, Material[]> {
  const groups = new Map<string, Material[]>();
  for (const material of materials) {
    const current = groups.get(material.course) ?? [];
    current.push(material);
    groups.set(material.course, current);
  }
  return groups;
}

export function MaterialLocker({ materials }: MaterialLockerProps) {
  return (
    <section id="materi" className="scroll-mt-24 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-zinc-50">Repository Materi</h2>
        <span className="text-sm text-zinc-400">{materials.length} berkas</span>
      </div>
      {materials.length === 0 ? (
        <EmptyState
          title="Locker masih kosong"
          description="Modul, slide, dan catatan per mata kuliah akan muncul di sini."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {[...groupByCourse(materials).entries()].map(([course, items]) => (
            <article key={course} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
              <h3 className="text-sm font-semibold text-zinc-100">{course}</h3>
              <ul className="mt-2 divide-y divide-zinc-800">
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
