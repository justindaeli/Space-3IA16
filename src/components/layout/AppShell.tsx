import type { ReactNode } from "react";
import Link from "next/link";

const navItems = [
  { href: "#stats", label: "Ringkasan" },
  { href: "#tugas", label: "Papan Tugas" },
  { href: "#materi", label: "Materi" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-zinc-50 transition-opacity duration-200 hover:opacity-80"
          >
            Space 3IA16
          </Link>
          <nav className="flex gap-1 text-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-zinc-400 transition-colors duration-200 hover:bg-zinc-800 hover:text-zinc-50"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-6 sm:py-8">
        {children}
      </main>
    </>
  );
}
