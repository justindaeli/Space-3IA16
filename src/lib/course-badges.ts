export interface CourseStyle {
  badge: string;
  dot: string;
}

const COURSE_STYLES: Record<string, CourseStyle> = {
  IMK: {
    badge: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    dot: "bg-blue-400",
  },
  "Jaringan Komputer": {
    badge: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
    dot: "bg-indigo-400",
  },
  "Grafika Komputer": {
    badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    dot: "bg-emerald-400",
  },
  "Sistem Operasi": {
    badge: "border-purple-500/30 bg-purple-500/10 text-purple-400",
    dot: "bg-purple-400",
  },
};

const DEFAULT_STYLE: CourseStyle = {
  badge: "border-zinc-700 bg-zinc-800/80 text-zinc-300",
  dot: "bg-zinc-400",
};

export function getCourseStyle(course: string): CourseStyle {
  return COURSE_STYLES[course] ?? DEFAULT_STYLE;
}

