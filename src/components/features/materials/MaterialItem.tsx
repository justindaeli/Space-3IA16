import type { Material, MaterialType } from "@/types";
import { formatDate } from "@/lib/format";
import { getCourseStyle } from "@/lib/course-badges";
import { FileText, Presentation, FileEdit, Eye, Download } from "lucide-react";
import type { ReactNode } from "react";

interface MaterialItemProps {
  material: Material;
}

const TYPE_CONFIG: Record<MaterialType, { label: string; icon: ReactNode; color: string }> = {
  modul: {
    label: "Modul",
    icon: <FileText className="h-4 w-4" />,
    color: "text-sky-700 bg-sky-600/10 border-sky-600/20",
  },
  slide: {
    label: "Slide",
    icon: <Presentation className="h-4 w-4" />,
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  catatan: {
    label: "Catatan",
    icon: <FileEdit className="h-4 w-4" />,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
};

export function MaterialItem({ material }: MaterialItemProps) {
  const typeConfig = TYPE_CONFIG[material.type];
  const courseStyle = getCourseStyle(material.course);
  const targetUrl = material.url ?? "#";

  return (
    <li className="group flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3 min-w-0">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${typeConfig.color} shadow-sm transition-transform duration-200 group-hover:scale-105`}
        >
          {typeConfig.icon}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-900 group-hover:text-sky-800">
            {material.title}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${courseStyle.badge}`}
            >
              <span className={`h-1 w-1 rounded-full ${courseStyle.dot}`} />
              {material.course}
            </span>
            <span className="text-[11px] text-slate-600">
              {typeConfig.label} · Diunggah {formatDate(material.uploadedAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-lg border border-slate-300/80 bg-slate-200/80 px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-300 hover:text-white"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>Lihat</span>
        </a>
        <a
          href={targetUrl}
          download
          className="inline-flex items-center gap-1 rounded-lg border border-slate-300/80 bg-slate-200/80 px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-300 hover:text-white"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Unduh</span>
        </a>
      </div>
    </li>
  );
}
