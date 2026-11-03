import { MaterialRow } from "@/components/features/materials/MaterialRow";
import type { Material } from "@/types";

interface MaterialCourseGroupProps {
  course: string;
  materials: Material[];
}

export function MaterialCourseGroup({ course, materials }: MaterialCourseGroupProps) {
  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
      <h3 className="text-sm font-semibold tracking-tight text-blue-300">{course}</h3>
      <ul className="mt-1">
        {materials.map((material) => (
          <MaterialRow key={material.id} material={material} />
        ))}
      </ul>
    </article>
  );
}
