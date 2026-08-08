import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_auth";

function expectedToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  // Deriva um token a partir da palavra-passe, para nunca guardar a
  // palavra-passe em claro no cookie do navegador.
  return createHmac("sha256", password).update("portfolio-admin").digest("hex");
}

export function tokenMatches(token: string | undefined): boolean {
  const expected = expectedToken();
  if (!expected || !token) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return tokenMatches(store.get(COOKIE_NAME)?.value);
}

export function checkPassword(password: string): boolean {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  if (password.length !== real.length) return false;
  return timingSafeEqual(Buffer.from(password), Buffer.from(real));
}

export function getSessionToken(): string {
  return expectedToken() ?? "";
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
