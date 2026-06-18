import { skills } from "./data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { useInView } from "@/hooks/use-in-view";

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between font-mono text-xs">
        <span className="text-foreground/80">{name}</span>
        <span className="text-foreground/50">{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full transition-[width] duration-1000 ease-out"
          style={{
            width: inView ? `${level}%` : "0%",
            background: "linear-gradient(90deg, #00d4ff 0%, #9d00ff 100%)",
            boxShadow: "0 0 12px rgba(0,212,255,0.55)",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <SectionHeading
        index="04"
        title="Skills"
        subtitle="The tools I reach for. Levels are vibes, not benchmarks."
      />
      <span id="skills-title" className="sr-only">
        Skills
      </span>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, gi) => (
          <Reveal key={group.category} delay={gi * 80}>
            <div className="glass-card hover-neon-blue h-full rounded-xl p-6">
              <h3 className="font-mono text-sm uppercase tracking-wider text-[#00d4ff]">
                {group.category}
              </h3>
              <div className="mt-5 space-y-4">
                {group.items.map((s, i) => (
                  <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 80} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
