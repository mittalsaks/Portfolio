import { Briefcase, Download } from "lucide-react";
import { experience, profile } from "./data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Experience() {
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

      <ol className="relative space-y-8 border-l border-white/10 pl-6 sm:pl-10">
        {experience.map((e, idx) => (
          <Reveal key={e.company + idx} as="li" delay={idx * 80}>
            <span
              aria-hidden="true"
              className="absolute -left-[11px] mt-2 flex h-5 w-5 items-center justify-center rounded-full border border-[#00d4ff]/60 bg-[#0a0a0f]"
            >
              <Briefcase className="h-2.5 w-2.5 text-[#00d4ff]" />
            </span>
            <div className="glass-card hover-neon-purple rounded-xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-mono text-lg font-semibold text-foreground">
                    {e.role}
                  </h3>
                  <p className="font-mono text-sm text-[#00d4ff]">{e.company}</p>
                </div>
                <div className="text-right font-mono text-xs">
                  <p className="text-foreground/70">{e.duration}</p>
                  <p className="mt-1 inline-block rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[#c98bff]">
                    {e.type}
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-foreground/75">
                {e.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#00d4ff]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>

      <div className="mt-12 flex justify-center">
        <a
          href={profile.resumeUrl}
          download
          className="inline-flex items-center gap-2 rounded-md border border-[#00d4ff]/50 bg-[#00d4ff]/10 px-6 py-3 font-mono text-sm font-semibold text-[#00d4ff] hover-neon-blue"
          style={{ animation: "pulse-neon 3s ease-in-out infinite" }}
        >
          <Download className="h-4 w-4" />
          Download Full Resume
        </a>
      </div>
    </section>
  );
}
