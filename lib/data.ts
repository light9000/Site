import { getSupabaseClient } from "./supabase";
import { Project } from "./types";
import { SEED_PROJECTS } from "./seed-data";

export async function getProjects(): Promise<Project[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return SEED_PROJECTS;
  }

  const { data, error } = await supabase
    .from("projects")
    .select("id, title, description, categories, image_url, print_links, created_at")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Não foi possível carregar os trabalhos do Supabase:", error?.message);
    return SEED_PROJECTS;
  }

  return data as Project[];
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return SEED_PROJECTS.find((p) => p.id === id) ?? null;
  }

  const { data, error } = await supabase
    .from("projects")
    .select("id, title, description, categories, image_url, print_links, created_at")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as Project;
}

export function groupByCategory(projects: Project[]): Map<string, Project[]> {
  const grouped = new Map<string, Project[]>();
  for (const project of projects) {
    for (const category of project.categories) {
      if (!grouped.has(category)) grouped.set(category, []);
      grouped.get(category)!.push(project);
    }
  }
  return grouped;
}

const DEFAULT_CATEGORIES = ["infantil", "familiar", "editorial", "branding"];

export async function getCategories(): Promise<string[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return DEFAULT_CATEGORIES;

  const { data, error } = await supabase
    .from("categories")
    .select("name")
    .order("name", { ascending: true });

  if (error || !data || data.length === 0) return DEFAULT_CATEGORIES;
  return data.map((c) => c.name);
}
