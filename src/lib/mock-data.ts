import type { Announcement, Material, QuickStats, Task, User } from "@/types";

export const classmates: User[] = [
  { id: "u1", name: "Justin", initials: "JU" },
  { id: "u2", name: "Alya", initials: "AL" },
  { id: "u3", name: "Rafi", initials: "RF" },
];

export const tasks: Task[] = [
  {
    id: "t1",
    title: "Wireframe high-fidelity dashboard",
    course: "IMK",
    deadline: "2026-11-06",
    status: "todo",
    assignee: classmates[0],
  },
  {
    id: "t2",
    title: "Laporan subnetting lab 4",
    course: "Jaringan Komputer",
    deadline: "2026-11-05",
    status: "in-progress",
    assignee: classmates[1],
  },
  {
    id: "t3",
    title: "Slide presentasi prototipe",
    course: "IMK",
    deadline: "2026-11-10",
    status: "done",
    assignee: classmates[2],
  },
];

export const materials: Material[] = [
  {
    id: "m1",
    title: "Modul 3 — Heuristic Evaluation",
    course: "IMK",
    fileUrl: "/materials/imk-heuristic-evaluation.html",
    category: "modul",
    createdAt: "2026-10-28",
  },
  {
    id: "m2",
    title: "Slide OSI Layer",
    course: "Jaringan Komputer",
    fileUrl: "/materials/jarkom-osi-layer.html",
    category: "slide",
    createdAt: "2026-10-30",
  },
  {
    id: "m3",
    title: "Catatan routing statis",
    course: "Jaringan Komputer",
    fileUrl: "/materials/jarkom-routing-statis.html",
    category: "catatan",
    createdAt: "2026-11-01",
  },
  {
    id: "m4",
    title: "Checklist usability testing",
    course: "IMK",
    fileUrl: "/materials/imk-usability-testing.html",
    category: "catatan",
    createdAt: "2026-11-02",
  },
];

export const announcements: Announcement[] = [
  {
    id: "a1",
    title: "Kumpulkan draft UI paling lambat Kamis",
    createdAt: "2026-11-03",
  },
];

export function getQuickStats(): QuickStats {
  const active = tasks.filter((task) => task.status !== "done");
  const nearest = active
    .map((task) => task.deadline)
    .sort()[0];

  return {
    activeTaskCount: active.length,
    nearestDeadline: nearest ?? null,
    latestAnnouncement: announcements[0] ?? null,
  };
}
