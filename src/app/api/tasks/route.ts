import { NextResponse } from "next/server";
import { getAllTasks, createTask, logActivity } from "@/lib/server/db-supabase-content";
import { requireAdminUser } from "@/lib/server/session";
import type { CreateTaskInput } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const tasks = await getAllTasks();
  return NextResponse.json({ tasks });
}

export async function POST(request: Request) {
  try {
    const user = await requireAdminUser();
    const body = (await request.json()) as CreateTaskInput;

    if (!body.title?.trim() || !body.course?.trim() || !body.deadline) {
      return NextResponse.json(
        { error: "Judul, Mata Kuliah, dan Deadline wajib diisi." },
        { status: 400 }
      );
    }
    if (Number.isNaN(Date.parse(body.deadline))) {
      return NextResponse.json({ error: "Format deadline tidak valid." }, { status: 400 });
    }

    const created = await createTask({
      title: body.title.trim(),
      description: body.description || "",
      course: body.course.trim(),
      deadline: body.deadline,
      status: "todo",
    });

    if (!created) {
      return NextResponse.json(
        { error: "Gagal membuat tugas" },
        { status: 500 }
      );
    }

    await logActivity(
      user.id,
      user.name,
      "TASK_CREATED",
      `Task: ${created.title}`,
      `Dibuat tugas baru untuk ${created.course}`
    );

    return NextResponse.json({ success: true, task: created }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal membuat tugas";
    const status =
      message === "UNAUTHORIZED" ? 401 : message === "FORBIDDEN" ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
