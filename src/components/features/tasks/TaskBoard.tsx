import type { Task } from "@/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";
import { TaskColumn } from "@/components/features/tasks/TaskColumn";

interface TaskBoardProps {
  tasks: Task[];
  isLoading?: boolean;
}

const columns = [
  { status: "todo", title: "To Do" },
  { status: "in-progress", title: "In Progress" },
  { status: "done", title: "Done" },
] as const;

export function TaskBoard({ tasks, isLoading = false }: TaskBoardProps) {
  if (isLoading) {
    return <LoadingState label="Memuat papan tugas..." />;
  }

  if (tasks.length === 0) {
    return (
      <section id="tugas">
        <h2 className="mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          Papan Tugas
        </h2>
        <EmptyState
          title="Belum ada tugas"
          description="Tambahkan tugas kelompok untuk mulai kolaborasi."
        />
      </section>
    );
  }

  return (
    <section id="tugas">
      <h2 className="mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-50">
        Papan Tugas
      </h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {columns.map((column) => (
          <TaskColumn
            key={column.status}
            title={column.title}
            tasks={tasks.filter((task) => task.status === column.status)}
          />
        ))}
      </div>
    </section>
  );
}
