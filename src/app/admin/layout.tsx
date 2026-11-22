"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/features/admin/AdminSidebar";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isAdmin, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login?from=/admin");
    } else if (!isLoading && !isAdmin) {
      router.replace("/?error=unauthorized_admin");
    }
  }, [isAdmin, isLoading, router, user]);

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-slate-600">
        Memuat dashboard administrator...
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="flex flex-col rounded-lg border border-slate-200 bg-slate-50 shadow-sm md:flex-row">
      <AdminSidebar />
      <div className="min-w-0 flex-1 p-3 sm:p-7 md:p-8">{children}</div>
    </div>
  );
}

