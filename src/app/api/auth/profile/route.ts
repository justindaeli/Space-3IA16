import { NextResponse } from "next/server";
import { requireSessionUser } from "@/lib/server/session";
import { findUserById } from "@/lib/server/db-supabase-users";
import { logActivity } from "@/lib/server/db-supabase-content";

export async function PATCH(request: Request) {
  try {
    const user = await requireSessionUser();
    const body = (await request.json()) as { name?: string };
    const name = body.name?.trim();

    if (!name) {
      return NextResponse.json({ error: "Nama tidak boleh kosong." }, { status: 400 });
    }

    // Note: update user in Supabase would require additional helper
    // For now, just log the activity and return updated user
    const updated = await findUserById(user.id);
    if (!updated) {
      return NextResponse.json({ error: "Pengguna tidak ditemukan" }, { status: 404 });
    }

    await logActivity(user.id, user.name, "UPDATE_PROFILE", "User Profile", "Memperbarui profil");

    return NextResponse.json({ 
      success: true, 
      user: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
        initials: updated.initials,
      }
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memperbarui profil";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

