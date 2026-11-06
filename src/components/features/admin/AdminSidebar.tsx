"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  History,
  Settings,
  ArrowLeft,
  Shield,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Kelola Pengguna", icon: Users },
  { href: "/admin/content", label: "Kelola Konten", icon: FolderKanban },
  { href: "/admin/activities", label: "Log Aktivitas", icon: History },
  { href: "/admin/settings", label: "Pengaturan", icon: Settings },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-b border-zinc-800/80 bg-zinc-900/60 p-4 md:w-60 md:min-h-[calc(100vh-5rem)] md:border-r md:border-b-0 md:p-5">
      <div className="mb-6 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
          <Shield className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-zinc-100">Admin Console</h2>
          <p className="text-[10px] text-zinc-400">Space 3IA16 RBAC</p>
        </div>
      </div>

      <nav className="flex flex-row gap-1 overflow-x-auto pb-2 md:flex-col md:pb-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                isActive
                  ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm"
                  : "text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-200"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 border-t border-zinc-800/80 pt-4 px-2 hidden md:block">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-200"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Kelas</span>
        </Link>
      </div>
    </aside>
  );
}

