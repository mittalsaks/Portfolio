import { createFileRoute } from "@tanstack/react-router";
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
      { title: "Alex Doe — Full Stack Developer" }, // [REPLACE WITH YOUR NAME]
      {
        name: "description",
        content:
          "Portfolio of Alex Doe — Full Stack Developer. Projects, hackathons, research papers, and experience.",
      },
      { property: "og:title", content: "Alex Doe — Full Stack Developer" },
      {
        property: "og:description",
        content: "Projects, hackathons, research papers, and experience.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-dvh bg-[color:var(--c-bg)] text-[color:var(--c-text)] antialiased">
      <CursorTrail />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Hackathons />
        <Research />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
