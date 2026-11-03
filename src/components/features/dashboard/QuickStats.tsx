import type { QuickStats as QuickStatsData } from "@/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";

interface QuickStatsProps {
  stats: QuickStatsData;
  isLoading?: boolean;
}

function formatDate(value: string): string {
  return new Date(`${value}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function QuickStats({ stats, isLoading = false }: QuickStatsProps) {
  if (isLoading) {
    return <LoadingState label="Memuat ringkasan..." />;
  }

  const cards = [
    {
      label: "Tugas aktif",
      value: String(stats.activeTaskCount),
    },
    {
      label: "Deadline terdekat",
      value: stats.nearestDeadline ? formatDate(stats.nearestDeadline) : "Tidak ada",
    },
    {
      label: "Pengumuman terbaru",
      value: stats.latestAnnouncement?.title ?? "Belum ada",
    },
  ];

  const isEmpty =
    stats.activeTaskCount === 0 &&
    stats.nearestDeadline === null &&
    stats.latestAnnouncement === null;

  if (isEmpty) {
    return (
      <EmptyState
        title="Belum ada aktivitas"
        description="Tugas, deadline, dan pengumuman akan muncul di sini."
      />
    );
  }

  return (
    <section id="stats" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.label}
          className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4 transition-colors duration-200 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-800/60 dark:hover:border-zinc-700"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {card.label}
          </p>
          <p className="mt-2 text-sm font-semibold leading-5 text-zinc-900 dark:text-zinc-50">
            {card.value}
          </p>
        </article>
      ))}
    </section>
  );
}
