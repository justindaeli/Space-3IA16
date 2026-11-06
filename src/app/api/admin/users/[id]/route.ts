import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/server/session";
import { updateUser, deleteUser, findUserById } from "@/lib/server/db-users";
import { logActivity } from "@/lib/server/db-content";
import type { UpdateUserInput } from "@/types";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdminUser();
    const { id } = await params;
    const body = (await request.json()) as UpdateUserInput;

    const existing = findUserById(id);
    if (!existing) {
      return NextResponse.json({ error: "Pengguna tidak ditemukan." }, { status: 404 });
    }

    const updated = updateUser(id, body);
    logActivity(
      admin.id,
      admin.name,
      "UPDATE_USER",
      updated.name,
      `Memperbarui data pengguna (${updated.email})`
    );

    return NextResponse.json({ success: true, user: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memperbarui pengguna";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdminUser();
    const { id } = await params;

    if (id === admin.id) {
      return NextResponse.json(
        { error: "Anda tidak dapat menghapus akun Anda sendiri." },
        { status: 400 }
      );
    }

    const target = findUserById(id);
    if (!target) {
      return NextResponse.json({ error: "Pengguna tidak ditemukan." }, { status: 404 });
    }

    deleteUser(id);
    logActivity(
      admin.id,
      admin.name,
      "DELETE_USER",
      target.name,
      `Menghapus pengguna ${target.email}`
    );

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menghapus pengguna";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

