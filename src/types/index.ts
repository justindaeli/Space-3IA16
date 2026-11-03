export type TaskStatus = "todo" | "in-progress" | "done";

export type MaterialType = "modul" | "slide" | "catatan";

export interface Task {
  id: string;
  title: string;
  description: string;
  course: string;
  deadline: string;
  status: TaskStatus;
}

export interface Material {
  id: string;
  title: string;
  course: string;
  type: MaterialType;
  url: string | null;
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
