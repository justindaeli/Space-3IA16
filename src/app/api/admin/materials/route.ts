import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/server/session";
import { createDbMaterial, deleteDbMaterial } from "@/lib/server/db-content";
import { logActivity } from "@/lib/server/db-content";
import type { CreateMaterialInput } from "@/types";

export async function POST(request: Request) {
  try {
    const admin = await requireAdminUser();
    const body = (await request.json()) as CreateMaterialInput;

    if (!body.title || !body.course || !body.type) {
      return NextResponse.json({ error: "Judul, Mata Kuliah, dan Tipe wajib diisi." }, { status: 400 });
    }

    const created = createDbMaterial(body);
    logActivity(admin.id, admin.name, "CREATE_MATERIAL", created.title, `Menambahkan materi (${created.course})`);

    return NextResponse.json({ success: true, material: created }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menambahkan materi";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const admin = await requireAdminUser();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID materi diperlukan." }, { status: 400 });
    }

    const ok = deleteDbMaterial(id);
    if (!ok) {
      return NextResponse.json({ error: "Materi tidak ditemukan." }, { status: 404 });
    }

    logActivity(admin.id, admin.name, "DELETE_MATERIAL", id, "Menghapus materi perkuliahan");
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menghapus materi";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

