"use client";

import { downloadMaterial, openMaterial } from "@/services/materialService";
import type { Material } from "@/types";

interface MaterialRowProps {
  material: Material;
}

function formatDate(value: string): string {
  return new Date(`${value}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function MaterialRow({ material }: MaterialRowProps) {
  return (
    <li className="flex flex-col gap-3 border-t border-zinc-800 py-3 first:border-t-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-zinc-100">{material.title}</p>
        <p className="mt-1 text-xs capitalize text-zinc-500">
          {material.category} · {formatDate(material.createdAt)}
        </p>
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => openMaterial(material.fileUrl)}
          className="rounded-md border border-indigo-500/40 px-3 py-1.5 text-xs font-medium text-indigo-300 transition-all duration-200 hover:bg-indigo-500/10 hover:opacity-90"
        >
          Lihat
        </button>
        <button
          type="button"
          onClick={() => downloadMaterial(material.fileUrl)}
          className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-all duration-200 hover:bg-indigo-500 hover:opacity-90"
        >
          Unduh
        </button>
      </div>
    </li>
  );
}
