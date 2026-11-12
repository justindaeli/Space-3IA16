import type { AuthUser } from "@/types";
import { Shield, User, Trash2, Edit3, CheckCircle, XCircle } from "lucide-react";

interface UserTableRowProps {
  user: AuthUser;
  onEdit: (user: AuthUser) => void;
  onDelete: (id: string, name: string) => void;
}

export function UserTableRow({ user, onEdit, onDelete }: UserTableRowProps) {
  const isAdmin = user.role === "admin";
  const isActive = user.status === "active";

  return (
    <tr className="hover:bg-slate-200/30 transition-colors">
      <td className="p-3.5 flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-200 font-bold text-slate-800">
          {user.initials}
        </span>
        <div>
          <p className="font-medium text-slate-900">{user.name}</p>
          <p className="text-[11px] text-slate-500">{user.email}</p>
        </div>
      </td>
      <td className="p-3.5 text-slate-600">@{user.username}</td>
      <td className="p-3.5">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
            isAdmin
              ? "bg-sky-50 text-sky-700 border border-sky-200"
              : "bg-sky-600/10 text-sky-700 border border-sky-600/20"
          }`}
        >
          {isAdmin ? <Shield className="h-3 w-3" /> : <User className="h-3 w-3" />}
          {user.role}
        </span>
      </td>
      <td className="p-3.5">
        <span
          className={`inline-flex items-center gap-1 text-[11px] ${
            isActive ? "text-emerald-600" : "text-slate-500"
          }`}
        >
          {isActive ? <CheckCircle className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
          {isActive ? "Aktif" : "Nonaktif"}
        </span>
      </td>
      <td className="p-3.5 text-right space-x-2">
        <button
          onClick={() => onEdit(user)}
          className="p-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900"
          title="Edit Pengguna"
        >
          <Edit3 className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => onDelete(user.id, user.name)}
          className="p-1.5 rounded-lg border border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
          title="Hapus Pengguna"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </td>
    </tr>
  );
}

