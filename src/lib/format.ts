const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const deadlineFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(value: string): string {
  try {
    return dateFormatter.format(new Date(value));
  } catch {
    return value;
  }
}

export function formatDeadline(value: string): string {
  try {
    return deadlineFormatter.format(new Date(value));
  } catch {
    return value;
  }
}

export function isDeadlineOverdue(deadline: string): boolean {
  try {
    return Date.parse(deadline) < Date.now();
  } catch {
    return false;
  }
}
