interface LoadingStateProps {
  message?: string;
  label?: string;
}

export function LoadingState({ message = 'Memuat...', label }: LoadingStateProps) {
  const displayText = label || message;
  return (
    <div className="flex h-64 w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-600 border-t-blue-500" />
        <p className="text-sm text-zinc-400">{displayText}</p>
      </div>
    </div>
  );
}