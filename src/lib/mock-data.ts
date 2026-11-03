import type { Announcement, Material, QuickStats, Task, User } from "@/types";

export const classmates: User[] = [
  { id: "u1", name: "Justin Daeli", initials: "JD" },
  { id: "u2", name: "Alya Putri", initials: "AP" },
  { id: "u3", name: "Rafi Athallah", initials: "RA" },
  { id: "u4", name: "Dina Rahma", initials: "DR" },
];

export const mockTasks: Task[] = [
  {
    id: "t1",
    title: "Implementasi Algoritma Bresenham",
    description: "Buat algoritma garis dan lingkaran menggunakan OpenGL / WebGL.",
    course: "Grafika Komputer",
    deadline: "2026-11-12T23:59:00",
    status: "todo",
    assignee: classmates[0],
  },
  {
    id: "t2",
    title: "Proyek Routing & Subnetting Lab 4",
    description: "Konfigurasi topologi jaringan OSPF dan analisis packet loss di Cisco Packet Tracer.",
    course: "Jaringan Komputer",
    deadline: "2026-11-09T18:00:00",
    status: "in-progress",
    assignee: classmates[1],
  },
  {
    id: "t3",
    title: "Wireframe High-Fidelity Dashboard",
    description: "Selesaikan desain prototipe antarmuka sistem web dengan standar kegunaan Nielsen.",
    course: "IMK",
    deadline: "2026-11-15T20:00:00",
    status: "done",
    assignee: classmates[2],
  },
  {
    id: "t4",
    title: "Slide Presentasi Evaluasi Heuristik",
    description: "Persiapkan 10 slide evaluasi antarmuka untuk presentasi kelompok minggu depan.",
    course: "IMK",
    deadline: "2026-11-16T12:00:00",
    status: "todo",
    assignee: classmates[3],
  },
  {
    id: "t5",
    title: "Simulasi CPU Scheduling Multilevel Queue",
    description: "Buat laporan hasil analisis performa algoritma penjadwalan proses.",
    course: "Sistem Operasi",
    deadline: "2026-11-18T23:59:00",
    status: "in-progress",
    assignee: classmates[0],
  },
];

export const mockMaterials: Material[] = [
  {
    id: "m1",
    title: "Modul 3 — Heuristic Evaluation & Usability",
    course: "IMK",
    type: "modul",
    uploadedAt: "2026-10-28",
    url: "https://example.com/modul-imk-3.pdf",
  },
  {
    id: "m2",
    title: "Slide Kuliah: Arsitektur OSI Layer & TCP/IP",
    course: "Jaringan Komputer",
    type: "slide",
    uploadedAt: "2026-10-30",
    url: "https://example.com/slide-jarkom-osi.pdf",
  },
  {
    id: "m3",
    title: "Catatan Praktikum Routing Statis & OSPF",
    course: "Jaringan Komputer",
    type: "catatan",
    uploadedAt: "2026-11-01",
    url: "https://example.com/catatan-routing.pdf",
  },
  {
    id: "m4",
    title: "Slide Transformasi 2D & 3D Grafika",
    course: "Grafika Komputer",
    type: "slide",
    uploadedAt: "2026-11-03",
    url: "https://example.com/slide-grafkom.pdf",
  },
  {
    id: "m5",
    title: "Modul Praktikum Virtual Memory & Paging",
    course: "Sistem Operasi",
    type: "modul",
    uploadedAt: "2026-11-04",
    url: "https://example.com/modul-os-paging.pdf",
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: "a1",
    title: "Kumpulkan draft UI dan laporan lab sebelum Kamis 23:59 WIB",
    createdAt: "2026-11-05",
  },
];

export function getQuickStats(): QuickStats {
  const active = mockTasks.filter((task) => task.status !== "done");
  const nearest = active
    .map((task) => task.deadline)
    .sort()[0];

  return {
    activeTaskCount: active.length,
    nearestDeadline: nearest ?? null,
    latestAnnouncement: mockAnnouncements[0] ?? null,
  };
}
