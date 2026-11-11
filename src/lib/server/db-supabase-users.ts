import { getSupabaseServer } from "./supabase";
import type { AuthUser } from "@/types";

export interface DbUser {
  id: string;
  name: string;
  email: string;
  username: string;
  passwordHash: string;
  passwordSalt: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  initials: string;
  avatar_url?: string;
  created_at: string;
  last_login_at?: string;
}

export async function findUserById(id: string): Promise<DbUser | null> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("users")
    .select(
      "id, name, email, username, password_hash, password_salt, role, status, initials, avatar_url, created_at, last_login_at"
    )
    .eq("id", id)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    username: data.username,
    passwordHash: data.password_hash,
    passwordSalt: data.password_salt,
    role: data.role,
    status: data.status,
    initials: data.initials,
    avatar_url: data.avatar_url,
    created_at: data.created_at,
    last_login_at: data.last_login_at,
  };
}

export async function findUserByIdentifier(
  identifier: string
): Promise<DbUser | null> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("users")
    .select(
      "id, name, email, username, password_hash, password_salt, role, status, initials, avatar_url, created_at, last_login_at"
    )
    .or(`email.eq.${identifier}, username.eq.${identifier}`)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    username: data.username,
    passwordHash: data.password_hash,
    passwordSalt: data.password_salt,
    role: data.role,
    status: data.status,
    initials: data.initials,
    avatar_url: data.avatar_url,
    created_at: data.created_at,
    last_login_at: data.last_login_at,
  };
}

export function toAuthUser(user: DbUser): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    role: user.role,
    status: user.status,
    initials: user.initials,
    avatarUrl: user.avatar_url,
    createdAt: user.created_at,
    lastLoginAt: user.last_login_at,
  };
}

export async function getAllUsers(): Promise<DbUser[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("users")
    .select(
      "id, name, email, username, password_hash, password_salt, role, status, initials, avatar_url, created_at, last_login_at"
    )
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    username: u.username,
    passwordHash: u.password_hash,
    passwordSalt: u.password_salt,
    role: u.role,
    status: u.status,
    initials: u.initials,
    avatar_url: u.avatar_url,
    created_at: u.created_at,
    last_login_at: u.last_login_at,
  }));
}

export async function updateUserRole(
  id: string,
  role: "admin" | "user"
): Promise<boolean> {
  const supabase = getSupabaseServer();
  const { error } = await supabase.from("users").update({ role }).eq("id", id);
  return !error;
}

export async function updateUserStatus(
  id: string,
  status: "active" | "inactive"
): Promise<boolean> {
  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from("users")
    .update({ status })
    .eq("id", id);
  return !error;
}
