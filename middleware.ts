import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface TokenPayload {
  sub: string;
  role: string;
  name: string;
  exp: number;
}

function parseJwtPayload(token: string): TokenPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const json = Buffer.from(parts[1], "base64url").toString("utf8");
    const payload = JSON.parse(json) as TokenPayload;
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("space3ia16_session")?.value;
  const session = sessionCookie ? parseJwtPayload(sessionCookie) : null;

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    if (!session) {
      const url = new URL("/login", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
    if (session.role !== "admin") {
      const url = new URL("/", request.url);
      url.searchParams.set("error", "unauthorized_admin");
      return NextResponse.redirect(url);
    }
  }

  // Protect /profile routes
  if (pathname.startsWith("/profile")) {
    if (!session) {
      const url = new URL("/login", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  // If already logged in, redirect /login to destination
  if (pathname === "/login" && session) {
    if (session.role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/login"],
};

