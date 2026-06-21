import { Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { experienceApi, profileApi } from "@/lib/api/resources";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Experience() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["experience"],
    queryFn: experienceApi.getAll,
  });

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: profileApi.getProfile,
  });

  const experience = data ?? [];

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <SectionHeading
        index="05"
        title="Experience"
        subtitle="Where I've shipped, broken, and rebuilt."
      />
      <span id="experience-title" className="sr-only">
        Experience
      </span>

      {isLoading && (
        <p className="font-mono text-sm text-[color:var(--c-text-dim)]">
          // loading experience...
        </p>
      )}

      {isError && (
        <p className="font-mono text-sm text-[color:var(--c-text-dim)]">
          // failed to load experience
        </p>
      )}

      {!isLoading && !isError && experience.length === 0 && (
        <p className="font-mono text-sm text-[color:var(--c-text-dim)]">
          // no experience added yet
        </p>
      )}

      <ol className="timeline-electric relative space-y-6 border-l border-[color:var(--c-border-strong)] pl-6 sm:pl-8">
        {experience.map((e, idx) => (
          <Reveal key={e._id} as="li" delay={idx * 80}>
            <span
              aria-hidden="true"
              className="absolute -left-[5px] mt-6 h-2.5 w-2.5 rounded-full bg-[color:var(--c-accent)] ring-4 ring-[color:var(--c-bg)]"
            />
            <div className="glass-card hover-neon-blue scan-line rounded-md p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold tracking-tight text-[color:var(--c-text)]">
                    {e.role}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-[color:var(--c-accent)]">{e.company}</p>
                </div>
                <div className="text-right font-mono text-[11px]">
                  <p className="text-[color:var(--c-text-muted)]">{e.duration}</p>
                  <p className="mt-1 inline-block rounded border border-[color:var(--c-border-strong)] bg-[color:var(--c-surface-2)] px-1.5 py-0.5 text-[color:var(--c-text-dim)]">
                    {e.type}
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-[color:var(--c-text-muted)]">
                {e.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--c-text-dim)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>

      <div className="mt-12 flex justify-center">
        <a href={profile?.resumeUrl ?? "#"} download className="btn-primary">
          <Download className="h-4 w-4" />
          Download Full Resume
        </a>
      </div>
    </section>
  );
}
