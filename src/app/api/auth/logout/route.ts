import { NextResponse } from "next/server";
import { clearSessionCookie, getSessionUser } from "@/lib/server/session";
import { logActivity } from "@/lib/server/db-supabase-content";

export async function POST() {
  try {
    const user = await getSessionUser();
    if (user) {
      await logActivity(user.id, user.name, "USER_LOGOUT", "Authentication", "Keluar dari platform");
    }
    await clearSessionCookie();
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal logout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

