import { NextResponse } from "next/server";
import { getAllTasks, createDbTask } from "@/lib/server/db-content";
import { getSessionUser } from "@/lib/server/session";
import type { CreateTaskInput } from "@/types";

export async function GET() {
  const tasks = getAllTasks();
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

    const created = createDbTask(body, user?.name ?? "Anggota Kelas");
    return NextResponse.json({ success: true, task: created }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal membuat tugas";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

