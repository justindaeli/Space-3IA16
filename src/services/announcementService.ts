import type { Announcement, CreateAnnouncementInput } from "@/types";

export async function getAnnouncements(): Promise<Announcement[]> {
  const res = await fetch("/api/announcements", { cache: "no-store" });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Gagal memuat pengumuman.");
  if (Array.isArray(json.announcements)) return json.announcements;
  throw new Error("Format data pengumuman tidak valid.");
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
