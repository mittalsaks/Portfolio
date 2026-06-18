import { profile } from "./data";

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 font-mono text-xs text-foreground/50">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with care &amp; caffeine.
        </p>
        <p>
          <span className="text-[#00d4ff]">{"<"}</span>
          coded by hand
          <span className="text-[#9d00ff]">{" />"}</span>
        </p>
      </div>
    </footer>
  );
}
