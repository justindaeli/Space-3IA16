import { mockTasks } from "@/lib/mock-data";
import type { Task, TaskStatus, CreateTaskInput } from "@/types";

export async function getTasks(): Promise<Task[]> {
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/tasks");
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.tasks)) return json.tasks;
      }
    } catch {
      // fallback
    }
  }
  return Promise.resolve(mockTasks);
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.task) return json.task;
      }
    } catch {
      // fallback
    }
  }

  const fallback: Task = {
    id: `task-${Date.now()}`,
    title: input.title,
    description: input.description ?? "",
    course: input.course,
    deadline: input.deadline,
    status: input.status ?? "todo",
    assignee: { id: "u1", name: "Justin Daeli", initials: "JD" },
  };
  return Promise.resolve(fallback);
}

export async function updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  if (typeof window !== "undefined") {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.task) return json.task;
      }
    } catch {
      // fallback
    }
  }

  const found = mockTasks.find((t) => t.id === id);
  if (found) {
    found.status = status;
    return Promise.resolve(found);
  }
  return Promise.resolve({
    id,
    title: "Tugas",
    description: "",
    course: "Umum",
    deadline: new Date().toISOString(),
    status,
    assignee: { id: "u1", name: "Justin Daeli", initials: "JD" },
  });
}
