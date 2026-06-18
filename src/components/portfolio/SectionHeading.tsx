interface Props {
  index: string; // e.g. "01"
  title: string;
  subtitle?: string;
  accent?: "blue" | "purple" | "gold";
}

const accentMap = {
  blue: "text-[#00d4ff]",
  purple: "text-[#c98bff]",
  gold: "text-[#ffd700]",
};

export function SectionHeading({ index, title, subtitle, accent = "blue" }: Props) {
  return (
    <div className="mb-12">
      <p className={`font-mono text-sm ${accentMap[accent]}`}>
        <span className="text-foreground/40">#</span>
        {index}
      </p>
      <h2 className="mt-2 font-mono text-3xl font-bold text-foreground sm:text-4xl">
        {title}
        <span className={accentMap[accent]}>.</span>
      </h2>
      {subtitle && <p className="mt-3 max-w-2xl text-foreground/70">{subtitle}</p>}
    </div>
  );
}
