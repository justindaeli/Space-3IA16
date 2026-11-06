import crypto from "node:crypto";

const DEFAULT_SECRET = "space3ia16_super_secure_jwt_secret_key_2026";

export function getJwtSecret(): string {
  return process.env.SESSION_SECRET || DEFAULT_SECRET;
}

export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { hash, salt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const computed = crypto.scryptSync(password, salt, 64).toString("hex");
    return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(computed, "hex"));
  } catch {
    return false;
  }
}

function base64UrlEncode(data: string): string {
  return Buffer.from(data).toString("base64url");
}

function base64UrlDecode(data: string): string {
  return Buffer.from(data, "base64url").toString("utf8");
}

export async function signJwt(
  payload: Record<string, unknown>,
  secret = getJwtSecret()
): Promise<string> {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64UrlEncode(JSON.stringify(payload));
  const content = `${header}.${body}`;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sigBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(content));
  const signature = Buffer.from(sigBuffer).toString("base64url");
  return `${content}.${signature}`;
}

export async function verifyJwt<T extends Record<string, unknown>>(
  token: string,
  secret = getJwtSecret()
): Promise<T | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;
    const content = `${header}.${body}`;

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const sigBuffer = Buffer.from(signature, "base64url");
    const valid = await crypto.subtle.verify("HMAC", key, sigBuffer, enc.encode(content));
    if (!valid) return null;

    const parsed = JSON.parse(base64UrlDecode(body)) as T;
    const exp = typeof parsed.exp === "number" ? parsed.exp : 0;
    if (exp > 0 && Date.now() >= exp * 1000) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

