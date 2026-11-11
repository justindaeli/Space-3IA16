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
      <header className="sticky top-0 z-40 border-b-2 border-slate-900 bg-white">
        <div className="flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-slate-900 transition-all duration-200 hover:-translate-y-px"
          >
            <div className="flex h-7 w-7 items-center justify-center border border-slate-900 bg-sky-50 text-sky-800">
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
                    className="inline-flex items-center gap-1.5 rounded-lg border border-navy-600/30 bg-navy-600/10 px-2.5 py-1 text-xs font-medium text-navy-800 transition-all hover:bg-navy-600/20"
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
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white/60 text-slate-600 transition-colors hover:border-red-900/40 hover:bg-red-950/20 hover:text-red-300"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 rounded-lg border border-sky-600/30 bg-gradient-to-r from-sky-700/90 to-navy-700/90 px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-sky-600/20 transition-all duration-200 hover:-translate-y-px hover:from-sky-600 hover:to-navy-600"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Masuk</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex w-full flex-1 flex-col gap-8 px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
        {children}
      </main>
    </>
  );
}
