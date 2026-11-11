import { NextResponse } from "next/server";
import { findUserByIdentifier, toAuthUser } from "@/lib/server/db-supabase-users";
import { verifyPassword } from "@/lib/server/crypto";
import { createSessionToken, setSessionCookie } from "@/lib/server/session";
import { logActivity } from "@/lib/server/db-supabase-content";
import type { LoginCredentials } from "@/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<LoginCredentials>;
    const identifier = body.identifier?.trim();
    const password = body.password?.trim();
    const rememberMe = Boolean(body.rememberMe);

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Email/Username dan Password wajib diisi." },
        { status: 400 }
      );
    }

    const user = await findUserByIdentifier(identifier);
    if (!user) {
      return NextResponse.json(
        { error: "Akun tidak ditemukan. Periksa kembali email atau username." },
        { status: 401 }
      );
    }

    if (user.status !== "active") {
      return NextResponse.json(
        { error: "Akun Anda sedang dinonaktifkan oleh Administrator." },
        { status: 403 }
      );
    }

    const isValid = verifyPassword(password, user.passwordHash, user.passwordSalt);
    if (!isValid) {
      return NextResponse.json(
        { error: "Password yang Anda masukkan salah." },
        { status: 401 }
      );
    }

    const authUser = toAuthUser(user);
    const token = await createSessionToken(authUser, rememberMe);
    await setSessionCookie(token, rememberMe);

    await logActivity(user.id, user.name, "USER_LOGIN", "Authentication", "Berhasil masuk ke platform");

    return NextResponse.json({
      success: true,
      user: authUser,
      redirectTo: authUser.role === "admin" ? "/admin" : "/",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan internal.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

