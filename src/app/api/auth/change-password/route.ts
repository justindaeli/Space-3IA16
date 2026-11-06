import { NextResponse } from "next/server";
import { requireSessionUser } from "@/lib/server/session";
import { findUserById, updateUser } from "@/lib/server/db-users";
import { verifyPassword } from "@/lib/server/crypto";
import { logActivity } from "@/lib/server/db-content";
import type { ChangePasswordInput } from "@/types";

export async function POST(request: Request) {
  try {
    const user = await requireSessionUser();
    const body = (await request.json()) as Partial<ChangePasswordInput>;
    const currentPassword = body.currentPassword?.trim();
    const newPassword = body.newPassword?.trim();
    const confirmPassword = body.confirmPassword?.trim();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "Semua kolom password wajib diisi." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password baru minimal harus 6 karakter." },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "Konfirmasi password baru tidak cocok." },
        { status: 400 }
      );
    }

    const dbUser = findUserById(user.id);
    if (!dbUser) {
      return NextResponse.json({ error: "Pengguna tidak ditemukan." }, { status: 404 });
    }

    const isValid = verifyPassword(currentPassword, dbUser.passwordHash, dbUser.passwordSalt);
    if (!isValid) {
      return NextResponse.json({ error: "Password lama Anda salah." }, { status: 400 });
    }

    updateUser(user.id, { newPassword });
    logActivity(user.id, user.name, "CHANGE_PASSWORD", "Security", "Mengubah password akun");

    return NextResponse.json({ success: true, message: "Password berhasil diperbarui." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal mengubah password";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

