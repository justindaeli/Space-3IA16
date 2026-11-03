import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Space 3IA16 — Hub Kolaborasi Kelas",
  description:
    "Pusat kolaborasi kelas 3IA16: tugas kelompok, materi kuliah, dan pengumuman dalam satu tempat.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-950 text-zinc-100 selection:bg-blue-500/30 selection:text-blue-200">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
