import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { mockAnnouncements } from "@/lib/mock-data";
import type { Announcement } from "@/types";

export async function getAnnouncements(): Promise<Announcement[]> {
  if (!isSupabaseConfigured || supabase === null) {
    return Promise.resolve(mockAnnouncements);
  }

  try {
    const { data, error } = await supabase
      .from("announcements")
      .select("id, title, createdAt:created_at")
      .order("created_at", { ascending: false });

    if (error || !Array.isArray(data) || data.length === 0) {
      return mockAnnouncements;
    }

    return data as Announcement[];
  } catch {
    return mockAnnouncements;
  }
}
