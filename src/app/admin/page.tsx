"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, CheckSquare, FolderOpen, Bell, ArrowRight, ShieldCheck } from "lucide-react";
import type { AdminStats } from "@/types";
import { Skeleton } from "@/components/ui/Skeleton";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const json = await res.json();
          setStats(json.stats);
        }
      } finally {
        setLoading(false);
      }
    }
    void loadStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!stats) return <p className="text-sm text-zinc-400">Gagal memuat statistik admin.</p>;

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-50">Overview Platform</h1>
        <p className="text-xs text-zinc-400">
          Statistik komprehensif aktivitas pengguna dan data akademik Space 3IA16.
        </p>
      </div>

      {/* 4 Metrics Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <article className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-zinc-400">Pengguna</span>
            <Users className="h-4 w-4 text-blue-400" />
          </div>
          <p className="mt-3 text-2xl font-bold text-zinc-100">{stats.totalUsers}</p>
          <p className="mt-1 text-[11px] text-zinc-400">{stats.activeUsers} akun aktif · {stats.adminCount} admin</p>
        </article>

        <article className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-zinc-400">Tugas Kelompok</span>
            <CheckSquare className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="mt-3 text-2xl font-bold text-zinc-100">{stats.totalTasks}</p>
          <p className="mt-1 text-[11px] text-zinc-400">{stats.completedTasks} tugas selesai</p>
        </article>

        <article className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-zinc-400">Materi</span>
            <FolderOpen className="h-4 w-4 text-amber-400" />
          </div>
          <p className="mt-3 text-2xl font-bold text-zinc-100">{stats.totalMaterials}</p>
          <p className="mt-1 text-[11px] text-zinc-400">Modul, slide & catatan</p>
        </article>

        <article className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-zinc-400">Pengumuman</span>
            <Bell className="h-4 w-4 text-purple-400" />
          </div>
          <p className="mt-3 text-2xl font-bold text-zinc-100">{stats.totalAnnouncements}</p>
          <p className="mt-1 text-[11px] text-zinc-400">Pesan siaran aktif</p>
        </article>
      </div>

      {/* Course Breakdown & Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Distribution */}
        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5">
          <h2 className="text-sm font-semibold text-zinc-200">Distribusi Tugas per Mata Kuliah</h2>
          <div className="mt-4 space-y-3">
            {Object.entries(stats.tasksByCourse).map(([course, count]) => {
              const pct = Math.round((count / (stats.totalTasks || 1)) * 100);
              return (
                <div key={course}>
                  <div className="flex justify-between text-xs text-zinc-300 mb-1">
                    <span>{course}</span>
                    <span className="font-semibold text-zinc-400">{count} tugas ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-200">Log Aktivitas Terbaru</h2>
            <Link href="/admin/activities" className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1">
              Lihat semua <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-zinc-800/60 text-xs">
            {stats.recentActivities.slice(0, 5).map((act) => (
              <div key={act.id} className="py-2.5 flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-zinc-200">{act.action}</p>
                  <p className="text-[11px] text-zinc-400">{act.userName} · {act.target}</p>
                </div>
                <span className="shrink-0 text-[10px] text-zinc-500">
                  {new Date(act.createdAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

