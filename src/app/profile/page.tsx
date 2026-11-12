"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { ChangePasswordCard } from "@/components/features/profile/ChangePasswordCard";
import { inputClass, primaryButtonClass } from "@/lib/ui-classes";
import { Shield, CheckCircle2, AlertCircle } from "lucide-react";

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  if (!user) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-slate-500">
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
        <h1 className="text-2xl font-bold tracking-tight text-slate-950">Pengaturan Akun</h1>
        <p className="text-xs text-slate-600">Kelola identitas profil dan keamanan akun Space 3IA16.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Info Card */}
        <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-lg font-bold text-sky-700">
              {user.initials}
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">{user.name}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${
                    user.role === "admin"
                      ? "border-sky-200 bg-sky-50 text-sky-700"
                      : "border-sky-600/30 bg-sky-600/10 text-sky-700"
                  }`}
                >
                  <Shield className="h-3 w-3" />
                  {user.role}
                </span>
                <span className="text-xs text-slate-600">@{user.username}</span>
              </div>
            </div>
          </div>

          {statusMsg && (
            <div
              className={`mt-4 flex items-center gap-2 rounded-lg border p-3 text-xs ${
                statusMsg.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {statusMsg.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
              )}
              <span>{statusMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleUpdateName} className="mt-5 space-y-3.5">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Email Kampus</label>
              <input
                type="email"
                disabled
                value={user.email}
                className={`${inputClass} cursor-not-allowed opacity-60`}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Username</label>
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

