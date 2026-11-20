import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/features/admin/AdminSidebar";
import { getSessionUser } from "@/lib/server/session";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login?from=/admin");
  }
  if (user.role !== "admin") {
    redirect("/?error=unauthorized_admin");
  }

  return (
    <div className="flex flex-col rounded-lg border border-slate-200 bg-slate-50 shadow-sm md:flex-row">
      <AdminSidebar />
      <div className="min-w-0 flex-1 p-3 sm:p-7 md:p-8">{children}</div>
    </div>
  );
}

