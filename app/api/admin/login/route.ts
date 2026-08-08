import { NextRequest, NextResponse } from "next/server";
import { checkPassword, getSessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json().catch(() => ({ password: "" }));

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD não está configurada no servidor." },
      { status: 500 }
    );
  }

  if (typeof password !== "string" || !checkPassword(password)) {
    return NextResponse.json({ error: "Palavra-passe incorreta." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, getSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
