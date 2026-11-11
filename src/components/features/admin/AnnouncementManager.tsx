"use client";

import { useState, useCallback, type FormEvent } from "react";
import { inputClass, primaryButtonClass } from "@/lib/ui-classes";
import { Plus, Trash2, Megaphone } from "lucide-react";
import type { Announcement } from "@/types";

export function AnnouncementManager() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAnnouncements = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        // we can fetch announcements from admin API or mock
      }
    } catch {
      // fallback
    }
  }, []);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (res.ok) {
        const json = await res.json();
        setAnnouncements((prev) => [json.announcement, ...prev]);
        setTitle("");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus pengumuman ini?")) return;
    const res = await fetch(`/api/admin/announcements?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (res.ok) {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/60 p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Megaphone className="h-4 w-4 text-purple-400" />
        <h2 className="text-sm font-semibold text-slate-900">Siaran Pengumuman Kelas</h2>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tulis pengumuman baru untuk kelas..."
          className={`${inputClass} text-xs`}
        />
        <button type="submit" disabled={loading} className={`${primaryButtonClass} shrink-0 text-xs py-2`}>
          <Plus className="h-3.5 w-3.5" />
          <span>Terbitkan</span>
        </button>
      </form>

      <div className="divide-y divide-slate-200/60">
        {announcements.length === 0 ? (
          <p className="py-3 text-center text-xs text-slate-500">Belum ada pengumuman khusus yang dibuat sesi ini.</p>
        ) : (
          announcements.map((a) => (
            <div key={a.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
              <p className="text-slate-800">{a.title}</p>
              <button
                onClick={() => handleDelete(a.id)}
                className="p-1 text-slate-500 hover:text-red-400"
                title="Hapus"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

