import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Space 3IA16 — Hub Kolaborasi Kelas",
  description:
    "Pusat kolaborasi kelas 3IA16: tugas kelompok, materi kuliah, dan pengumuman dalam satu tempat.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900 selection:bg-sky-600/30 selection:text-sky-900">
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
