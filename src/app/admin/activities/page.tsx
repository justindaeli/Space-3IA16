"use client";

import { useEffect, useState, useCallback } from "react";
import type { ActivityLog } from "@/types";
import { Search } from "lucide-react";


export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchActivities = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/activities?limit=100");
      if (res.ok) {
        const json = await res.json();
        setActivities(json.activities || []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchActivities();
  }, [fetchActivities]);

  const filtered = activities.filter((act) => {
    const q = search.toLowerCase();
    return (
      act.action.toLowerCase().includes(q) ||
      act.userName.toLowerCase().includes(q) ||
      act.target.toLowerCase().includes(q) ||
      (act.details && act.details.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">Log Aktivitas Sistem</h1>
          <p className="text-xs text-slate-600">
            Audit trail keamanan dan rekam jejak aksi pengguna serta administrator.
          </p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari aksi, pengguna, atau target..."
          className="w-full rounded-xl border border-slate-200 bg-white/80 pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-500 focus:outline-none focus:border-slate-400"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white/60 shadow-lg">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="border-b border-slate-200 bg-white/90 text-slate-600">
            <tr>
              <th className="p-3.5">Waktu</th>
              <th className="p-3.5">Pengguna</th>
              <th className="p-3.5">Aksi</th>
              <th className="p-3.5">Target</th>
              <th className="p-3.5">Rincian</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60">
            {loading ? (
              <tr><td colSpan={5} className="p-6 text-center text-slate-500">Memuat riwayat aktivitas...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} className="p-6 text-center text-slate-500">Tidak ada riwayat aktivitas.</td></tr>
            ) : (
              filtered.map((act) => (
                <tr key={act.id} className="hover:bg-slate-200/30 transition-colors">
                  <td className="p-3.5 text-slate-600 whitespace-nowrap">
                    {new Date(act.createdAt).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="p-3.5 font-medium text-slate-800">{act.userName}</td>
                  <td className="p-3.5">
                    <span className="inline-flex rounded-md bg-slate-200 px-2 py-0.5 text-[10px] font-mono font-semibold text-navy-800 border border-slate-300">
                      {act.action}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-700">{act.target}</td>
                  <td className="p-3.5 text-slate-600">{act.details || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

