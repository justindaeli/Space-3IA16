import { supabase } from "@/lib/supabase";
import type { Material } from "@/types";

export async function getMaterials(): Promise<Material[]> {
  const { data, error } = await supabase
    .from("materials")
    .select("id, title, course, type, url, uploadedAt:uploaded_at")
    .order("course", { ascending: true })
    .order("title", { ascending: true });

  if (error || !Array.isArray(data)) {
    console.error("Error fetching materials:", error?.message);
    throw new Error("Gagal mengambil data materi.");
  }

  return data as Material[];
}
