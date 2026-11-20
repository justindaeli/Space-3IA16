import type { Task, TaskStatus, CreateTaskInput } from "@/types";

export async function getTasks(): Promise<Task[]> {
  const res = await fetch("/api/tasks", { cache: "no-store" });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Gagal memuat tugas.");
  if (Array.isArray(json.tasks)) return json.tasks;
  throw new Error("Format data tugas tidak valid.");
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Gagal membuat tugas.");
  if (json.task) return json.task;
  throw new Error("Respons pembuatan tugas tidak valid.");
}

export async function updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  const res = await fetch(`/api/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Gagal memperbarui status tugas.");
  if (json.task) return json.task;
  throw new Error("Respons pembaruan tugas tidak valid.");
}
