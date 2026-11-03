import type { Task, TaskStatus } from "@/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { TaskCard } from "@/components/features/tasks/TaskCard";
import { CheckSquare } from "lucide-react";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  pendingTaskId: string | null;
  onMoveTask: (id: string, status: TaskStatus) => void;
}

export function TaskColumn({ title, tasks, pendingTaskId, onMoveTask }: TaskColumnProps) {
  return (
    <section className="flex min-h-64 flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 shadow-sm">
      <header className="mb-3.5 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold tracking-tight text-zinc-100">{title}</h3>
        </div>
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-800 px-1.5 text-[11px] font-semibold text-zinc-300">
          {tasks.length}
        </span>
      </header>

      {tasks.length === 0 ? (
        <EmptyState
          title="Tidak ada tugas"
          description={`Kolom ${title} saat ini kosong.`}
          icon={<CheckSquare className="h-5 w-5 text-zinc-500" />}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isPending={pendingTaskId === task.id}
              onStatusChange={(status) => onMoveTask(task.id, status)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
