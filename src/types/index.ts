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

export interface Material {
  id: string;
  title: string;
  course: string;
  type: "modul" | "slide" | "catatan";
  uploadedAt: string;
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
