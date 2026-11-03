"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createTask } from "@/services/taskService";
import { inputClass, primaryButtonClass, secondaryButtonClass } from "@/lib/ui-classes";
import type { Task, CreateTaskInput } from "@/types";
import { X } from "lucide-react";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: (task: Task) => void;
}

const EMPTY_FORM: CreateTaskInput = {
  title: "",
  course: "",
  deadline: "",
  description: "",
  status: "todo",
};

export function CreateTaskModal({ isOpen, onClose, onTaskCreated }: CreateTaskModalProps) {
  const [form, setForm] = useState<CreateTaskInput>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = form.title.trim();
    const course = form.course.trim();
    const deadline = form.deadline.trim();

    if (!title || !course || !deadline) {
      setError("Judul, Mata Kuliah, dan Deadline wajib diisi.");
      return;
    }

    setError(null);
    setIsSaving(true);
    try {
      const created = await createTask({
        title,
        course,
        deadline,
        description: form.description?.trim(),
        status: "todo",
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
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-800/90 bg-zinc-900 p-6 shadow-2xl shadow-black/80">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-lg font-bold text-zinc-50">Tambah Tugas Baru</h2>
        <p className="mt-1 text-xs text-zinc-400">
          Masukkan rincian tugas kelompok Space 3IA16.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-4 rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-2 text-xs text-red-300"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-300">
              Judul Tugas <span className="text-blue-400">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
              placeholder="Contoh: Implementasi Grafika 3D"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-300">
              Mata Kuliah <span className="text-blue-400">*</span>
            </label>
            <input
              type="text"
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
              className={inputClass}
              placeholder="Contoh: Grafika Komputer / IMK / Jarkom"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-300">
              Deadline <span className="text-blue-400">*</span>
            </label>
            <input
              type="datetime-local"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-300">
              Deskripsi <span className="text-zinc-500">(Opsional)</span>
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={inputClass}
              placeholder="Catatan tambahan untuk tugas kelompok..."
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-2">
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
