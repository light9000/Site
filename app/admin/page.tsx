import { isAuthenticated } from "@/lib/auth";
import { getProjects } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase";
import { LoginForm } from "@/components/admin/LoginForm";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const authed = await isAuthenticated();

  if (!authed) {
    return <LoginForm />;
  }

  const projects = await getProjects();

  return <AdminDashboard initialProjects={projects} supabaseConfigured={isSupabaseConfigured} />;
}
