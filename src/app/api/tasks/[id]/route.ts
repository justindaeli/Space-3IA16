import { NextResponse } from "next/server";
import { updateTaskStatus } from "@/lib/server/db-supabase-content";
import { requireAdminUser } from "@/lib/server/session";
import type { TaskStatus } from "@/types";
import { TASK_STATUSES } from "@/lib/task-status";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminUser();
    const { id } = await params;
    const body = (await request.json()) as { status: TaskStatus };

    if (!TASK_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "Status tugas diperlukan." }, { status: 400 });
    }

    const task = await updateTaskStatus(id, body.status);
    if (!task) {
      return NextResponse.json({ error: "Tugas tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ success: true, task });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memperbarui status tugas";
    const status =
      message === "UNAUTHORIZED" ? 401 : message === "FORBIDDEN" ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

