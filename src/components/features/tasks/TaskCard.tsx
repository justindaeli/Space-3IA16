import type { Task, TaskStatus } from "@/types";
import { TASK_STATUSES, TASK_STATUS_LABELS } from "@/lib/task-status";
import { formatDeadline, isDeadlineOverdue } from "@/lib/format";
import { getCourseStyle } from "@/lib/course-badges";
import { Clock, CheckCircle } from "lucide-react";

interface TaskCardProps {
  task: Task;
  isPending: boolean;
  onStatusChange: (status: TaskStatus) => void;
}

export function TaskCard({ task, isPending, onStatusChange }: TaskCardProps) {
  const isOverdue = task.status !== "done" && isDeadlineOverdue(task.deadline);
  const courseStyle = getCourseStyle(task.course);

  const handleSelectStatus = (value: string) => {
    const next = TASK_STATUSES.find((s) => s === value);
    if (next) onStatusChange(next);
  };

  return (
    <article className="group relative rounded-xl border border-zinc-800/80 bg-zinc-900/90 p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-lg hover:shadow-blue-500/5">
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${courseStyle.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${courseStyle.dot}`} />
          {task.course}
        </span>

        <span
          title={task.assignee.name}
          className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-[10px] font-semibold text-zinc-300 shadow-sm"
        >
          {task.assignee.initials}
        </span>
      </div>

      <h4 className="mt-2.5 text-sm font-semibold text-zinc-100 transition-colors group-hover:text-white">
        {task.title}
      </h4>

      {task.description && (
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-400">
          {task.description}
        </p>
      )}

      <div className="mt-3.5 flex items-center justify-between gap-2 pt-2 border-t border-zinc-800/60">
        <span
          className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${
            task.status === "done"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : isOverdue
              ? "bg-red-500/10 text-red-400 border border-red-500/20"
              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
          }`}
        >
          {task.status === "done" ? (
            <CheckCircle className="h-3 w-3" />
          ) : (
            <Clock className="h-3 w-3" />
          )}
          {formatDeadline(task.deadline)}
        </span>

        <select
          aria-label={`Ubah status ${task.title}`}
          value={task.status}
          disabled={isPending}
          onChange={(e) => handleSelectStatus(e.target.value)}
          className="cursor-pointer rounded-lg border border-zinc-700/80 bg-zinc-800/90 px-2 py-1 text-[11px] font-medium text-zinc-200 transition-colors hover:border-zinc-600 focus:border-blue-500 focus:outline-none disabled:cursor-wait disabled:opacity-50"
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
