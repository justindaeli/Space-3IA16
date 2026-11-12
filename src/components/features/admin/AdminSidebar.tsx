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
    <aside className="w-full shrink-0 border-b border-slate-200 bg-white p-4 md:w-60 md:min-h-[calc(100vh-5rem)] md:border-r md:border-b-0 md:p-5">
      <div className="mb-6 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-sky-700">
          <Shield className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900">Admin Console</h2>
          <p className="text-[10px] text-slate-600">Space 3IA16 RBAC</p>
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
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-sky-50 text-sky-800 border border-sky-200"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 border-t border-slate-200 pt-4 px-2 hidden md:block">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-medium text-slate-600 transition-colors hover:text-slate-800"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Kelas</span>
        </Link>
      </div>
    </aside>
  );
}

