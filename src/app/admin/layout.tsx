import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/features/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-slate-50 shadow-2xl md:flex-row">
      <AdminSidebar />
      <div className="flex-1 p-5 sm:p-7 md:p-8 overflow-x-hidden">{children}</div>
    </div>
  );
}

