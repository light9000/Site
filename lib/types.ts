export type Project = {
  id: string;
  title: string;
  description: string | null;
  categories: string[];
  image_url: string;
  created_at: string;
};