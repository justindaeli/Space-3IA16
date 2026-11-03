import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { mockTasks, classmates } from "@/lib/mock-data";
import type { Task, TaskStatus, CreateTaskInput, SupabaseTaskRow } from "@/types";

let localTasks: Task[] = [...mockTasks];

function rowToTask(row: SupabaseTaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    course: row.course,
    deadline: row.deadline,
    status: (row.status as TaskStatus) ?? "todo",
    assignee: classmates[0],
  };
}

export async function getTasks(): Promise<Task[]> {
  if (!isSupabaseConfigured || supabase === null) {
    return Promise.resolve(localTasks);
  }

  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("id, title, description, course, deadline, status, created_at")
      .order("deadline", { ascending: true });

    if (error || !Array.isArray(data) || data.length === 0) {
      return localTasks;
    }

    return (data as SupabaseTaskRow[]).map(rowToTask);
  } catch {
    return localTasks;
  }
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const newTask: Task = {
    id: `task-${Date.now()}`,
    title: input.title,
    description: input.description ?? "",
    course: input.course,
    deadline: input.deadline,
    status: input.status ?? "todo",
    assignee: classmates[Math.floor(Math.random() * classmates.length)],
  };

  if (!isSupabaseConfigured || supabase === null) {
    localTasks = [newTask, ...localTasks];
    return Promise.resolve(newTask);
  }

  try {
    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          title: input.title,
          description: input.description ?? "",
          course: input.course,
          deadline: input.deadline,
          status: input.status ?? "todo",
        },
      ])
      .select()
      .single();

    if (error || !data) {
      localTasks = [newTask, ...localTasks];
      return newTask;
    }

    const created = rowToTask(data as SupabaseTaskRow);
    localTasks = [created, ...localTasks];
    return created;
  } catch {
    localTasks = [newTask, ...localTasks];
    return newTask;
  }
}

export async function updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  const target = localTasks.find((t) => t.id === id);
  if (target) {
    target.status = status;
  }

  if (!isSupabaseConfigured || supabase === null) {
    if (!target) throw new Error("Tugas tidak ditemukan.");
    return Promise.resolve({ ...target, status });
  }

  try {
    const { data, error } = await supabase
      .from("tasks")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      if (target) return target;
      throw new Error("Gagal memperbarui status tugas.");
    }

    return rowToTask(data as SupabaseTaskRow);
  } catch {
    if (target) return target;
    throw new Error("Gagal memperbarui status tugas.");
  }
}
