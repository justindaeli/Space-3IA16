import { getDatabase, saveDatabase } from "./db-store";
import { hashPassword } from "./crypto";
import type { DbUser, AuthUser, CreateUserInput, UpdateUserInput } from "@/types";

export function toAuthUser(user: DbUser): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    role: user.role,
    status: user.status,
    initials: user.initials,
    avatarUrl: user.avatarUrl ?? null,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt ?? null,
  };
}

export function getAllUsers(): AuthUser[] {
  return getDatabase().users.map(toAuthUser);
}

export function findUserById(id: string): DbUser | null {
  return getDatabase().users.find((u) => u.id === id) ?? null;
}

export function findUserByIdentifier(identifier: string): DbUser | null {
  const norm = identifier.trim().toLowerCase();
  return (
    getDatabase().users.find(
      (u) => u.email.toLowerCase() === norm || u.username.toLowerCase() === norm
    ) ?? null
  );
}

export function createUser(input: CreateUserInput): AuthUser {
  const db = getDatabase();
  const emailExists = db.users.some(
    (u) => u.email.toLowerCase() === input.email.trim().toLowerCase()
  );
  if (emailExists) throw new Error("Email sudah terdaftar.");

  const usernameExists = db.users.some(
    (u) => u.username.toLowerCase() === input.username.trim().toLowerCase()
  );
  if (usernameExists) throw new Error("Username sudah digunakan.");

  const initials = input.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const { hash, salt } = hashPassword(input.password);
  const newUser: DbUser = {
    id: `u-${Date.now()}`,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    username: input.username.trim().toLowerCase(),
    role: input.role,
    status: "active",
    initials: initials || "US",
    passwordHash: hash,
    passwordSalt: salt,
    createdAt: new Date().toISOString(),
  };

  db.users.push(newUser);
  saveDatabase(db);
  return toAuthUser(newUser);
}

export function updateUser(id: string, input: UpdateUserInput): AuthUser {
  const db = getDatabase();
  const idx = db.users.findIndex((u) => u.id === id);
  if (idx === -1) throw new Error("Pengguna tidak ditemukan.");

  const target = db.users[idx];
  if (input.name) {
    target.name = input.name.trim();
    target.initials = target.name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }
  if (input.email) {
    const emailConflict = db.users.some(
      (u) => u.id !== id && u.email.toLowerCase() === input.email?.trim().toLowerCase()
    );
    if (emailConflict) throw new Error("Email sudah digunakan pengguna lain.");
    target.email = input.email.trim().toLowerCase();
  }
  if (input.role) target.role = input.role;
  if (input.status) target.status = input.status;
  if (input.newPassword) {
    const { hash, salt } = hashPassword(input.newPassword);
    target.passwordHash = hash;
    target.passwordSalt = salt;
  }

  saveDatabase(db);
  return toAuthUser(target);
}

export function deleteUser(id: string): boolean {
  const db = getDatabase();
  const initialLen = db.users.length;
  db.users = db.users.filter((u) => u.id !== id);
  if (db.users.length !== initialLen) {
    saveDatabase(db);
    return true;
  }
  return false;
}

