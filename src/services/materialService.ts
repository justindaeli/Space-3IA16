import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { mockMaterials } from "@/lib/mock-data";
import type { Material } from "@/types";

export async function getMaterials(): Promise<Material[]> {
  if (!isSupabaseConfigured || supabase === null) {
    return Promise.resolve(mockMaterials);
  }

  try {
    const { data, error } = await supabase
      .from("materials")
      .select("id, title, course, type, url, uploadedAt:uploaded_at")
      .order("course", { ascending: true })
      .order("title", { ascending: true });

    if (error || !Array.isArray(data) || data.length === 0) {
      return mockMaterials;
    }

    return data as Material[];
  } catch {
    return mockMaterials;
  }
}
