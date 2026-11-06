"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { inputClass, primaryButtonClass } from "@/lib/ui-classes";
import { Eye, EyeOff, Lock, User, AlertCircle, ArrowLeft, Shield, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const { login } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const idVal = identifier.trim();
    const passVal = password.trim();

    if (!idVal || !passVal) {
      setError("Email/Username dan Password wajib diisi.");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    const result = await login({ identifier: idVal, password: passVal, rememberMe });
    setIsSubmitting(false);

    if (result.success) {
      router.push(result.redirectTo || from);
    } else {
      setError(result.error || "Gagal masuk. Periksa kembali kredensial Anda.");
    }
  };

  const fillDemo = (id: string, pass: string) => {
    setIdentifier(id);
    setPassword(pass);
    setError(null);
  };

  return (
    <div className="relative flex min-h-[75vh] items-center justify-center py-8">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative w-full max-w-md rounded-2xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900/90 via-zinc-900/80 to-zinc-950 p-6 shadow-2xl shadow-black/60 backdrop-blur-md sm:p-8">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-200"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-medium text-blue-400">
            <Sparkles className="h-3 w-3" />
            Portal Masuk Space 3IA16
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-zinc-50">Selamat Datang</h1>
          <p className="mt-1 text-xs text-zinc-400">
            Masuk untuk mengakses materi lengkap dan dashboard kelas Anda.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-900/60 bg-red-950/40 p-3 text-xs text-red-300"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-300">
              Email atau Username
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                autoComplete="username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="nama@space3ia16.id atau username"
                className={`${inputClass} pl-9`}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-300">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-zinc-500" />
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password Anda"
                className={`${inputClass} pr-10 pl-9`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2.5 right-3 text-zinc-400 transition-colors hover:text-zinc-200"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex cursor-pointer items-center gap-2 text-zinc-400 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-500"
              />
              <span>Ingat saya (30 hari)</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`${primaryButtonClass} w-full py-2.5 text-sm font-semibold`}
          >
            {isSubmitting ? "Memverifikasi..." : "Masuk ke Akun"}
          </button>
        </form>

        {/* Demo Accounts Quick-fill */}
        <div className="mt-6 border-t border-zinc-800/80 pt-4">
          <p className="mb-2 text-[11px] font-medium text-zinc-400">Pilih Akun Uji Coba Cepat:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemo("admin@space3ia16.id", "admin123")}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-2 py-1.5 text-xs font-medium text-indigo-300 transition-all hover:bg-indigo-500/20"
            >
              <Shield className="h-3 w-3" />
              <span>Akun Admin</span>
            </button>
            <button
              type="button"
              onClick={() => fillDemo("user@space3ia16.id", "user123")}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-2 py-1.5 text-xs font-medium text-blue-300 transition-all hover:bg-blue-500/20"
            >
              <User className="h-3 w-3" />
              <span>Akun Mahasiswa</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

