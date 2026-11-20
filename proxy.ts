import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "@/lib/server/crypto";
import type { UserRole } from "@/types";

interface TokenPayload extends Record<string, unknown> {
  sub: string;
  role: UserRole;
  name: string;
  exp: number;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("space3ia16_session")?.value;
  const session = sessionCookie ? await verifyJwt<TokenPayload>(sessionCookie) : null;

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

