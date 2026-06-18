import { useState } from "react";
import { FileText, GraduationCap, BookOpen } from "lucide-react";
import { papers } from "./data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

function PaperCard({ paper, idx }: { paper: (typeof papers)[number]; idx: number }) {
  const [open, setOpen] = useState(false);
  const truncated = paper.abstract.length > 180 && !open;
  const abstract = truncated ? paper.abstract.slice(0, 180) + "…" : paper.abstract;

  return (
    <Reveal as="article" delay={idx * 80}>
      <div className="glass-card hover-neon-purple h-full rounded-xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <ul className="flex flex-wrap gap-1.5">
            {paper.tags.map((t) => (
              <li
                key={t}
                className="rounded border border-[#9d00ff]/30 bg-[#9d00ff]/10 px-2 py-0.5 font-mono text-[11px] text-[#c98bff]"
              >
                {t}
              </li>
            ))}
          </ul>
          <span className="font-mono text-xs text-foreground/50">{paper.year}</span>
        </div>

        <h3 className="mt-3 font-mono text-lg font-semibold leading-snug text-foreground">
          {paper.title}
        </h3>
        <p className="mt-1 text-sm text-foreground/60">{paper.authors}</p>
        <p className="mt-1 font-mono text-xs uppercase tracking-wider text-[#00d4ff]">
          {paper.venue} · {paper.year}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-foreground/75">{abstract}</p>
        {paper.abstract.length > 180 && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mt-2 font-mono text-xs text-[#00d4ff] hover:underline"
          >
            {open ? "Read less" : "Read more"}
          </button>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          {paper.pdfUrl && (
            <a
              href={paper.pdfUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm text-foreground/70 transition-colors hover:text-[#00d4ff]"
            >
              <FileText className="h-4 w-4" /> View PDF
            </a>
          )}
          {paper.scholarUrl && (
            <a
              href={paper.scholarUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm text-foreground/70 transition-colors hover:text-[#00d4ff]"
            >
              <GraduationCap className="h-4 w-4" /> Scholar
            </a>
          )}
          {paper.arxivUrl && (
            <a
              href={paper.arxivUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm text-foreground/70 transition-colors hover:text-[#00d4ff]"
            >
              <BookOpen className="h-4 w-4" /> arXiv
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function Research() {
  return (
    <section
      id="research"
      aria-labelledby="research-title"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <SectionHeading
        index="03"
        title="Research"
        subtitle="Peer-reviewed papers and ongoing investigations."
        accent="purple"
      />
      <span id="research-title" className="sr-only">
        Research papers
      </span>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {papers.map((p, i) => (
          <PaperCard key={p.title} paper={p} idx={i} />
        ))}
      </div>
    </section>
  );
}
