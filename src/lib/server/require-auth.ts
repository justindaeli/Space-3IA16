import { getSessionUser, requireAdminUser, requireSessionUser } from "./session";

export async function requireAuth() {
  return requireSessionUser();
}

export async function requireAdmin() {
  return requireAdminUser();
}

export async function getOptionalAuth() {
  return getSessionUser();
}
