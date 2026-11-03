import type { ReactNode } from "react";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800/90 bg-zinc-900/30 px-6 py-10 text-center backdrop-blur-sm">
      <div className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 shadow-inner">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 blur-sm" />
        <span className="relative text-zinc-400">
          {icon ?? <FolderOpen className="h-6 w-6 stroke-[1.5]" />}
        </span>
      </div>
      <p className="text-sm font-medium text-zinc-200">{title}</p>
      <p className="mt-1 max-w-sm text-xs leading-relaxed text-zinc-500">{description}</p>
      {action !== undefined && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}
