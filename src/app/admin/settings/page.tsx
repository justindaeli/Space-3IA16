"use client";

import { useState } from "react";
import { primaryButtonClass, inputClass } from "@/lib/ui-classes";
import { Settings, Database, CheckCircle2 } from "lucide-react";

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
        <h1 className="text-2xl font-bold tracking-tight text-slate-950">Pengaturan Sistem</h1>
        <p className="text-xs text-slate-600">Konfigurasi umum platform kolaborasi kelas Space 3IA16.</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-700">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span>Pengaturan berhasil disimpan.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="rounded-lg border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="h-4 w-4 text-sky-700" />
          <h2 className="text-sm font-semibold text-slate-900">Informasi Kelas & Platform</h2>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">Nama Platform</label>
          <input
            type="text"
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">Periode Akademik / Semester</label>
          <input
            type="text"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-emerald-600" />
              <div>
                <p className="font-medium text-slate-800">Database Engine</p>
                <p className="text-[11px] text-slate-600">Supabase + Local Persistent Store</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
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

