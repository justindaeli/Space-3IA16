import type { User } from "./auth";

export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  course: string;
  deadline: string;
  status: TaskStatus;
  assignee: User;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  course: string;
  deadline: string;
  status?: TaskStatus;
}

export interface SupabaseTaskRow {
  id: string;
  title: string;
  course: string;
  deadline: string;
  status: string;
  description?: string;
  created_at?: string;
}

