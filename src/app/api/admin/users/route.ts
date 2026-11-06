import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/server/session";
import { getAllUsers, createUser } from "@/lib/server/db-users";
import { logActivity } from "@/lib/server/db-content";
import type { CreateUserInput, UserRole, UserStatus } from "@/types";

export async function GET(request: Request) {
  try {
    await requireAdminUser();
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.toLowerCase() || "";
    const role = searchParams.get("role") as UserRole | null;
    const status = searchParams.get("status") as UserStatus | null;

    let users = getAllUsers();
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
    const body = (await request.json()) as CreateUserInput;

    if (!body.name || !body.email || !body.username || !body.password || !body.role) {
      return NextResponse.json({ error: "Semua data pengguna wajib diisi." }, { status: 400 });
    }

    const created = createUser(body);
    logActivity(
      admin.id,
      admin.name,
      "CREATE_USER",
      created.name,
      `Membuat pengguna baru (${created.role})`
    );

    return NextResponse.json({ success: true, user: created }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal membuat pengguna";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

