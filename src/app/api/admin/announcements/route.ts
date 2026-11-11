import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/server/session";
import { createAnnouncement, deleteAnnouncement, logActivity } from "@/lib/server/db-supabase-content";
import type { CreateAnnouncementInput } from "@/types";

export async function POST(request: Request) {
  try {
    const admin = await requireAdminUser();
    const body = (await request.json()) as CreateAnnouncementInput;

    if (!body.title?.trim()) {
      return NextResponse.json({ error: "Isi pengumuman wajib diisi." }, { status: 400 });
    }

    const created = await createAnnouncement(body);
    if (!created) {
      return NextResponse.json({ error: "Gagal membuat pengumuman" }, { status: 500 });
    }

    await logActivity(admin.id, admin.name, "CREATE_ANNOUNCEMENT", created.title, "Membuat pengumuman baru");

    return NextResponse.json({ success: true, announcement: created }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal membuat pengumuman";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const admin = await requireAdminUser();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID pengumuman diperlukan." }, { status: 400 });
    }

    const ok = await deleteAnnouncement(id);
    if (!ok) {
      return NextResponse.json({ error: "Pengumuman tidak ditemukan." }, { status: 404 });
    }

    await logActivity(admin.id, admin.name, "DELETE_ANNOUNCEMENT", id, "Menghapus pengumuman kelas");
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menghapus pengumuman";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

