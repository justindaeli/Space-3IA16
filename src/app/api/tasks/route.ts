import { NextResponse } from "next/server";
import { getAllTasks, createTask, logActivity } from "@/lib/server/db-supabase-content";
import { getSessionUser } from "@/lib/server/session";
import type { CreateTaskInput } from "@/types";

export async function GET() {
  const tasks = await getAllTasks();
  return NextResponse.json({ tasks });
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    const body = (await request.json()) as CreateTaskInput;

    if (!body.title || !body.course || !body.deadline) {
      return NextResponse.json(
        { error: "Judul, Mata Kuliah, dan Deadline wajib diisi." },
        { status: 400 }
      );
    }

    const created = await createTask({
      title: body.title,
      description: body.description || "",
      course: body.course,
      deadline: body.deadline,
      status: "todo",
    });

    if (!created) {
      return NextResponse.json(
        { error: "Gagal membuat tugas" },
        { status: 500 }
      );
    }

    if (user) {
      await logActivity(
        user.id,
        user.name,
        "TASK_CREATED",
        `Task: ${created.title}`,
        `Dibuat tugas baru untuk ${created.course}`
      );
    }

    return NextResponse.json({ success: true, task: created }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal membuat tugas";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
