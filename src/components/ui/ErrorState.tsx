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
      className="flex h-64 w-full flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50/50 px-6 text-center"
    >
      <div      className="flex h-12 w-12 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-500">
        <AlertCircle className="h-6 w-6 stroke-[1.75]" />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-xs text-slate-600">{displayText}</p>
      </div>
      {onRetry !== undefined && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Coba Lagi
        </button>
      )}
    </div>
  );
}
