import { z } from "zod";

export const materialSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  course: z.string().min(1),
  fileUrl: z.string().min(1),
  category: z.enum(["modul", "slide", "catatan"]),
  createdAt: z.string().min(1),
});

export const materialsSchema = z.array(materialSchema);
