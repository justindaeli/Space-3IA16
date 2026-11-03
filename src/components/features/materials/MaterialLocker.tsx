import type { Material } from "@/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";

interface MaterialLockerProps {
  materials: Material[];
  isLoading?: boolean;
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

export function MaterialLocker({ materials, isLoading = false }: MaterialLockerProps) {
  if (isLoading) {
    return <LoadingState label="Memuat materi..." />;
  }

  if (materials.length === 0) {
    return (
      <section id="materi">
        <h2 className="mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          Repository Materi
        </h2>
        <EmptyState
          title="Locker masih kosong"
          description="Unggah modul, slide, atau catatan per mata kuliah."
        />
      </section>
    );
  }

  const grouped = groupByCourse(materials);

  return (
    <section id="materi">
      <h2 className="mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-50">
        Repository Materi
      </h2>
      <div className="flex flex-col gap-4">
        {[...grouped.entries()].map(([course, items]) => (
          <article
            key={course}
            className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50"
          >
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{course}</h3>
            <ul className="mt-2 divide-y divide-zinc-200 dark:divide-zinc-700">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3 py-2">
                  <div>
                    <p className="text-sm text-zinc-800 dark:text-zinc-200">{item.title}</p>
                    <p className="text-xs capitalize text-zinc-500 dark:text-zinc-400">
                      {item.type}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
