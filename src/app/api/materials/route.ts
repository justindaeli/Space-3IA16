import { NextResponse } from "next/server";
import { getAllMaterials } from "@/lib/server/db-content";

export async function GET() {
  const materials = getAllMaterials();
  return NextResponse.json({ materials });
}

