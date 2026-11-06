"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, Shield, User as UserIcon, LogOut, LogIn } from "lucide-react";
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
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-zinc-100 transition-all duration-200 hover:-translate-y-px"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400 shadow-sm transition-transform duration-200 group-hover:scale-105">
              <Layers className="h-4 w-4" />
            </div>
            <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text font-bold text-transparent">
              Space 3IA16
            </span>
          </Link>

          {!isAdminSection && (
            <nav className="hidden items-center gap-1 text-xs md:flex sm:text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-1.5 font-medium text-zinc-400 transition-all duration-200 hover:-translate-y-px hover:bg-zinc-800/90 hover:text-zinc-100"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-2.5">
            {isLoading ? (
              <div className="h-7 w-20 animate-pulse rounded-lg bg-zinc-800/60" />
            ) : user ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-300 transition-all hover:bg-indigo-500/20"
                  >
                    <Shield className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Admin Hub</span>
                  </Link>
                )}

                <Link
                  href="/profile"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-xs font-medium text-zinc-200 transition-all hover:border-zinc-700 hover:bg-zinc-800"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-[10px] font-bold text-blue-400">
                    {user.initials}
                  </span>
                  <span className="max-w-[100px] truncate sm:max-w-[140px]">{user.name}</span>
                </Link>

                <button
                  type="button"
                  onClick={() => void logout()}
                  title="Keluar"
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-red-900/40 hover:bg-red-950/20 hover:text-red-300"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-blue-500/20 transition-all duration-200 hover:-translate-y-px hover:from-blue-500 hover:to-indigo-500"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Masuk</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </>
  );
}
