interface LoadingStateProps {
  label?: string;
}

export function LoadingState({ label = "Memuat..." }: LoadingStateProps) {
  return (
    <div
      className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-8 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-400"
      role="status"
    >
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-700 dark:border-zinc-600 dark:border-t-zinc-200" />
      {label}
    </div>
  );
}
