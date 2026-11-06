"use client";

import { AnnouncementManager } from "@/components/features/admin/AnnouncementManager";
import { MaterialManager } from "@/components/features/admin/MaterialManager";

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-50">Kelola Konten Akademik</h1>
        <p className="text-xs text-zinc-400">
          Publikasi pengumuman siaran kelas dan arsip dokumen repository materi kuliah.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnnouncementManager />
        <MaterialManager />
      </div>
    </div>
  );
}

