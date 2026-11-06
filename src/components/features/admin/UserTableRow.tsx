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
    <tr className="hover:bg-zinc-800/30 transition-colors">
      <td className="p-3.5 flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-800 font-bold text-zinc-200">
          {user.initials}
        </span>
        <div>
          <p className="font-medium text-zinc-100">{user.name}</p>
          <p className="text-[11px] text-zinc-500">{user.email}</p>
        </div>
      </td>
      <td className="p-3.5 text-zinc-400">@{user.username}</td>
      <td className="p-3.5">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
            isAdmin
              ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
              : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
          }`}
        >
          {isAdmin ? <Shield className="h-3 w-3" /> : <User className="h-3 w-3" />}
          {user.role}
        </span>
      </td>
      <td className="p-3.5">
        <span
          className={`inline-flex items-center gap-1 text-[11px] ${
            isActive ? "text-emerald-400" : "text-zinc-500"
          }`}
        >
          {isActive ? <CheckCircle className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
          {isActive ? "Aktif" : "Nonaktif"}
        </span>
      </td>
      <td className="p-3.5 text-right space-x-2">
        <button
          onClick={() => onEdit(user)}
          className="p-1.5 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700"
          title="Edit Pengguna"
        >
          <Edit3 className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => onDelete(user.id, user.name)}
          className="p-1.5 rounded-lg border border-red-900/50 bg-red-950/30 text-red-400 hover:bg-red-900/50"
          title="Hapus Pengguna"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </td>
    </tr>
  );
}

