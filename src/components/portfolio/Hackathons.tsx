import { Trophy, Users, Calendar, Github, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { hackathonsApi } from "@/lib/api/resources";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Hackathons() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["hackathons"],
    queryFn: hackathonsApi.getAll,
  });

  const hackathons = data ?? [];

  return (
    <section
      id="hackathons"
      aria-labelledby="hackathons-title"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <SectionHeading
        index="02"
        title="Hackathons"
        subtitle="48-hour sprints, trophies, and the occasional 4am pivot."
      />
      <span id="hackathons-title" className="sr-only">
        Hackathons
      </span>

      {isLoading && (
        <p className="font-mono text-sm text-[color:var(--c-text-dim)]">
          // loading hackathons...
        </p>
      )}

      {isError && (
        <p className="font-mono text-sm text-[color:var(--c-text-dim)]">
          // failed to load hackathons
        </p>
      )}

      {!isLoading && !isError && hackathons.length === 0 && (
        <p className="font-mono text-sm text-[color:var(--c-text-dim)]">
          // no hackathons added yet
        </p>
      )}

      <ol className="timeline-electric relative space-y-4 border-l border-[color:var(--c-border-strong)] pl-6 sm:pl-8">
        {hackathons.map((h, idx) => (
          <Reveal key={h._id} as="li" delay={idx * 80}>
            <span
              aria-hidden="true"
              className="absolute -left-[5px] mt-5 h-2.5 w-2.5 rounded-full bg-[color:var(--c-accent)] ring-4 ring-[color:var(--c-bg)]"
            />
            <div className="glass-card hover-neon-blue scan-line rounded-md p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="inline-block rounded border border-[color:var(--c-accent)]/40 bg-[color:var(--c-accent)]/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[color:var(--c-accent)]">
                    {h.award}
                  </p>
                  <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-[color:var(--c-text)]">
                    {h.name}
                  </h3>
                  <p className="mt-1 text-sm text-[color:var(--c-text-muted)]">{h.project}</p>
                </div>
                <Trophy className="h-5 w-5 shrink-0 text-[color:var(--c-text-dim)]" aria-hidden="true" />
              </div>

              {h.description && (
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--c-text-muted)]">
                  {h.description}
                </p>
              )}

              <ul className="mt-4 flex flex-wrap gap-1">
                {h.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded border border-[color:var(--c-border-strong)] bg-[color:var(--c-surface-2)] px-1.5 py-0.5 font-mono text-[10px] text-[color:var(--c-text-muted)]"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-4 font-mono text-[11px] text-[color:var(--c-text-dim)]">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-3 w-3" /> Team of {h.team}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" /> {h.date}
                </span>
              </div>

              {(h.github || h.demo) && (
                <div className="mt-4 flex items-center gap-4 border-t border-[color:var(--c-border)] pt-4">
                  {h.github && (
                    <a
                      href={h.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-xs text-[color:var(--c-text-muted)] transition-colors hover:text-[color:var(--c-accent)]"
                      aria-label={`${h.name} on GitHub`}
                    >
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                  )}
                  {h.demo && (
                    <a
                      href={h.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-xs text-[color:var(--c-text-muted)] transition-colors hover:text-[color:var(--c-accent)]"
                      aria-label={`${h.name} live demo`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}