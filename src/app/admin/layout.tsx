import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/features/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col rounded-lg border border-slate-200 bg-slate-50 shadow-sm md:flex-row">
      <AdminSidebar />
      <div className="min-w-0 flex-1 p-3 sm:p-7 md:p-8">{children}</div>
    </div>
  );
}

