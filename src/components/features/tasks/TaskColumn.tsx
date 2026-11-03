import type { Task } from "@/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { TaskCard } from "@/components/features/tasks/TaskCard";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
}

export function TaskColumn({ title, tasks }: TaskColumnProps) {
  return (
    <section className="flex min-h-56 flex-col rounded-xl border border-zinc-200 bg-zinc-50/80 p-3 dark:border-zinc-800 dark:bg-zinc-800/40">
      <header className="mb-3 flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{title}</h3>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{tasks.length}</span>
      </header>
      {tasks.length === 0 ? (
        <EmptyState title="Kosong" description="Belum ada tugas di kolom ini." />
      ) : (
        <div className="flex flex-col gap-2">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  );
}
