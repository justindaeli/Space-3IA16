import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/server/session";
import { getActivities } from "@/lib/server/db-supabase-content";

export async function GET(request: Request) {
  try {
    await requireAdminUser();
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get("limit") || 50), 100);
    const activities = await getActivities(limit);
    return NextResponse.json({ activities });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Akses ditolak";
    const status = message === "UNAUTHORIZED" ? 401 : message === "FORBIDDEN" ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

