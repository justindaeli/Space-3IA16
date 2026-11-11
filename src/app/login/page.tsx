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
      <div className="pointer-events-none absolute -top-10 h-72 w-72 rounded-full bg-sky-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 h-72 w-72 rounded-full bg-navy-600/10 blur-3xl" />

      <div className="relative w-full max-w-md rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white/90 via-white/80 to-slate-50 p-6 shadow-2xl shadow-black/60 backdrop-blur-md sm:p-8">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 transition-colors hover:text-slate-800"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1 rounded-full border border-sky-600/20 bg-sky-600/10 px-2.5 py-0.5 text-[11px] font-medium text-sky-700">
            <Sparkles className="h-3 w-3" />
            Portal Masuk Space 3IA16
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Selamat Datang</h1>
          <p className="mt-1 text-xs text-slate-600">
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
            <label className="mb-1.5 block text-xs font-medium text-slate-700">
              Email atau Username
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-slate-500" />
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
            <label className="mb-1.5 block text-xs font-medium text-slate-700">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-slate-500" />
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
                className="absolute top-2.5 right-3 text-slate-600 transition-colors hover:text-slate-800"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex cursor-pointer items-center gap-2 text-slate-600 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-slate-300 bg-slate-200 text-sky-700 focus:ring-sky-600"
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
        <div className="mt-6 border-t border-slate-200/80 pt-4">
          <p className="mb-2 text-[11px] font-medium text-slate-600">Pilih Akun Uji Coba Cepat:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemo("admin@space3ia16.id", "admin123")}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-navy-600/30 bg-navy-600/10 px-2 py-1.5 text-xs font-medium text-navy-800 transition-all hover:bg-navy-600/20"
            >
              <Shield className="h-3 w-3" />
              <span>Akun Admin</span>
            </button>
            <button
              type="button"
              onClick={() => fillDemo("user@space3ia16.id", "user123")}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-sky-600/30 bg-sky-600/10 px-2 py-1.5 text-xs font-medium text-sky-800 transition-all hover:bg-sky-600/20"
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

