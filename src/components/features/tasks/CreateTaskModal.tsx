'use client';

import { useState } from 'react';
import { createTask, CreateTaskInput } from '@/services/taskService';
import { Task } from '@/types';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: (newTask: Task) => void;
}

export default function CreateTaskModal({ isOpen, onClose, onTaskCreated }: CreateTaskModalProps) {
  const [formData, setFormData] = useState<CreateTaskInput>({
    title: '',
    description: '',
    course: '',
    deadline: '',
    status: 'todo',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.course || !formData.deadline) {
      setError('Judul, Mata Kuliah, dan Deadline wajib diisi.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const created = await createTask(formData);
      onTaskCreated(created);
      onClose();
      setFormData({ title: '', description: '', course: '', deadline: '', status: 'todo' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Gagal menambahkan tugas.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-zinc-900 border border-zinc-800 p-6 text-zinc-100 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Tambah Tugas Baru</h2>
        {error && <p className="mb-4 text-sm text-red-400 bg-red-950/50 p-2 rounded border border-red-800">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Judul Tugas</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded bg-zinc-800 border border-zinc-700 p-2 text-sm text-white focus:outline-none focus:border-zinc-500"
              placeholder="Contoh: Lab Activity 3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mata Kuliah</label>
            <input
              type="text"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className="w-full rounded bg-zinc-800 border border-zinc-700 p-2 text-sm text-white focus:outline-none focus:border-zinc-500"
              placeholder="Contoh: Infrastruktur Awan"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Deadline</label>
            <input
              type="datetime-local"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full rounded bg-zinc-800 border border-zinc-700 p-2 text-sm text-white focus:outline-none focus:border-zinc-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Deskripsi (Opsional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded bg-zinc-800 border border-zinc-700 p-2 text-sm text-white focus:outline-none focus:border-zinc-500"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
            onClick={onClose}
              className="px-4 py-2 text-sm rounded bg-zinc-800 hover:bg-zinc-700 transition"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded bg-blue-600 hover:bg-blue-500 text-white font-medium transition"
              disabled={loading}
            >
              {loading ? 'Simpan...' : 'Simpan Tugas'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}