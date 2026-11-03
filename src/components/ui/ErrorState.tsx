import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Terjadi Kesalahan",
  message,
  description,
  onRetry,
}: ErrorStateProps) {
  const displayText = description ?? message ?? "Gagal memuat data. Silakan coba lagi.";

  return (
    <div
      role="alert"
      className="flex h-64 w-full flex-col items-center justify-center gap-4 rounded-2xl border border-red-900/40 bg-gradient-to-b from-red-950/20 to-zinc-950 px-6 text-center"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-800/40 bg-red-950/50 text-red-400 shadow-lg shadow-red-950/40">
        <AlertCircle className="h-6 w-6 stroke-[1.75]" />
      </div>
      <div>
        <p className="text-sm font-semibold text-zinc-100">{title}</p>
        <p className="mt-1 text-xs text-zinc-400">{displayText}</p>
      </div>
      {onRetry !== undefined && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/90 px-4 py-2 text-xs font-medium text-zinc-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-600 hover:bg-zinc-700 hover:text-white"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Coba Lagi
        </button>
      )}
    </div>
  );
}
