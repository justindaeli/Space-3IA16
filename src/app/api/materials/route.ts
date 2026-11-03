import { NextResponse } from "next/server";
import { materials } from "@/lib/mock-data";
import { materialsSchema } from "@/lib/material-schema";

export async function GET() {
  try {
    const payload = materialsSchema.parse(materials);
    return NextResponse.json(payload);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Gagal memuat materi.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
