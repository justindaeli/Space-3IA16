"use client";

import { useCallback, useEffect, useState } from "react";
import { MaterialCourseGroup } from "@/components/features/materials/MaterialCourseGroup";
import { getMaterials } from "@/services/materialService";
import type { Material } from "@/types";

type LockerStatus = "loading" | "error" | "ready";

function groupByCourse(items: Material[]): Map<string, Material[]> {
  const groups = new Map<string, Material[]>();
  for (const item of items) {
    const current = groups.get(item.course) ?? [];
    current.push(item);
    groups.set(item.course, current);
  }
  return groups;
}

export function MaterialLocker() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [status, setStatus] = useState<LockerStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("Gagal memuat materi.");

  const loadMaterials = useCallback(async () => {
    setStatus("loading");
    try {
      const data = await getMaterials();
      setMaterials(data);
      setStatus("ready");
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : "Gagal memuat materi.",
      );
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void loadMaterials();
  }, [loadMaterials]);

  return (
    <section
      id="materi"
      className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-6"
    >
      <header className="mb-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-indigo-400">
          Material Locker
        </p>
        <h2 className="mt-1 text-base font-semibold text-zinc-100">Repository Materi</h2>
      </header>

      {status === "loading" ? (
        <div className="flex items-center justify-center gap-2 py-10 text-sm text-zinc-400" role="status">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-700 border-t-indigo-400" />
          Memuat materi...
        </div>
      ) : null}

      {status === "error" ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-8 text-center">
          <p className="text-sm font-medium text-zinc-100">Gagal memuat locker</p>
          <p className="mt-1 text-sm text-zinc-500">{errorMessage}</p>
          <button
            type="button"
            onClick={() => void loadMaterials()}
            className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-xs font-medium text-white transition-all duration-200 hover:bg-indigo-500 hover:opacity-90"
          >
            Coba lagi
          </button>
        </div>
      ) : null}

      {status === "ready" && materials.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-800 px-4 py-8 text-center">
          <p className="text-sm font-medium text-zinc-100">Locker masih kosong</p>
          <p className="mt-1 text-sm text-zinc-500">
            Belum ada modul, slide, atau catatan per mata kuliah.
          </p>
        </div>
      ) : null}

      {status === "ready" && materials.length > 0 ? (
        <div className="flex flex-col gap-3">
          {[...groupByCourse(materials).entries()].map(([course, items]) => (
            <MaterialCourseGroup key={course} course={course} materials={items} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
