import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/server/session";
import { createUser, getAllUsers } from "@/lib/server/db-supabase-users";
import { logActivity } from "@/lib/server/db-supabase-content";
import type { CreateUserInput, UserRole, UserStatus } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await requireAdminUser();
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.toLowerCase() || "";
    const role = searchParams.get("role") as UserRole | null;
    const status = searchParams.get("status") as UserStatus | null;

    let users = await getAllUsers();
    if (q) {
      users = users.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.username.toLowerCase().includes(q)
      );
    }

    if (role && (role === "admin" || role === "user")) {
      users = users.filter((u) => u.role === role);
    }
    if (status && (status === "active" || status === "inactive")) {
      users = users.filter((u) => u.status === status);
    }

    return NextResponse.json({ users });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Akses ditolak";
    const status = message === "UNAUTHORIZED" ? 401 : message === "FORBIDDEN" ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireAdminUser();
    const body = (await request.json()) as Partial<CreateUserInput>;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const username = body.username?.trim();
    const password = body.password;
    const role = body.role;

    if (!name || !email || !username || !password || (role !== "admin" && role !== "user")) {
      return NextResponse.json({ error: "Data pengguna belum lengkap atau tidak valid." }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password minimal harus 6 karakter." }, { status: 400 });
    }

    const created = await createUser({ name, email, username, password, role });
    if (!created) {
      return NextResponse.json({ error: "Email atau username sudah digunakan." }, { status: 409 });
    }
    await logActivity(admin.id, admin.name, "CREATE_USER", created.name, `Membuat pengguna ${created.email}`);
    return NextResponse.json({ success: true, user: created }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal membuat pengguna";
    const status = message === "UNAUTHORIZED" ? 401 : message === "FORBIDDEN" ? 403 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

