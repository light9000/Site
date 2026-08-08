import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

let publicClient: SupabaseClient | null = null;
let adminClient: SupabaseClient | null = null;

/** Cliente de leitura pública — usa a chave anon. Devolve null se o Supabase ainda não estiver configurado. */
export function getSupabaseClient(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (!publicClient) {
    publicClient = createClient(url, anonKey);
  }
  return publicClient;
}

/** Cliente com permissões de escrita — só deve ser usado em código de servidor (API routes). */
export function getSupabaseAdminClient(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  if (!adminClient) {
    adminClient = createClient(url, serviceKey, {
      auth: { persistSession: false },
    });
  }
  return adminClient;
}
