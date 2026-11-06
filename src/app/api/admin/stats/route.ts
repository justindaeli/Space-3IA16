import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/server/session";
import { getAdminStats } from "@/lib/server/db-content";

export async function GET() {
  try {
    await requireAdminUser();
    const stats = getAdminStats();
    return NextResponse.json({ stats });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Akses ditolak";
    const status = message === "UNAUTHORIZED" ? 401 : message === "FORBIDDEN" ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

