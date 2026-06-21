import { useMemo, useState } from "react";
import { ExternalLink, Github, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "@/lib/api/resources";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type FilterValue = "All" | "Web" | "Mobile" | "API/Backend";

const filters: { label: string; value: FilterValue }[] = [
  { label: "All", value: "All" },
  { label: "Web", value: "Web" },
  { label: "Mobile", value: "Mobile" },
  { label: "API/Backend", value: "API/Backend" },
];
export function Projects() {
  const [filter, setFilter] = useState<FilterValue>("All");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: projectsApi.getAll,
  });

  const projects = data ?? [];

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects],
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

      <div role="tablist" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-1.5">
        {filters.map((f) => (
          <button
            key={f.value}
            role="tab"
            aria-selected={filter === f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === f.value
                ? "border-[color:var(--c-accent)] bg-[color:var(--c-accent)] text-white"
                : "border-[color:var(--c-border-strong)] text-[color:var(--c-text-muted)] hover:border-[color:var(--c-text-dim)] hover:text-[color:var(--c-text)]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <p className="font-mono text-sm text-[color:var(--c-text-dim)]">
          // loading projects...
        </p>
      )}

      {isError && (
        <p className="font-mono text-sm text-[color:var(--c-text-dim)]">
          // failed to load projects
        </p>
      )}

      {!isLoading && !isError && visible.length === 0 && (
        <p className="font-mono text-sm text-[color:var(--c-text-dim)]">
          // no projects found
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, idx) => (
          <Reveal key={p._id} delay={idx * 60} as="article">
            <div className="glass-card hover-neon-blue scan-line group relative flex h-full flex-col overflow-hidden rounded-md">
              {p.featured && (
                <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded border border-[color:var(--c-accent)]/40 bg-[color:var(--c-accent)]/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[color:var(--c-accent)]">
                  <Star className="h-2.5 w-2.5" /> Featured
                </span>
              )}
              <div className="relative aspect-video w-full overflow-hidden border-b border-[color:var(--c-border)]">
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--c-text-dim)]">
                  {p.category}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-[color:var(--c-text)]">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--c-text-muted)]">
                  {p.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1">
                  {p.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded border border-[color:var(--c-border-strong)] bg-[color:var(--c-surface-2)] px-1.5 py-0.5 font-mono text-[10px] text-[color:var(--c-text-muted)]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center gap-4 pt-4 border-t border-[color:var(--c-border)]">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-xs text-[color:var(--c-text-muted)] transition-colors hover:text-[color:var(--c-accent)]"
                      aria-label={`${p.title} on GitHub`}
                    >
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-xs text-[color:var(--c-text-muted)] transition-colors hover:text-[color:var(--c-accent)]"
                      aria-label={`${p.title} live demo`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Demo
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
