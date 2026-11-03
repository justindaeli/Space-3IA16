import type { ReactNode } from "react";
import { CheckCircle2, CalendarClock, Megaphone } from "lucide-react";
import type { QuickStats as QuickStatsData } from "@/types";
import { formatDeadline } from "@/lib/format";
import { EmptyState } from "@/components/ui/EmptyState";

interface QuickStatsProps {
  stats: QuickStatsData;
}

interface StatItem {
  label: string;
  value: string;
  subtext: string;
  icon: ReactNode;
  iconBg: string;
  iconBorder: string;
}

export function QuickStats({ stats }: QuickStatsProps) {
  const isEmpty =
    stats.activeTaskCount === 0 &&
    stats.nearestDeadline === null &&
    stats.latestAnnouncement === null;

  if (isEmpty) {
    return (
      <EmptyState
        title="Belum ada aktivitas"
        description="Tugas, deadline terdekat, dan pengumuman kelas akan ditampilkan di sini."
      />
    );
  }

  const items: StatItem[] = [
    {
      label: "Tugas Aktif",
      value: String(stats.activeTaskCount),
      subtext: "Perlu diselesaikan kelompok",
      icon: <CheckCircle2 className="h-5 w-5 text-blue-400" />,
      iconBg: "bg-blue-500/10",
      iconBorder: "border-blue-500/20",
    },
    {
      label: "Deadline Terdekat",
      value: stats.nearestDeadline ? formatDeadline(stats.nearestDeadline) : "Tidak ada",
      subtext: stats.nearestDeadline ? "Segera rampungkan" : "Semua tugas terkendali",
      icon: <CalendarClock className="h-5 w-5 text-amber-400" />,
      iconBg: "bg-amber-500/10",
      iconBorder: "border-amber-500/20",
    },
    {
      label: "Pengumuman Terbaru",
      value: stats.latestAnnouncement?.title ?? "Belum ada pengumuman",
      subtext: "Informasi perkuliahan terkini",
      icon: <Megaphone className="h-5 w-5 text-indigo-400" />,
      iconBg: "bg-indigo-500/10",
      iconBorder: "border-indigo-500/20",
    },
  ];

  return (
    <section id="stats" className="grid scroll-mt-24 grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.label}
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 p-5 shadow-lg shadow-black/20 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-xl hover:shadow-blue-500/5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {item.label}
            </span>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl border ${item.iconBorder} ${item.iconBg} transition-transform duration-200 group-hover:scale-105`}
            >
              {item.icon}
            </div>
          </div>

          <div className="mt-4">
            <p className="line-clamp-2 text-xl font-bold tracking-tight text-zinc-100 sm:text-2xl">
              {item.value}
            </p>
            <p className="mt-1 text-xs text-zinc-400">{item.subtext}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
