"use client";

import { useState } from "react";
import { primaryButtonClass, inputClass } from "@/lib/ui-classes";
import { Settings, ShieldCheck, Database, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [platformName, setPlatformName] = useState("Space 3IA16 Hub");
  const [semester, setSemester] = useState("Semester 6 (2025/2026)");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-50">Pengaturan Sistem</h1>
        <p className="text-xs text-zinc-400">Konfigurasi umum platform kolaborasi kelas Space 3IA16.</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-900/60 bg-emerald-950/40 p-3 text-xs text-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>Pengaturan berhasil disimpan.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="h-4 w-4 text-indigo-400" />
          <h2 className="text-sm font-semibold text-zinc-100">Informasi Kelas & Platform</h2>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-300">Nama Platform</label>
          <input
            type="text"
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-300">Periode Akademik / Semester</label>
          <input
            type="text"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="pt-2 border-t border-zinc-800">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-emerald-400" />
              <div>
                <p className="font-medium text-zinc-200">Database Engine</p>
                <p className="text-[11px] text-zinc-400">Supabase + Local Persistent Store</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
              Sinkron & Terhubung
            </span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" className={primaryButtonClass}>
            Simpan Konfigurasi
          </button>
        </div>
      </form>
    </div>
  );
}

