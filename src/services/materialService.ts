import type { Material, CreateMaterialInput } from "@/types";

export async function getMaterials(): Promise<Material[]> {
  const res = await fetch("/api/materials", { cache: "no-store" });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Gagal memuat materi.");
  if (Array.isArray(json.materials)) return json.materials;
  throw new Error("Format data materi tidak valid.");
}

export async function createMaterial(input: CreateMaterialInput): Promise<Material> {
  const res = await fetch("/api/admin/materials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Gagal membuat materi");
  return json.material;
}

export async function deleteMaterial(id: string): Promise<void> {
  const res = await fetch(`/api/admin/materials?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Gagal menghapus materi");
}
