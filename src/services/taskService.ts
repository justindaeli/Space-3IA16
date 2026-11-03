import { supabase } from "@/lib/supabase";
import type { Task, TaskStatus } from "@/types";

export interface CreateTaskInput {
  title: string;
  description: string;
  course: string;
  deadline: string;
}

const TASK_COLUMNS = "id, title, description, course, deadline, status";

export async function getTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select(TASK_COLUMNS)
    .order("deadline", { ascending: true });

  if (error || !Array.isArray(data)) {
    console.error("Error fetching tasks:", error?.message);
    throw new Error("Gagal mengambil data tugas.");
  }

  return data as Task[];
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title: input.title,
      description: input.description,
      course: input.course,
      deadline: input.deadline,
      status: "todo",
    })
    .select(TASK_COLUMNS)
    .single();

  if (error || !data) {
    console.error("Error creating task:", error?.message);
    throw new Error("Gagal membuat tugas baru.");
  }

  return data as Task;
}

export async function updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", id)
    .select(TASK_COLUMNS)
    .single();

  if (error || !data) {
    console.error("Error updating task status:", error?.message);
    throw new Error("Gagal memperbarui status tugas.");
  }

  return data as Task;
}
