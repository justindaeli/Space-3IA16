import type { Material, MaterialType } from "@/types";
import { formatDate } from "@/lib/format";
import { secondaryButtonClass } from "@/lib/ui-classes";

interface MaterialItemProps {
  material: Material;
}

const TYPE_LABELS: Record<MaterialType, string> = {
  modul: "Modul",
  slide: "Slide",
  catatan: "Catatan",
};

function toWebUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const { protocol } = new URL(value);
    return protocol === "https:" || protocol === "http:" ? value : null;
  } catch {
    return null;
  }
}

export function MaterialItem({ material }: MaterialItemProps) {
  const url = toWebUrl(material.url);

  return (
    <li className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="truncate text-sm text-zinc-100">{material.title}</p>
        <p className="mt-1 text-xs text-zinc-400">
          {TYPE_LABELS[material.type]} · {formatDate(material.uploadedAt)}
        </p>
      </div>
      {url ? (
        <div className="flex shrink-0 gap-2">
          <a href={url} target="_blank" rel="noopener noreferrer" className={secondaryButtonClass}>
            Lihat
          </a>
          <a href={url} download className={secondaryButtonClass}>
            Unduh
          </a>
        </div>
      ) : (
        <span className="shrink-0 text-xs text-zinc-500">Belum ada berkas</span>
      )}
    </li>
  );
}
