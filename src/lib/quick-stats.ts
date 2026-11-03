import type { Announcement, QuickStats, Task } from "@/types";

export function computeQuickStats(tasks: Task[], announcements: Announcement[]): QuickStats {
  const active = tasks.filter((task) => task.status !== "done");
  const nearestDeadline = active.reduce<string | null>((earliest, task) => {
    if (earliest === null || Date.parse(task.deadline) < Date.parse(earliest)) {
      return task.deadline;
    }
    return earliest;
  }, null);

  return {
    activeTaskCount: active.length,
    nearestDeadline,
    latestAnnouncement: announcements[0] ?? null,
  };
}
