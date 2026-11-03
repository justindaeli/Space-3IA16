export type TaskStatus = "todo" | "in-progress" | "done";

export interface User {
  id: string;
  name: string;
  initials: string;
}

export interface Task {
  id: string;
  title: string;
  course: string;
  deadline: string;
  status: TaskStatus;
  assignee: User;
}

export type MaterialCategory = "modul" | "slide" | "catatan";

export interface Material {
  id: string;
  title: string;
  course: string;
  fileUrl: string;
  category: MaterialCategory;
  createdAt: string;
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
