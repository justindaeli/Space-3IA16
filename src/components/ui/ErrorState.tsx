import { primaryButtonClass } from "@/lib/ui-classes";

interface ErrorStateProps {
  title: string;
  description: string;
  onRetry: () => void;
}

export function ErrorState({ title, description, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex h-64 w-full flex-col items-center justify-center gap-4 text-center"
    >
      <div className="space-y-1">
        <p className="text-sm font-medium text-zinc-100">{title}</p>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>
      <button type="button" onClick={onRetry} className={primaryButtonClass}>
        Coba lagi
      </button>
    </div>
  );
}
