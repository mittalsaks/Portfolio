import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { allApi, type AllData } from "@/lib/api/resources";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Projects } from "@/components/portfolio/Projects";
import { Hackathons } from "@/components/portfolio/Hackathons";
import { Research } from "@/components/portfolio/Research";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { CursorTrail } from "@/components/portfolio/CursorTrail";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sakshi Mittal — Full Stack Developer & AI/ML Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Sakshi Mittal — Full Stack Developer & AI/ML Engineer. Projects, hackathons, research and experience.",
      },
      { property: "og:title", content: "Sakshi Mittal — Full Stack Developer & AI/ML Engineer" },
      {
        property: "og:description",
        content: "Projects, hackathons, research papers, and experience.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  // ONE network request instead of 6 — all components read from this cache
  const { data, isLoading, isError } = useQuery<AllData>({
    queryKey: ["all"],
    queryFn: allApi.getAll,
    staleTime: 5 * 60 * 1000, // treat data as fresh for 5 min (matches backend cache TTL)
  });

  return (
    <div className="relative min-h-dvh bg-[color:var(--c-bg)] text-[color:var(--c-text)] antialiased">
      <CursorTrail />
      <Navbar />
      <main>
        <Hero        profile={data?.profile}    isLoading={isLoading} isError={isError} />
        <Projects    projects={data?.projects}  isLoading={isLoading} isError={isError} />
        <Hackathons  hackathons={data?.hackathons} isLoading={isLoading} isError={isError} />
        <Research    research={data?.research}  isLoading={isLoading} isError={isError} />
        <Skills      skills={data?.skills}      isLoading={isLoading} isError={isError} />
        <Experience  experience={data?.experience} isLoading={isLoading} isError={isError} />
        <Contact />
      </main>
      <Footer profile={data?.profile} />
    </div>
  );
}