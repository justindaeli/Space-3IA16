"use client";

import { useState, useEffect, type FormEvent } from "react";
import { inputClass, primaryButtonClass, secondaryButtonClass } from "@/lib/ui-classes";
import type { AuthUser, CreateUserInput, UpdateUserInput, UserRole, UserStatus } from "@/types";
import { X } from "lucide-react";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateUserInput | UpdateUserInput, isEdit: boolean) => Promise<void>;
  editUser?: AuthUser | null;
}

export function UserModal({ isOpen, onClose, onSave, editUser }: UserModalProps) {
  const isEdit = Boolean(editUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("user");
  const [status, setStatus] = useState<UserStatus>("active");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset form fields when modal target changes.
  useEffect(() => {
    if (editUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(editUser.name);
      setEmail(editUser.email);
      setUsername(editUser.username);
      setRole(editUser.role);
      setStatus(editUser.status);
      setPassword("");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName("");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmail("");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUsername("");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPassword("");
      setRole("user");
      setStatus("active");
    }
    setError(null);
  }, [editUser, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Nama dan Email wajib diisi.");
      return;
    }
    if (!isEdit && (!username.trim() || !password.trim())) {
      setError("Username dan Password wajib untuk pengguna baru.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      if (isEdit) {
        await onSave({ name, email, role, status, newPassword: password || undefined }, true);
      } else {
        await onSave({ name, email, username, password, role }, false);
      }
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan pengguna.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-600 hover:text-white">
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-bold text-slate-900">
          {isEdit ? "Edit Pengguna" : "Tambah Pengguna Baru"}
        </h2>
        {error && <p className="mt-3 text-xs text-red-400 bg-red-950/40 p-2.5 rounded-lg border border-red-900/60">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Nama Lengkap</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Contoh: Budi Santoso" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="nama@space3ia16.id" />
          </div>
          {!isEdit && (
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={inputClass} placeholder="budisantoso" />
            </div>
          )}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              {isEdit ? "Password Baru (Kosongkan jika tidak diubah)" : "Password"}
            </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Hak Akses (Role)</label>
              <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} className={inputClass}>
                <option value="user">Mahasiswa (User)</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            {isEdit && (
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">Status Akun</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as UserStatus)} className={inputClass}>
                  <option value="active">Aktif</option>
                  <option value="inactive">Nonaktif</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button type="button" onClick={onClose} disabled={loading} className={secondaryButtonClass}>Batal</button>
            <button type="submit" disabled={loading} className={primaryButtonClass}>{loading ? "Menyimpan..." : "Simpan"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

