import { mockAnnouncements } from "@/lib/mock-data";
import type { Announcement, CreateAnnouncementInput } from "@/types";

export async function getAnnouncements(): Promise<Announcement[]> {
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/announcements");
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.announcements) && json.announcements.length > 0) {
          return json.announcements;
        }
      }
    } catch {
      // fallback to mock
    }
  }
  return Promise.resolve(mockAnnouncements);
}

export async function createAnnouncement(input: CreateAnnouncementInput): Promise<Announcement> {
  const res = await fetch("/api/admin/announcements", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Gagal membuat pengumuman");
  return json.announcement;
}

export async function deleteAnnouncement(id: string): Promise<void> {
  const res = await fetch(`/api/admin/announcements?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Gagal menghapus pengumuman");
}
