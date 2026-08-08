import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { tokenMatches, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { getSupabaseAdminClient } from "@/lib/supabase";

async function requireAuth() {
  const store = await cookies();
  return tokenMatches(store.get(ADMIN_COOKIE_NAME)?.value);
}

export async function POST(request: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }
  const admin = getSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "Supabase não configurado." }, { status: 500 });
  }
  const { name } = await request.json();
  const clean = String(name || "").trim().toLowerCase();
  if (!clean) {
    return NextResponse.json({ error: "nome em falta." }, { status: 400 });
  }
  const { data, error } = await admin
    .from("categories")
    .insert({ name: clean })
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ category: data });
}