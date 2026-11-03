import type { ReactNode } from "react";
import Link from "next/link";
import { Layers } from "lucide-react";

const navItems = [
  { href: "#stats", label: "Ringkasan" },
  { href: "#tugas", label: "Papan Tugas" },
  { href: "#materi", label: "Materi" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
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

          <nav className="flex items-center gap-1 text-xs sm:text-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-1.5 font-medium text-zinc-400 transition-all duration-200 hover:-translate-y-px hover:bg-zinc-800/90 hover:text-zinc-100"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </>
  );
}
