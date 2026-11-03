import type { Task, TaskStatus } from "@/types";
import { TASK_STATUSES, TASK_STATUS_LABELS } from "@/lib/task-status";
import { primaryButtonClass } from "@/lib/ui-classes";
import { TaskColumn } from "@/components/features/tasks/TaskColumn";

interface TaskBoardProps {
  tasks: Task[];
  pendingTaskId: string | null;
  actionError: string | null;
  onAddTask: () => void;
  onMoveTask: (id: string, status: TaskStatus) => void;
}

export function TaskBoard({
  tasks,
  pendingTaskId,
  actionError,
  onAddTask,
  onMoveTask,
}: TaskBoardProps) {
  return (
    <section id="tugas" className="scroll-mt-24 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-zinc-50">Papan Tugas</h2>
        <button type="button" onClick={onAddTask} className={primaryButtonClass}>
          Tambah Tugas
        </button>
      </div>
      {actionError && (
        <p
          role="alert"
          className="rounded-lg border border-red-900 bg-red-950/50 px-4 py-2 text-sm text-red-300"
        >
          {actionError}
        </p>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {TASK_STATUSES.map((status) => (
          <TaskColumn
            key={status}
            title={TASK_STATUS_LABELS[status]}
            tasks={tasks.filter((task) => task.status === status)}
            pendingTaskId={pendingTaskId}
            onMoveTask={onMoveTask}
          />
        ))}
      </div>
    </section>
  );
}
