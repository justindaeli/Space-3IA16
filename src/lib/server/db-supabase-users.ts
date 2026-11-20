import { getSupabaseServer } from "./supabase";
import { hashPassword } from "./crypto";
import type { AuthUser, CreateUserInput, UpdateUserInput } from "@/types";

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

function mapDbUser(data: Record<string, unknown>): DbUser {
  return {
    id: String(data.id),
    name: String(data.name),
    email: String(data.email),
    username: String(data.username),
    passwordHash: String(data.password_hash),
    passwordSalt: String(data.password_salt),
    role: data.role as DbUser["role"],
    status: data.status as DbUser["status"],
    initials: String(data.initials),
    avatar_url: typeof data.avatar_url === "string" ? data.avatar_url : undefined,
    created_at: String(data.created_at),
    last_login_at: typeof data.last_login_at === "string" ? data.last_login_at : undefined,
  };
}

const userColumns =
  "id, name, email, username, password_hash, password_salt, role, status, initials, avatar_url, created_at, last_login_at";

export async function findUserById(id: string): Promise<DbUser | null> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase.from("users").select(userColumns).eq("id", id).maybeSingle();

  if (error || !data) return null;
  return mapDbUser(data);
}

export async function findUserByIdentifier(
  identifier: string
): Promise<DbUser | null> {
  const supabase = getSupabaseServer();
  const normalized = identifier.trim().toLowerCase();
  const { data: emailMatch, error: emailError } = await supabase
    .from("users")
    .select(userColumns)
    .eq("email", normalized)
    .maybeSingle();
  if (emailError) return null;
  if (emailMatch) return mapDbUser(emailMatch);

  const { data: usernameMatch, error: usernameError } = await supabase
    .from("users")
    .select(userColumns)
    .eq("username", normalized)
    .maybeSingle();
  if (usernameError || !usernameMatch) return null;
  return mapDbUser(usernameMatch);
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

export async function getAllUsers(): Promise<AuthUser[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("users")
    .select(userColumns)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map((user) => toAuthUser(mapDbUser(user)));
}

export async function createUser(input: CreateUserInput): Promise<AuthUser | null> {
  const supabase = getSupabaseServer();
  const { hash, salt } = hashPassword(input.password);
  const initials = input.name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "US";
  const { data, error } = await supabase
    .from("users")
    .insert({
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      username: input.username.trim().toLowerCase(),
      password_hash: hash,
      password_salt: salt,
      role: input.role,
      status: "active",
      initials,
    })
    .select(userColumns)
    .single();
  if (error || !data) return null;
  return toAuthUser(mapDbUser(data));
}

export async function updateUser(
  id: string,
  input: UpdateUserInput
): Promise<AuthUser | null> {
  const updates: Record<string, string> = {};
  if (input.name?.trim()) {
    updates.name = input.name.trim();
    updates.initials =
      input.name
        .trim()
        .split(/\s+/)
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase() || "US";
  }
  if (input.email?.trim()) updates.email = input.email.trim().toLowerCase();
  if (input.role) updates.role = input.role;
  if (input.status) updates.status = input.status;
  if (input.newPassword) {
    const { hash, salt } = hashPassword(input.newPassword);
    updates.password_hash = hash;
    updates.password_salt = salt;
  }
  if (Object.keys(updates).length === 0) return findUserById(id).then((user) => (user ? toAuthUser(user) : null));

  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", id)
    .select(userColumns)
    .maybeSingle();
  if (error || !data) return null;
  return toAuthUser(mapDbUser(data));
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
