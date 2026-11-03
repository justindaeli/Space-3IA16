interface LoadingStateProps {
  label?: string;
  message?: string;
}

export function LoadingState({ label, message }: LoadingStateProps) {
  const displayText = label ?? message ?? "Memuat Space 3IA16...";

  return (
    <div className="flex h-64 w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-transparent border-t-blue-500" />
        </div>
        <p className="text-xs font-medium text-zinc-400">{displayText}</p>
      </div>
    </div>
  );
}
