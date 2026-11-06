import { cookies } from "next/headers";
import { signJwt, verifyJwt } from "./crypto";
import { findUserById, toAuthUser } from "./db-users";
import type { AuthUser, UserRole } from "@/types";

export const SESSION_COOKIE_NAME = "space3ia16_session";

interface SessionPayload extends Record<string, unknown> {
  sub: string;
  role: UserRole;
  name: string;
  exp: number;
}

export async function createSessionToken(
  user: AuthUser,
  rememberMe = false
): Promise<string> {
  const durationSec = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24; // 30 days or 1 day
  const exp = Math.floor(Date.now() / 1000) + durationSec;

  return signJwt({
    sub: user.id,
    role: user.role,
    name: user.name,
    exp,
  });
}

export async function setSessionCookie(
  token: string,
  rememberMe = false
): Promise<void> {
  const durationSec = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24;
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: durationSec,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSessionUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = await verifyJwt<SessionPayload>(token);
    if (!payload?.sub) return null;

    const dbUser = findUserById(payload.sub);
    if (!dbUser || dbUser.status !== "active") return null;

    return toAuthUser(dbUser);
  } catch {
    return null;
  }
}

export async function requireSessionUser(): Promise<AuthUser> {
  const user = await getSessionUser();
  if (!user) {
    throw new Error("UNAUTHORIZED");
  }
  return user;
}

export async function requireAdminUser(): Promise<AuthUser> {
  const user = await requireSessionUser();
  if (user.role !== "admin") {
    throw new Error("FORBIDDEN");
  }
  return user;
}

