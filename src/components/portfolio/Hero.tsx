import { Download, Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";
import { useTypewriter } from "@/hooks/use-typewriter";
import type { Profile } from "@/lib/api/types";

interface HeroProps {
  profile?: Profile;
  isLoading: boolean;
  isError: boolean;
}

export function Hero({ profile, isLoading, isError }: HeroProps) {
  const typed = useTypewriter(profile?.roles ?? []);

  if (isLoading) {
    return (
      <section
        id="hero"
        className="flex min-h-dvh items-center justify-center font-mono text-sm text-[color:var(--c-text-dim)]"
      >
        // loading profile...
      </section>
    );
  }

  if (isError || !profile) {
    return (
      <section
        id="hero"
        className="flex min-h-dvh items-center justify-center font-mono text-sm text-destructive"
      >
        // failed to load profile
      </section>
    );
  }

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-dvh items-center overflow-hidden pt-16"
    >
      <div aria-hidden="true" className="grid-bg absolute inset-0 -z-10 opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, rgba(0,255,135,0.10), transparent 70%), linear-gradient(180deg, var(--c-bg) 0%, transparent 25%, transparent 75%, var(--c-bg) 100%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-8">
          <p className="stagger-1 font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--c-accent)] text-glow-green">
            <span className="pulse-glow inline-block">$</span> whoami
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-3 w-[8px] translate-y-[1px] bg-[color:var(--c-accent)]"
              style={{ animation: "blink-caret 1s steps(2) infinite" }}
            />
          </p>

          <h1
            id="hero-title"
            className="stagger-2 mt-6 font-display text-[clamp(2.75rem,8.5vw,6rem)] font-bold leading-[1.02] tracking-[-0.04em] text-3d text-[color:var(--c-text)]"
          >
            <span className="block">{profile.name}.</span>
            <span className="block text-[color:var(--c-accent)] text-glow-green">
              &lt;FullStack /&gt;
            </span>
          </h1>

          <p className="stagger-3 mt-8 font-mono text-sm text-[color:var(--c-text-muted)] sm:text-base">
            <span className="text-[color:var(--c-accent)]">&gt;</span> {typed}
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-4 w-[2px] translate-y-[2px] bg-[color:var(--c-accent)]"
              style={{ animation: "blink-caret 1s steps(2) infinite" }}
            />
          </p>

          <p className="stagger-4 mt-6 max-w-xl text-base leading-relaxed text-[color:var(--c-text-muted)] sm:text-lg">
            {profile.tagline}
          </p>

          <div className="stagger-5 mt-10 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary group">
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href={profile.resumeUrl} download className="btn-ghost">
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </div>

          <ul className="stagger-6 mt-12 flex items-center gap-2">
            {[
              { href: profile.socials.github, Icon: Github, label: "GitHub" },
              { href: profile.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: profile.socials.twitter, Icon: Twitter, label: "Twitter" },
              { href: profile.socials.email, Icon: Mail, label: "Email" },
            ].map(({ href, Icon, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-[color:var(--c-border-strong)] text-[color:var(--c-text-muted)] transition-all hover:border-[color:var(--c-accent)] hover:text-[color:var(--c-accent)] hover:shadow-[0_0_16px_rgba(0,255,135,0.5)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative hidden lg:col-span-4 lg:block">
          <div className="cube-scene mx-auto grid h-[224px] place-items-center opacity-70 -translate-y-6 translate-x-8 scale-[0.7]">
            <div className="cube">
              <div className="cube-face f1" />
              <div className="cube-face f2" />
              <div className="cube-face f3" />
              <div className="cube-face f4" />
              <div className="cube-face f5" />
              <div className="cube-face f6" />
            </div>
          </div>
          <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--c-text-dim)]">
            v2026.06 · {profile.location ?? "remote"}
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--c-accent)] md:block">
        scroll ↓
      </div>
    </section>
  );
}