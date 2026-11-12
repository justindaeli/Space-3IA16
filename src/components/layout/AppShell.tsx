"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, Shield, LogOut, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { href: "/#stats", label: "Ringkasan" },
  { href: "/#tugas", label: "Papan Tugas" },
  { href: "/#materi", label: "Materi" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, isAdmin, isLoading, logout } = useAuth();
  const isAdminSection = pathname.startsWith("/admin");

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:px-10">
          <Link
            href="/"
            aria-label="Space 3IA16 beranda"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-slate-900 transition-colors duration-200 hover:text-sky-700"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-sky-800">
              <Layers className="h-4 w-4" />
            </div>
            <span className="font-bold text-slate-950">Space 3IA16</span>
          </Link>

          {!isAdminSection && (
            <nav className="hidden items-center gap-1 text-xs md:flex sm:text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-1.5 font-medium text-slate-600 transition-all duration-200 hover:-translate-y-px hover:bg-slate-200/90 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-2.5">
            {isLoading ? (
              <div className="h-7 w-20 animate-pulse rounded-lg bg-slate-200/60" />
            ) : user ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-800 transition-colors hover:bg-sky-100"
                  >
                    <Shield className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Admin Hub</span>
                  </Link>
                )}

                <Link
                  href="/profile"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-800 transition-all hover:border-slate-300 hover:bg-slate-200"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-600/20 text-[10px] font-bold text-sky-700">
                    {user.initials}
                  </span>
                  <span className="max-w-[100px] truncate sm:max-w-[140px]">{user.name}</span>
                </Link>

                <button
                  type="button"
                  onClick={() => void logout()}
                  title="Keluar"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 rounded-lg border border-sky-300 bg-sky-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-sky-600"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Masuk</span>
              </Link>
            )}
          </div>
        </div>
        {!isAdminSection && (
          <nav aria-label="Navigasi mobile" className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 md:hidden">
            {navItems.map((item) => (
              <Link
                key={`mobile-${item.href}`}
                href={item.href}
                className="shrink-0 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex w-full flex-1 flex-col gap-8 px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
        {children}
      </main>
    </>
  );
}
