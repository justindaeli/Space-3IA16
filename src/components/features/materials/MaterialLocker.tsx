"use client";

import { useState, useMemo } from "react";
import type { Material, MaterialType } from "@/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { MaterialItem } from "@/components/features/materials/MaterialItem";
import { BookOpen, Search } from "lucide-react";

interface MaterialLockerProps {
  materials: Material[];
}

function groupByCourse(items: Material[]): Map<string, Material[]> {
  const groups = new Map<string, Material[]>();
  for (const material of items) {
    const current = groups.get(material.course) ?? [];
    current.push(material);
    groups.set(material.course, current);
  }
  return groups;
}

export function MaterialLocker({ materials }: MaterialLockerProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return materials.filter((m) => {
      const matchSearch =
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.course.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "all" || m.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [materials, search, typeFilter]);

  const grouped = groupByCourse(filtered);

  return (
    <section id="materi" className="scroll-mt-24 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-zinc-100 sm:text-xl">
            Repository Materi
          </h2>
          <p className="text-xs text-zinc-400">
            Koleksi modul, slide kuliah, dan catatan praktikum kelas 3IA16
          </p>
        </div>
        <span className="rounded-full border border-zinc-700/80 bg-zinc-800/80 px-3 py-1 text-xs font-medium text-zinc-300">
          {materials.length} Berkas Tersedia
        </span>
      </div>

      {/* Filter toolbar */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari materi kuliah atau topik..."
            className="w-full rounded-xl border border-zinc-800/80 bg-zinc-900/60 pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none"
        >
          <option value="all">Semua Tipe Berkas</option>
          <option value="modul">Modul Praktikum</option>
          <option value="slide">Slide Presentasi</option>
          <option value="catatan">Catatan</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Tidak Ada Materi Ditemukan"
          description="Tidak ada dokumen yang cocok dengan kata kunci atau filter tipe yang dipilih."
          icon={<BookOpen className="h-6 w-6 text-zinc-500" />}
          action={
            <button
              onClick={() => { setSearch(""); setTypeFilter("all"); }}
              className="text-xs text-blue-400 underline hover:text-blue-300"
            >
              Reset Filter
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {[...grouped.entries()].map(([course, items]) => (
            <article
              key={course}
              className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 shadow-lg shadow-black/20 backdrop-blur transition-all duration-200 hover:border-zinc-700"
            >
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                <h3 className="text-sm font-semibold text-zinc-100">{course}</h3>
                <span className="text-xs text-zinc-400">{items.length} materi</span>
              </div>

              <ul className="divide-y divide-zinc-800/60">
                {items.map((item) => (
                  <MaterialItem key={item.id} material={item} />
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
