import { useMemo, useState } from "react";
import { ExternalLink, Github, Star } from "lucide-react";
import { projects, type ProjectCategory } from "./data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Filter = "All" | ProjectCategory;
const filters: Filter[] = ["All", "Web", "Mobile", "API/Backend"];

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <SectionHeading
        index="01"
        title="Projects"
        subtitle="A selection of things I've shipped — from realtime dashboards to backend infrastructure."
      />
      <span id="projects-title" className="sr-only">
        Projects
      </span>

      <div role="tablist" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-md border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
              filter === f
                ? "border-[#00d4ff]/60 bg-[#00d4ff]/10 text-[#00d4ff] neon-glow-blue"
                : "border-white/10 text-foreground/60 hover:border-white/30 hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, idx) => (
          <Reveal key={p.title} delay={idx * 60} as="article">
            <div className="glass-card hover-neon-blue group relative h-full overflow-hidden rounded-xl">
              {p.featured && (
                <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-md border border-[#ffd700]/40 bg-[#ffd700]/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-[#ffd700]">
                  <Star className="h-3 w-3" /> Featured
                </span>
              )}
              <div className="aspect-video w-full overflow-hidden border-b border-white/5">
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#9d00ff]">
                  {p.category}
                </p>
                <h3 className="mt-2 font-mono text-lg font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/70">{p.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-foreground/70"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center gap-3">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-sm text-foreground/70 transition-colors hover:text-[#00d4ff]"
                      aria-label={`${p.title} on GitHub`}
                    >
                      <Github className="h-4 w-4" /> Code
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-sm text-foreground/70 transition-colors hover:text-[#00d4ff]"
                      aria-label={`${p.title} live demo`}
                    >
                      <ExternalLink className="h-4 w-4" /> Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
