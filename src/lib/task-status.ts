import type { TaskStatus } from "@/types";

export const TASK_STATUSES: readonly TaskStatus[] = ["todo", "in-progress", "done"];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};
