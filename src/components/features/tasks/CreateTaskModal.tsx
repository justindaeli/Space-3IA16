import { useEffect, useState, type FormEvent } from "react";
import { createTask } from "@/services/taskService";
import { inputClass, primaryButtonClass, secondaryButtonClass } from "@/lib/ui-classes";
import type { Task } from "@/types";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: (task: Task) => void;
}

interface TaskFormState {
  title: string;
  course: string;
  deadline: string;
  description: string;
}

const EMPTY_FORM: TaskFormState = { title: "", course: "", deadline: "", description: "" };

export function CreateTaskModal({ isOpen, onClose, onTaskCreated }: CreateTaskModalProps) {
  const [form, setForm] = useState<TaskFormState>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const updateField = (field: keyof TaskFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = form.title.trim();
    const course = form.course.trim();
    const deadline = new Date(form.deadline);

    if (!title || !course || Number.isNaN(deadline.getTime())) {
      setError("Judul, Mata Kuliah, dan Deadline wajib diisi.");
      return;
    }

    setError(null);
    setIsSaving(true);
    try {
      const created = await createTask({
        title,
        course,
        description: form.description.trim(),
        deadline: deadline.toISOString(),
      });
      onTaskCreated(created);
      setForm(EMPTY_FORM);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal menambahkan tugas.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-task-title"
        className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl"
      >
        <h2 id="create-task-title" className="text-lg font-semibold text-zinc-50">
          Tambah Tugas Baru
        </h2>
        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-red-900 bg-red-950/50 px-3 py-2 text-sm text-red-300"
          >
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-200">Judul Tugas</span>
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              className={inputClass}
              placeholder="Contoh: Lab Activity 3"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-200">Mata Kuliah</span>
            <input
              type="text"
              value={form.course}
              onChange={(e) => updateField("course", e.target.value)}
              className={inputClass}
              placeholder="Contoh: Infrastruktur Awan"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-200">Deadline</span>
            <input
              type="datetime-local"
              value={form.deadline}
              onChange={(e) => updateField("deadline", e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-200">Deskripsi (Opsional)</span>
            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className={inputClass}
              rows={3}
            />
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className={secondaryButtonClass}
            >
              Batal
            </button>
            <button type="submit" disabled={isSaving} className={primaryButtonClass}>
              {isSaving ? "Menyimpan..." : "Simpan Tugas"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
