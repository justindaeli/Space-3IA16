export type MaterialType = "modul" | "slide" | "catatan";

export interface Material {
  id: string;
  title: string;
  course: string;
  type: MaterialType;
  uploadedAt: string;
  url: string | null;
}

export interface CreateMaterialInput {
  title: string;
  course: string;
  type: MaterialType;
  url?: string;
}

