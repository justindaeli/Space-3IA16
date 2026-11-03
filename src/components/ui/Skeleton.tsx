interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`skeleton-pulse rounded-md bg-zinc-800/80 ${className}`} />;
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6">
        <Skeleton className="mb-3 h-3 w-32" />
        <Skeleton className="mb-3 h-7 w-72" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5">
            <Skeleton className="mb-4 h-3 w-24" />
            <Skeleton className="h-6 w-36" />
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-28" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="space-y-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4"
            >
              <Skeleton className="mb-2 h-4 w-24" />
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
