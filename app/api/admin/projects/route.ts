import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { tokenMatches, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { getSupabaseAdminClient } from "@/lib/supabase";

const BUCKET = "projects";

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
    return NextResponse.json(
      { error: "O Supabase ainda não está configurado no servidor (ver README)." },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const categoriesRaw = String(formData.get("categories") || "");
  const categories = categoriesRaw
    .split(",")
    .map((c) => c.trim().toLowerCase())
    .filter(Boolean);
  const file = formData.get("image") as File | null;

  if (!title || categories.length === 0 || !file) {
    return NextResponse.json(
      { error: "título, categorias e imagem são obrigatórios." },
      { status: 400 }
    );
  }



  const extension = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await admin.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = admin.storage.from(BUCKET).getPublicUrl(path);

  const { data, error: insertError } = await admin
    .from("projects")
    .insert({
      title,
      description: description || null,
      categories,
      image_url: publicUrl,
      storage_path: path,
    })
    .select()
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ project: data });
}

export async function PATCH(request: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }
  const admin = getSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "Supabase não configurado." }, { status: 500 });
  }

  const formData = await request.formData();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const categories = String(formData.get("categories") || "")
    .split(",").map((c) => c.trim().toLowerCase()).filter(Boolean);
  const file = formData.get("image") as File | null;

  if (!id || !title || categories.length === 0) {
    return NextResponse.json({ error: "título e categorias são obrigatórios." }, { status: 400 });
  }

  const update: Record<string, unknown> = {
    title,
    description: description || null,
    categories,
  };

  if (file && file.size > 0) {
    const { data: existing } = await admin.from("projects").select("storage_path").eq("id", id).single();
    const extension = file.name.split(".").pop() || "jpg";
    const path = `${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await admin.storage.from(BUCKET).upload(path, file, { contentType: file.type, upsert: false });
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });
    const { data: { publicUrl } } = admin.storage.from(BUCKET).getPublicUrl(path);
    update.image_url = publicUrl;
    update.storage_path = path;
    if (existing?.storage_path) await admin.storage.from(BUCKET).remove([existing.storage_path]);
  }

  const { data, error } = await admin.from("projects").update(update).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ project: data });
}

export async function DELETE(request: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const admin = getSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "O Supabase ainda não está configurado no servidor." },
      { status: 500 }
    );
  }

  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "id em falta." }, { status: 400 });
  }

  const { data: existing } = await admin
    .from("projects")
    .select("storage_path")
    .eq("id", id)
    .single();

  const { error } = await admin.from("projects").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (existing?.storage_path) {
    await admin.storage.from(BUCKET).remove([existing.storage_path]);
  }

  return NextResponse.json({ ok: true });
}
