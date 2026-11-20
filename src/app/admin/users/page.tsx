"use client";

import { useEffect, useState, useCallback } from "react";
import { UserModal } from "@/components/features/admin/UserModal";
import { UserTableRow } from "@/components/features/admin/UserTableRow";
import { primaryButtonClass } from "@/lib/ui-classes";
import type { AuthUser, CreateUserInput, UpdateUserInput } from "@/types";
import { Edit3, Search, Trash2, UserPlus } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AuthUser | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set("q", search);
      if (roleFilter !== "all") params.set("role", roleFilter);
      if (statusFilter !== "all") params.set("status", statusFilter);

      const res = await fetch(`/api/admin/users?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setUsers(json.users || []);
      }
    } finally {
      setLoading(false);
    }
  }, [search, roleFilter, statusFilter]);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  const handleSave = async (data: CreateUserInput | UpdateUserInput, isEdit: boolean) => {
    const url = isEdit && selectedUser ? `/api/admin/users/${selectedUser.id}` : "/api/admin/users";
    const method = isEdit ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    await fetchUsers();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus pengguna ${name}? Tindakan ini tidak dapat dibatalkan.`)) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    if (res.ok) await fetchUsers();
    else alert((await res.json()).error || "Gagal menghapus pengguna.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">Kelola Pengguna</h1>
          <p className="text-xs text-slate-600">Atur hak akses (RBAC), data mahasiswa, dan status akun.</p>
        </div>
        <button
          onClick={() => { setSelectedUser(null); setModalOpen(true); }}
          className={primaryButtonClass}
        >
          <UserPlus className="h-4 w-4" />
          <span>Tambah Pengguna</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, email, username..."
            className="w-full rounded-xl border border-slate-200 bg-white/80 pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-500 focus:outline-none focus:border-slate-400"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none"
        >
          <option value="all">Semua Role</option>
          <option value="admin">Administrator</option>
          <option value="user">Mahasiswa</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none"
        >
          <option value="all">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="inactive">Nonaktif</option>
        </select>
      </div>

      <div className="hidden overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm md:block">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="border-b border-slate-200 bg-white/90 text-slate-600">
            <tr>
              <th className="p-3.5">Pengguna</th>
              <th className="p-3.5">Username</th>
              <th className="p-3.5">Role</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60">
            {loading ? (
              <tr><td colSpan={5} className="p-6 text-center text-slate-500">Memuat pengguna...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={5} className="p-6 text-center text-slate-500">Tidak ada pengguna.</td></tr>
            ) : (
              users.map((u) => (
                <UserTableRow
                  key={u.id}
                  user={u}
                  onEdit={(user) => { setSelectedUser(user); setModalOpen(true); }}
                  onDelete={handleDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-3 md:hidden">
        {loading ? (
          <div className="rounded-lg border border-slate-200 bg-white p-5 text-center text-xs text-slate-500">
            Memuat pengguna...
          </div>
        ) : users.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-5 text-center text-xs text-slate-500">
            Tidak ada pengguna.
          </div>
        ) : (
          users.map((user) => (
            <article key={user.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-200 font-bold text-slate-800">
                    {user.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-900">{user.name}</p>
                    <p className="truncate text-[11px] text-slate-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <button
                    onClick={() => { setSelectedUser(user); setModalOpen(true); }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700"
                    aria-label={`Edit ${user.name}`}
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id, user.name)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-500"
                    aria-label={`Hapus ${user.name}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                <span className="rounded-full border border-sky-200 bg-sky-50 px-2 py-1 font-semibold uppercase text-sky-700">
                  {user.role}
                </span>
                <span className={`rounded-full border px-2 py-1 ${user.status === "active" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
                  {user.status === "active" ? "Aktif" : "Nonaktif"}
                </span>
                <span className="px-1 py-1 text-slate-500">@{user.username}</span>
              </div>
            </article>
          ))
        )}
      </div>

      <UserModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editUser={selectedUser}
      />
    </div>
  );
}
