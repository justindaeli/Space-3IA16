import { materialsSchema } from "@/lib/material-schema";
import type { Material } from "@/types";

export async function getMaterials(): Promise<Material[]> {
  try {
    const response = await fetch("/api/materials");
    if (!response.ok) {
      throw new Error("Gagal mengambil data materi.");
    }

    const payload: unknown = await response.json();
    return materialsSchema.parse(payload);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Gagal mengambil data materi.");
  }
}

export function getMaterialFileName(fileUrl: string): string {
  const path = fileUrl.split("?")[0];
  const segments = path.split("/");
  const name = segments[segments.length - 1];
  return name.length > 0 ? name : "materi";
}

export function downloadMaterial(fileUrl: string): void {
  const anchor = document.createElement("a");
  anchor.href = fileUrl;
  anchor.download = getMaterialFileName(fileUrl);
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export function openMaterial(fileUrl: string): void {
  window.open(fileUrl, "_blank", "noopener,noreferrer");
}
