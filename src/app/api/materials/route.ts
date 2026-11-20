import { NextResponse } from "next/server";
import { getAllMaterials } from "@/lib/server/db-supabase-content";

export const dynamic = "force-dynamic";

export async function GET() {
  const materials = await getAllMaterials();
  return NextResponse.json({ materials });
}

