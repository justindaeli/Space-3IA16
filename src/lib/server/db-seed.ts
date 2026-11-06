import { hashPassword } from "./crypto";
import { mockTasks, mockMaterials, mockAnnouncements } from "../mock-data";
import type { DbUser, ActivityLog, Task, Material, Announcement } from "@/types";

export interface DatabaseSchema {
  users: DbUser[];
  tasks: Task[];
  materials: Material[];
  announcements: Announcement[];
  activities: ActivityLog[];
}

export function generateSeedData(): DatabaseSchema {
  const adminPass = hashPassword("admin123");
  const userPass = hashPassword("user123");

  const users: DbUser[] = [
    {
      id: "u-admin",
      name: "Administrator 3IA16",
      email: "admin@space3ia16.id",
      username: "admin",
      role: "admin",
      status: "active",
      initials: "AD",
      passwordHash: adminPass.hash,
      passwordSalt: adminPass.salt,
      createdAt: "2026-11-01T00:00:00.000Z",
    },
    {
      id: "u1",
      name: "Justin Daeli",
      email: "user@space3ia16.id",
      username: "justindaeli",
      role: "user",
      status: "active",
      initials: "JD",
      passwordHash: userPass.hash,
      passwordSalt: userPass.salt,
      createdAt: "2026-11-02T00:00:00.000Z",
    },
    {
      id: "u2",
      name: "Alya Putri",
      email: "alya@space3ia16.id",
      username: "alyaputri",
      role: "user",
      status: "active",
      initials: "AP",
      passwordHash: userPass.hash,
      passwordSalt: userPass.salt,
      createdAt: "2026-11-02T00:00:00.000Z",
    },
    {
      id: "u3",
      name: "Rafi Athallah",
      email: "rafi@space3ia16.id",
      username: "rafiathallah",
      role: "user",
      status: "active",
      initials: "RA",
      passwordHash: userPass.hash,
      passwordSalt: userPass.salt,
      createdAt: "2026-11-03T00:00:00.000Z",
    },
  ];

  const activities: ActivityLog[] = [
    {
      id: "act-1",
      userId: "u-admin",
      userName: "Administrator 3IA16",
      action: "SYSTEM_INITIALIZED",
      target: "Space 3IA16 Platform",
      details: "Sistem kelas diinisialisasi dengan akun Admin & Mahasiswa.",
      createdAt: "2026-11-05T12:00:00.000Z",
    },
  ];

  return {
    users,
    tasks: mockTasks,
    materials: mockMaterials,
    announcements: mockAnnouncements,
    activities,
  };
}

