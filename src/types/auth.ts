export type UserRole = "admin" | "user";

export type UserStatus = "active" | "inactive";

export interface User {
  id: string;
  name: string;
  initials: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  username: string;
  role: UserRole;
  status: UserStatus;
  initials: string;
  avatarUrl?: string | null;
  createdAt: string;
  lastLoginAt?: string | null;
}

export interface DbUser extends AuthUser {
  passwordHash: string;
  passwordSalt: string;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
  rememberMe?: boolean;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
  newPassword?: string;
}

