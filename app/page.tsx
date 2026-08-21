import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PortfolioExplorer } from "@/components/PortfolioExplorer";
import { AboutContact, Footer } from "@/components/AboutContact";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";


export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-paper">
      <Header />
      <Hero />
      <PortfolioExplorer projects={projects} />
      <AboutContact />
      <Footer />
    </main>
  );
}
