import { useState } from "react";
import type { Task, TaskStatus } from "@/types";
import { TASK_STATUSES, TASK_STATUS_LABELS } from "@/lib/task-status";
import { formatDeadline } from "@/lib/format";

interface TaskCardProps {
  task: Task;
  isPending: boolean;
  onStatusChange: (status: TaskStatus) => void;
}

export function TaskCard({ task, isPending, onStatusChange }: TaskCardProps) {
  const [renderedAt] = useState(() => Date.now());
  const isOverdue = task.status !== "done" && Date.parse(task.deadline) < renderedAt;

  const handleChange = (value: string) => {
    const next = TASK_STATUSES.find((status) => status === value);
    if (next) onStatusChange(next);
  };

  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-all duration-200 hover:border-zinc-700 hover:shadow-lg hover:shadow-black/30">
      <p className="text-xs font-medium text-blue-400">{task.course}</p>
      <h4 className="mt-1 text-sm font-medium leading-5 text-zinc-50">{task.title}</h4>
      {task.description && (
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-400">{task.description}</p>
      )}
      <div className="mt-4 flex items-center justify-between gap-2">
        <span
          className={`rounded-full px-2 py-1 text-[11px] font-medium ${
            isOverdue
              ? "bg-red-500/15 text-red-300"
              : "bg-amber-500/15 text-amber-300"
          }`}
        >
          {formatDeadline(task.deadline)}
        </span>
        <select
          aria-label={`Ubah status ${task.title}`}
          value={task.status}
          disabled={isPending}
          onChange={(event) => handleChange(event.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-zinc-100 transition-colors duration-200 hover:border-zinc-600 focus:border-blue-500 focus:outline-none disabled:cursor-wait disabled:opacity-60"
        >
          {TASK_STATUSES.map((status) => (
            <option key={status} value={status}>
              {TASK_STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </div>
    </article>
  );
}
