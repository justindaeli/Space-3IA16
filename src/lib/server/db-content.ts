import { getDatabase, saveDatabase } from "./db-store";
import type {
  ActivityLog,
  AdminStats,
  Announcement,
  CreateAnnouncementInput,
  CreateMaterialInput,
  CreateTaskInput,
  Material,
  Task,
  TaskStatus,
} from "@/types";

export function logActivity(
  userId: string,
  userName: string,
  action: string,
  target: string,
  details?: string
): ActivityLog {
  const db = getDatabase();
  const entry: ActivityLog = {
    id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    userId,
    userName,
    action,
    target,
    details,
    createdAt: new Date().toISOString(),
  };
  db.activities.unshift(entry);
  if (db.activities.length > 100) {
    db.activities = db.activities.slice(0, 100);
  }
  saveDatabase(db);
  return entry;
}

export function getActivities(limit = 20): ActivityLog[] {
  return getDatabase().activities.slice(0, limit);
}

export function getAllTasks(): Task[] {
  return getDatabase().tasks;
}

export function createDbTask(input: CreateTaskInput, assigneeName = "Anggota Kelas"): Task {
  const db = getDatabase();
  const initials = assigneeName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const newTask: Task = {
    id: `task-${Date.now()}`,
    title: input.title.trim(),
    course: input.course.trim(),
    deadline: input.deadline,
    description: input.description?.trim() ?? "",
    status: input.status ?? "todo",
    assignee: { id: "u-assigned", name: assigneeName, initials: initials || "AK" },
  };
  db.tasks.unshift(newTask);
  saveDatabase(db);
  return newTask;
}

export function updateDbTaskStatus(id: string, status: TaskStatus): Task {
  const db = getDatabase();
  const task = db.tasks.find((t) => t.id === id);
  if (!task) throw new Error("Tugas tidak ditemukan.");
  task.status = status;
  saveDatabase(db);
  return task;
}

export function getAllMaterials(): Material[] {
  return getDatabase().materials;
}

export function createDbMaterial(input: CreateMaterialInput): Material {
  const db = getDatabase();
  const newMaterial: Material = {
    id: `mat-${Date.now()}`,
    title: input.title.trim(),
    course: input.course.trim(),
    type: input.type,
    url: input.url?.trim() || null,
    uploadedAt: new Date().toISOString().split("T")[0],
  };
  db.materials.unshift(newMaterial);
  saveDatabase(db);
  return newMaterial;
}

export function deleteDbMaterial(id: string): boolean {
  const db = getDatabase();
  const initial = db.materials.length;
  db.materials = db.materials.filter((m) => m.id !== id);
  if (db.materials.length !== initial) {
    saveDatabase(db);
    return true;
  }
  return false;
}

export function getAllAnnouncements(): Announcement[] {
  return getDatabase().announcements;
}

export function createDbAnnouncement(input: CreateAnnouncementInput): Announcement {
  const db = getDatabase();
  const item: Announcement = {
    id: `ann-${Date.now()}`,
    title: input.title.trim(),
    createdAt: new Date().toISOString().split("T")[0],
  };
  db.announcements.unshift(item);
  saveDatabase(db);
  return item;
}

export function deleteDbAnnouncement(id: string): boolean {
  const db = getDatabase();
  const initial = db.announcements.length;
  db.announcements = db.announcements.filter((a) => a.id !== id);
  if (db.announcements.length !== initial) {
    saveDatabase(db);
    return true;
  }
  return false;
}

export function getAdminStats(): AdminStats {
  const db = getDatabase();
  const tasksByCourse: Record<string, number> = {};
  for (const t of db.tasks) {
    tasksByCourse[t.course] = (tasksByCourse[t.course] || 0) + 1;
  }

  return {
    totalUsers: db.users.length,
    activeUsers: db.users.filter((u) => u.status === "active").length,
    adminCount: db.users.filter((u) => u.role === "admin").length,
    totalTasks: db.tasks.length,
    completedTasks: db.tasks.filter((t) => t.status === "done").length,
    totalMaterials: db.materials.length,
    totalAnnouncements: db.announcements.length,
    tasksByCourse,
    recentActivities: db.activities.slice(0, 10),
  };
}

