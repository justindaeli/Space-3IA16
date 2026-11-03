import type { Task, TaskStatus } from "@/types";
import { TASK_STATUSES, TASK_STATUS_LABELS } from "@/lib/task-status";
import { primaryButtonClass } from "@/lib/ui-classes";
import { TaskColumn } from "@/components/features/tasks/TaskColumn";
import { EmptyState } from "@/components/ui/EmptyState";
import { Plus, ListTodo, AlertTriangle } from "lucide-react";

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
        <div>
          <h2 className="text-lg font-bold tracking-tight text-zinc-100 sm:text-xl">
            Papan Tugas
          </h2>
          <p className="text-xs text-zinc-400">
            Pantau progres dan kelola pembagian tugas kelompok
          </p>
        </div>

        <button type="button" onClick={onAddTask} className={primaryButtonClass}>
          <Plus className="h-4 w-4" />
          <span>Tambah Tugas Utama</span>
        </button>
      </div>

      {actionError && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-red-900/60 bg-red-950/40 px-4 py-2.5 text-xs text-red-300 shadow-sm"
        >
          <AlertTriangle className="h-4 w-4 shrink-0 text-red-400" />
          <span>{actionError}</span>
        </div>
      )}

      {tasks.length === 0 ? (
        <EmptyState
          title="Papan Tugas Masih Kosong"
          description="Belum ada tugas kelompok yang dibuat. Mulai tambahkan tugas pertama untuk berkolaborasi dengan teman sekelas."
          icon={<ListTodo className="h-6 w-6 text-blue-400" />}
          action={
            <button type="button" onClick={onAddTask} className={primaryButtonClass}>
              <Plus className="h-4 w-4" />
              <span>+ Tambah Tugas Utama</span>
            </button>
          }
        />
      ) : (
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
      )}
    </section>
  );
}
