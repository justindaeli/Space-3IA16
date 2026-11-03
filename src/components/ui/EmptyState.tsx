interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900/40 px-4 py-8 text-center">
      <p className="text-sm font-medium text-zinc-100">{title}</p>
      <p className="mt-1 text-sm text-zinc-400">{description}</p>
    </div>
  );
}
