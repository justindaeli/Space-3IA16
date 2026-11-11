import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/server/session";
import { findUserById, updateUserRole, updateUserStatus } from "@/lib/server/db-supabase-users";
import { deleteUser, logActivity } from "@/lib/server/db-supabase-content";
import type { UpdateUserInput } from "@/types";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdminUser();
    const { id } = await params;
    const body = (await request.json()) as UpdateUserInput;

    const existing = await findUserById(id);
    if (!existing) {
      return NextResponse.json({ error: "Pengguna tidak ditemukan." }, { status: 404 });
    }

    if (body.role && (body.role === "admin" || body.role === "user")) {
      await updateUserRole(id, body.role);
    }
    if (body.status && (body.status === "active" || body.status === "inactive")) {
      await updateUserStatus(id, body.status);
    }

    const updated = await findUserById(id);
    if (!updated) {
      return NextResponse.json({ error: "Gagal memperbarui pengguna" }, { status: 500 });
    }

    await logActivity(
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

    const target = await findUserById(id);
    if (!target) {
      return NextResponse.json({ error: "Pengguna tidak ditemukan." }, { status: 404 });
    }

    await deleteUser(id);
    await logActivity(
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

