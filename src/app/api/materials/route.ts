import { NextResponse } from "next/server";
import { getAllMaterials } from "@/lib/server/db-supabase-content";

export async function GET() {
  const materials = await getAllMaterials();
  return NextResponse.json({ materials });
}

