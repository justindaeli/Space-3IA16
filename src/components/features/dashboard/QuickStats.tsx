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
      icon: <CheckCircle2 className="h-5 w-5 text-sky-700" />,
      iconBg: "bg-sky-600/10",
      iconBorder: "border-sky-600/20",
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
      icon: <Megaphone className="h-5 w-5 text-sky-700" />,
      iconBg: "bg-sky-50",
      iconBorder: "border-sky-200",
    },
  ];

  return (
    <section id="stats" className="scroll-mt-24 rounded-lg border border-slate-200 bg-white">
      <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {items.map((item) => (
          <article key={item.label} className="flex min-h-28 items-center gap-4 px-5 py-4">
            <div className="shrink-0">{item.icon}</div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
              <p className="mt-1 truncate text-lg font-bold text-slate-950">{item.value}</p>
              <p className="mt-0.5 truncate text-xs text-slate-600">{item.subtext}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
