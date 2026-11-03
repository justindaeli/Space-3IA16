import type { Task } from "@/types";

interface TaskCardProps {
  task: Task;
}

function formatDeadline(value: string): string {
  return new Date(`${value}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-3 transition-all duration-200 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600">
      <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{task.title}</h3>
      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{task.course}</p>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
          {formatDeadline(task.deadline)}
        </span>
        <span
          title={task.assignee.name}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200"
        >
          {task.assignee.initials}
        </span>
      </div>
    </article>
  );
}
