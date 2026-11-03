import type { Task, TaskStatus } from "@/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { TaskCard } from "@/components/features/tasks/TaskCard";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  pendingTaskId: string | null;
  onMoveTask: (id: string, status: TaskStatus) => void;
}

export function TaskColumn({ title, tasks, pendingTaskId, onMoveTask }: TaskColumnProps) {
  return (
    <section className="flex min-h-56 flex-col rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
      <header className="mb-4 flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-zinc-100">{title}</h3>
        <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300">
          {tasks.length}
        </span>
      </header>
      {tasks.length === 0 ? (
        <EmptyState title="Kosong" description="Belum ada tugas di kolom ini." />
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
