import { Trophy, Users, Calendar } from "lucide-react";
import { hackathons } from "./data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Hackathons() {
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
        accent="gold"
      />
      <span id="hackathons-title" className="sr-only">
        Hackathons
      </span>

      <ol className="relative space-y-6 border-l border-[#ffd700]/30 pl-6 sm:pl-10">
        {hackathons.map((h, idx) => (
          <Reveal key={h.name + idx} as="li" delay={idx * 80}>
            <span
              aria-hidden="true"
              className="absolute -left-[9px] mt-3 flex h-4 w-4 items-center justify-center rounded-full border border-[#ffd700]/60 bg-[#0a0a0f] sm:-left-[9px]"
            >
              <span className="h-2 w-2 rounded-full bg-[#ffd700] neon-glow-gold" />
            </span>
            <div className="glass-card hover-neon-gold rounded-xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-xs uppercase tracking-wider text-[#ffd700]">
                    {h.award}
                  </p>
                  <h3 className="mt-1 font-mono text-lg font-semibold text-foreground">
                    {h.name}
                  </h3>
                  <p className="mt-1 text-sm text-foreground/70">{h.project}</p>
                </div>
                <Trophy className="h-6 w-6 shrink-0 text-[#ffd700]" aria-hidden="true" />
              </div>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {h.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded border border-[#ffd700]/20 bg-[#ffd700]/5 px-2 py-0.5 font-mono text-[11px] text-[#ffd700]"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs text-foreground/60">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" /> Team of {h.team}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> {h.date}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
