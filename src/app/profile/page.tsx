"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { ChangePasswordCard } from "@/components/features/profile/ChangePasswordCard";
import { inputClass, primaryButtonClass } from "@/lib/ui-classes";
import { User, Shield, CheckCircle2, AlertCircle } from "lucide-react";

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  if (!user) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-zinc-500">
        Memuat data akun...
      </div>
    );
  }

  const handleUpdateName = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsUpdating(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMsg({ type: "error", text: data.error || "Gagal memperbarui profil" });
      } else {
        setStatusMsg({ type: "success", text: "Nama profil berhasil disimpan." });
        await refreshUser();
      }
    } catch {
      setStatusMsg({ type: "error", text: "Terjadi kesalahan jaringan." });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-50">Pengaturan Akun</h1>
        <p className="text-xs text-zinc-400">Kelola identitas profil dan keamanan akun Space 3IA16.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Info Card */}
        <article className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 shadow-lg shadow-black/20">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-lg font-bold text-blue-400">
              {user.initials}
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-100">{user.name}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${
                    user.role === "admin"
                      ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-400"
                      : "border-blue-500/30 bg-blue-500/10 text-blue-400"
                  }`}
                >
                  <Shield className="h-3 w-3" />
                  {user.role}
                </span>
                <span className="text-xs text-zinc-400">@{user.username}</span>
              </div>
            </div>
          </div>

          {statusMsg && (
            <div
              className={`mt-4 flex items-center gap-2 rounded-xl border p-3 text-xs ${
                statusMsg.type === "success"
                  ? "border-emerald-900/60 bg-emerald-950/40 text-emerald-300"
                  : "border-red-900/60 bg-red-950/40 text-red-300"
              }`}
            >
              {statusMsg.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              )}
              <span>{statusMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleUpdateName} className="mt-5 space-y-3.5">
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-300">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-300">Email Kampus</label>
              <input
                type="email"
                disabled
                value={user.email}
                className={`${inputClass} cursor-not-allowed opacity-60`}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-300">Username</label>
              <input
                type="text"
                disabled
                value={user.username}
                className={`${inputClass} cursor-not-allowed opacity-60`}
              />
            </div>

            <button type="submit" disabled={isUpdating} className={`${primaryButtonClass} mt-2`}>
              {isUpdating ? "Menyimpan..." : "Simpan Profil"}
            </button>
          </form>
        </article>

        {/* Password Card */}
        <ChangePasswordCard />
      </div>
    </div>
  );
}

