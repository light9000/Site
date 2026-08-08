export type Project = {
  id: string;
  title: string;
  description: string | null;
  categories: string[];
  image_url: string;
  print_links: string[] | null;
  created_at: string;
};