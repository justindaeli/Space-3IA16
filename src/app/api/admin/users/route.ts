import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/server/session";
import { getAllUsers } from "@/lib/server/db-supabase-users";
import { logActivity } from "@/lib/server/db-supabase-content";
import type { CreateUserInput, UserRole, UserStatus } from "@/types";

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

