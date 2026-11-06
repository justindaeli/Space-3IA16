"use client";

import { useState, type FormEvent } from "react";
import { inputClass, primaryButtonClass } from "@/lib/ui-classes";
import { FolderPlus, BookOpen, Trash2 } from "lucide-react";
import type { Material, MaterialType } from "@/types";

export function MaterialManager() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("IMK");
  const [type, setType] = useState<MaterialType>("modul");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !course.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, course, type, url }),
      });
      if (res.ok) {
        const json = await res.json();
        setMaterials((prev) => [json.material, ...prev]);
        setTitle("");
        setUrl("");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus materi ini?")) return;
    const res = await fetch(`/api/admin/materials?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (res.ok) {
      setMaterials((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 space-y-4">
      <div className="flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-amber-400" />
        <h2 className="text-sm font-semibold text-zinc-100">Tambah Berkas Materi Kuliah</h2>
      </div>

      <form onSubmit={handleAdd} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul Materi (Modul / Slide)..."
            className={`${inputClass} text-xs`}
          />
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Mata Kuliah (IMK, Jarkom, dsb)..."
            className={`${inputClass} text-xs`}
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as MaterialType)}
            className={`${inputClass} text-xs`}
          >
            <option value="modul">Modul</option>
            <option value="slide">Slide</option>
            <option value="catatan">Catatan</option>
          </select>
        </div>

        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Link Unduhan Dokumen (https://...)"
            className={`${inputClass} text-xs`}
          />
          <button type="submit" disabled={loading} className={`${primaryButtonClass} shrink-0 text-xs py-2`}>
            <FolderPlus className="h-3.5 w-3.5" />
            <span>Simpan Materi</span>
          </button>
        </div>
      </form>

      <div className="divide-y divide-zinc-800/60">
        {materials.length === 0 ? (
          <p className="py-3 text-center text-xs text-zinc-500">Materi yang baru ditambahkan sesi ini akan tampil di sini.</p>
        ) : (
          materials.map((m) => (
            <div key={m.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-medium text-zinc-200">{m.title}</p>
                <p className="text-[11px] text-zinc-400">{m.course} · {m.type}</p>
              </div>
              <button onClick={() => handleDelete(m.id)} className="p-1 text-zinc-500 hover:text-red-400">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

