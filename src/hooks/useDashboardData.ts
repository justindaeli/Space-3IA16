import { useCallback, useEffect, useState } from "react";
import { getAnnouncements } from "@/services/announcementService";
import { getMaterials } from "@/services/materialService";
import { getTasks, updateTaskStatus } from "@/services/taskService";
import type { Announcement, Material, Task, TaskStatus } from "@/types";

type LoadStatus = "loading" | "ready" | "error";

function sortByDeadline(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => Date.parse(a.deadline) - Date.parse(b.deadline));
}

export function useDashboardData() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>("loading");
  const [actionError, setActionError] = useState<string | null>(null);
  const [pendingTaskId, setPendingTaskId] = useState<string | null>(null);

  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getTasks(), getMaterials(), getAnnouncements()])
      .then(([nextTasks, nextMaterials, nextAnnouncements]) => {
        if (cancelled) return;
        setTasks(nextTasks);
        setMaterials(nextMaterials);
        setAnnouncements(nextAnnouncements);
        setLoadStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setLoadStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const reload = useCallback(() => {
    setLoadStatus("loading");
    setReloadToken((token) => token + 1);
  }, []);

  const addTask = useCallback((task: Task) => {
    setTasks((prev) => sortByDeadline([...prev, task]));
  }, []);

  const moveTask = useCallback(async (id: string, status: TaskStatus) => {
    setActionError(null);
    setPendingTaskId(id);
    try {
      const updated = await updateTaskStatus(id, status);
      setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : "Gagal memperbarui status tugas.");
    } finally {
      setPendingTaskId(null);
    }
  }, []);

  return {
    tasks,
    materials,
    announcements,
    loadStatus,
    actionError,
    pendingTaskId,
    reload,
    addTask,
    moveTask,
  };
}
