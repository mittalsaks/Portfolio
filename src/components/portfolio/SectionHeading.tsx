interface Props {
  index: string;
  title: string;
  subtitle?: string;
  accent?: "blue" | "purple" | "gold";
}

export function SectionHeading({ index, title, subtitle }: Props) {
  return (
    <div className="mb-12 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--c-accent)] text-glow-green">
          $ {title.toLowerCase()} <span className="text-[color:var(--c-text-dim)]">— /{index}</span>
        </span>
        <span className="h-px w-12 bg-[color:var(--c-accent)]/40" />
      </div>
      <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-3d-sm text-[color:var(--c-text)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base leading-relaxed text-[color:var(--c-text-muted)]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
