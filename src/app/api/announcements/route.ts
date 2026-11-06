import { NextResponse } from "next/server";
import { getAllAnnouncements } from "@/lib/server/db-content";

export async function GET() {
  const announcements = getAllAnnouncements();
  return NextResponse.json({ announcements });
}

