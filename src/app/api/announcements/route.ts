import { NextResponse } from "next/server";
import { getAllAnnouncements } from "@/lib/server/db-supabase-content";

export async function GET() {
  const announcements = await getAllAnnouncements();
  return NextResponse.json({ announcements });
}

