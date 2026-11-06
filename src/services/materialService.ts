import { mockMaterials } from "@/lib/mock-data";
import type { Material, CreateMaterialInput } from "@/types";

export async function getMaterials(): Promise<Material[]> {
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/materials");
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.materials) && json.materials.length > 0) {
          return json.materials;
        }
      }
    } catch {
      // fallback to mock
    }
  }
  return Promise.resolve(mockMaterials);
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
