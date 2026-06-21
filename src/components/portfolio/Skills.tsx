import { useQuery } from "@tanstack/react-query";
import { skillsApi } from "@/lib/api/resources";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Skills() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["skills"],
    queryFn: skillsApi.getAll,
  });

  const skills = data ?? [];

  return (
        <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <SectionHeading
        index="04"
        title="Skills"
        subtitle="The stack I reach for — daily-driver tools and battle-tested favorites."
      />
      <span id="skills-title" className="sr-only">
        Skills
      </span>

{isLoading && (
        <p className="font-mono text-sm text-[color:var(--c-text-dim)]">
          // loading skills...
        </p>
      )}

      {isError && (
        <p className="font-mono text-sm text-[color:var(--c-text-dim)]">
          // failed to load skills
        </p>
      )}

      {!isLoading && !isError && skills.length === 0 && (
        <p className="font-mono text-sm text-[color:var(--c-text-dim)]">
          // no skills added yet
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, gi) => (
          <Reveal key={group.category} delay={gi * 60}>
            <div className="glass-card hover-neon-blue scan-line h-full rounded-md p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="text-base font-semibold tracking-tight text-[color:var(--c-text)]">
                  {group.category}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--c-accent)]">
                  /0{gi + 1}
                </span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <li
                    key={s.name}
                    className="rounded border border-[color:var(--c-border-strong)] bg-[color:var(--c-surface-2)] px-2.5 py-1 font-mono text-xs text-[color:var(--c-text)]"
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
