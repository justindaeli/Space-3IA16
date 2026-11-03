import { supabase } from "@/lib/supabase";
import type { Announcement } from "@/types";

export async function getAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from("announcements")
    .select("id, title, createdAt:created_at")
    .order("created_at", { ascending: false });

  if (error || !Array.isArray(data)) {
    console.error("Error fetching announcements:", error?.message);
    throw new Error("Gagal mengambil pengumuman.");
  }

  return data as Announcement[];
}
