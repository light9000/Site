import { Project } from "./types";

// Dados de exemplo, usados enquanto o Supabase não estiver ligado.
// Assim que a base de dados estiver configurada, os trabalhos reais
// substituem estes automaticamente.
export const SEED_PROJECTS: Project[] = [
  {
    id: "seed-1",
    title: "O lobo à porta",
    description: "Ilustração narrativa sobre a inocência da infância.",
    categories: ["infantil"],
    image_url: "/seed/o-lobo-a-porta.jpg",
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "seed-2",
    title: "Retratos de família",
    description: "Série de ilustrações sobre memória e pertença.",
    categories: ["familiar"],
    image_url: "/seed/placeholder-familiar.svg",
    created_at: "2026-01-02T00:00:00.000Z",
  },
  {
    id: "seed-3",
    title: "Jornal do domingo",
    description: "Ilustração editorial para artigo de opinião.",
    categories: ["editorial"],
    image_url: "/seed/placeholder-editorial.svg",
    created_at: "2026-01-03T00:00:00.000Z",
  },
  {
    id: "seed-4",
    title: "Marca Lume",
    description: "Identidade visual para marca de velas artesanais.",
    categories: ["branding"],
    image_url: "/seed/placeholder-branding.svg",
    created_at: "2026-01-04T00:00:00.000Z",
  },
];
