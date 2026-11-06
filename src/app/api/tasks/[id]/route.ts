import { NextResponse } from "next/server";
import { updateDbTaskStatus } from "@/lib/server/db-content";
import type { TaskStatus } from "@/types";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as { status: TaskStatus };

    if (!body.status) {
      return NextResponse.json({ error: "Status tugas diperlukan." }, { status: 400 });
    }

    const updated = updateDbTaskStatus(id, body.status);
    return NextResponse.json({ success: true, task: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memperbarui status tugas";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

