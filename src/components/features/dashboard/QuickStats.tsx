import type { QuickStats as QuickStatsData } from "@/types";
import { formatDeadline } from "@/lib/format";
import { panelClass } from "@/lib/ui-classes";

interface QuickStatsProps {
  stats: QuickStatsData;
}

export function QuickStats({ stats }: QuickStatsProps) {
  const cards = [
    { label: "Tugas aktif", value: String(stats.activeTaskCount) },
    {
      label: "Deadline terdekat",
      value: stats.nearestDeadline ? formatDeadline(stats.nearestDeadline) : "Tidak ada",
    },
    {
      label: "Pengumuman terbaru",
      value: stats.latestAnnouncement?.title ?? "Belum ada",
    },
  ];

  return (
    <section id="stats" className="grid scroll-mt-24 grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.label}
          className={`${panelClass} p-4 transition-colors duration-200 hover:border-zinc-700`}
        >
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            {card.label}
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-zinc-50">{card.value}</p>
        </article>
      ))}
    </section>
  );
}
