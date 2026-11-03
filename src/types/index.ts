export type TaskStatus = "todo" | "in-progress" | "done";

export type MaterialType = "modul" | "slide" | "catatan";

export interface User {
  id: string;
  name: string;
  initials: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  course: string;
  deadline: string;
  status: TaskStatus;
  assignee: User;
}

export interface Material {
  id: string;
  title: string;
  course: string;
  type: MaterialType;
  uploadedAt: string;
  url: string | null;
}

export interface Announcement {
  id: string;
  title: string;
  createdAt: string;
}

export interface QuickStats {
  activeTaskCount: number;
  nearestDeadline: string | null;
  latestAnnouncement: Announcement | null;
}

export interface StatCard {
  label: string;
  value: string;
  description?: string;
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
