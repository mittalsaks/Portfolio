import { useState } from "react";
import { FileText, GraduationCap, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { researchApi } from "@/lib/api/resources";
import type { ResearchPaper } from "@/lib/api/types";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

function PaperCard({ paper, idx }: { paper: ResearchPaper; idx: number }) {  const [open, setOpen] = useState(false);
  const truncated = paper.abstract.length > 180 && !open;
  const abstract = truncated ? paper.abstract.slice(0, 180) + "…" : paper.abstract;

  return (
    <Reveal as="article" delay={idx * 80}>
      <div className="glass-card hover-neon-blue scan-line h-full rounded-md p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <ul className="flex flex-wrap gap-1">
            {paper.tags.map((t, i) => (
              <li
                key={t}
                className={`rounded border px-1.5 py-0.5 font-mono text-[10px] ${
                  i === 0
                    ? "border-[color:var(--c-accent)]/40 bg-[color:var(--c-accent)]/10 text-[color:var(--c-accent)]"
                    : "border-[color:var(--c-border-strong)] bg-[color:var(--c-surface-2)] text-[color:var(--c-text-muted)]"
                }`}
              >
                {t}
              </li>
            ))}
          </ul>
          <span className="font-mono text-[11px] text-[color:var(--c-text-dim)]">{paper.year}</span>
        </div>

        <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-[color:var(--c-text)]">
          {paper.title}
        </h3>
        <p className="mt-1 text-sm text-[color:var(--c-text-muted)]">{paper.authors}</p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--c-text-dim)]">
          {paper.venue} · {paper.year}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-[color:var(--c-text-muted)]">{abstract}</p>
        {paper.abstract.length > 180 && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mt-2 font-mono text-[11px] text-[color:var(--c-accent)] hover:underline"
          >
            {open ? "Read less" : "Read more"}
          </button>
        )}

        <div className="mt-5 flex flex-wrap gap-4 border-t border-[color:var(--c-border)] pt-4">
          {paper.pdfUrl && (
            <a
              href={paper.pdfUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-xs text-[color:var(--c-text-muted)] transition-colors hover:text-[color:var(--c-accent)]"
            >
              <FileText className="h-3.5 w-3.5" /> View PDF
            </a>
          )}
          {paper.scholarUrl && (
            <a
              href={paper.scholarUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-xs text-[color:var(--c-text-muted)] transition-colors hover:text-[color:var(--c-accent)]"
            >
              <GraduationCap className="h-3.5 w-3.5" /> Scholar
            </a>
          )}
          {paper.arxivUrl && (
            <a
              href={paper.arxivUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-xs text-[color:var(--c-text-muted)] transition-colors hover:text-[color:var(--c-accent)]"
            >
              <BookOpen className="h-3.5 w-3.5" /> arXiv
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function Research() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["research"],
    queryFn: researchApi.getAll,
  });

  const papers = data ?? [];

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
      />
      <span id="research-title" className="sr-only">
        Research papers
      </span>

      {isLoading && (
        <p className="font-mono text-sm text-[color:var(--c-text-dim)]">
          // loading research papers...
        </p>
      )}

      {isError && (
        <p className="font-mono text-sm text-[color:var(--c-text-dim)]">
          // failed to load research papers
        </p>
      )}

      {!isLoading && !isError && papers.length === 0 && (
        <p className="font-mono text-sm text-[color:var(--c-text-dim)]">
          // no research papers added yet
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {papers.map((p, i) => (
          <PaperCard key={p._id} paper={p} idx={i} />
        ))}
      </div>
    </section>
  );
}
