"use client";

import { useState, useMemo } from "react";
import type { Task, TaskStatus } from "@/types";
import { TASK_STATUSES, TASK_STATUS_LABELS } from "@/lib/task-status";
import { primaryButtonClass } from "@/lib/ui-classes";
import { TaskColumn } from "@/components/features/tasks/TaskColumn";
import { EmptyState } from "@/components/ui/EmptyState";
import { Plus, ListTodo, AlertTriangle, Search, Filter } from "lucide-react";

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
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");

  const courses = useMemo(() => {
    return Array.from(new Set(tasks.map((t) => t.course))).filter(Boolean);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase()) ||
        task.assignee.name.toLowerCase().includes(search.toLowerCase());
      const matchCourse = courseFilter === "all" || task.course === courseFilter;
      return matchSearch && matchCourse;
    });
  }, [tasks, search, courseFilter]);

  return (
    <section id="tugas" className="scroll-mt-24 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
            Papan Tugas
          </h2>
          <p className="text-xs text-slate-600">
            Pantau progres dan kelola pembagian tugas kelompok
          </p>
        </div>

        <button type="button" onClick={onAddTask} className={primaryButtonClass}>
          <Plus className="h-4 w-4" />
          <span>Tambah Tugas Utama</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari tugas, deskripsi, atau penanggung jawab..."
            className="w-full rounded-lg border border-slate-200 bg-white pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <Filter className="h-3.5 w-3.5 text-slate-500" />
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none"
          >
            <option value="all">Semua Mata Kuliah</option>
            {courses.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {actionError && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-xs text-red-700 shadow-sm"
        >
          <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
          <span>{actionError}</span>
        </div>
      )}

      {filteredTasks.length === 0 ? (
        <EmptyState
          title="Tidak Ada Tugas Ditemukan"
          description={
            tasks.length === 0
              ? "Belum ada tugas kelompok yang dibuat. Mulai tambahkan tugas pertama."
              : "Tidak ada tugas yang cocok dengan filter atau kata kunci pencarian Anda."
          }
          icon={<ListTodo className="h-6 w-6 text-sky-700" />}
          action={
            tasks.length === 0 ? (
              <button type="button" onClick={onAddTask} className={primaryButtonClass}>
                <Plus className="h-4 w-4" />
                <span>+ Tambah Tugas Utama</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => { setSearch(""); setCourseFilter("all"); }}
                className="text-xs text-sky-700 underline hover:text-sky-800"
              >
                Reset Filter
              </button>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {TASK_STATUSES.map((status) => (
            <TaskColumn
              key={status}
              title={TASK_STATUS_LABELS[status]}
              tasks={filteredTasks.filter((task) => task.status === status)}
              pendingTaskId={pendingTaskId}
              onMoveTask={onMoveTask}
            />
          ))}
        </div>
      )}
    </section>
  );
}
