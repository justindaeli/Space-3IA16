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
  return dateFormatter.format(new Date(value));
}

export function formatDeadline(value: string): string {
  return deadlineFormatter.format(new Date(value));
}
