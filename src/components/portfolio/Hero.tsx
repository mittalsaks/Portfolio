import { Download, Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";
import { profile } from "./data";
import { useTypewriter } from "@/hooks/use-typewriter";

export function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-dvh items-center overflow-hidden pt-16"
    >
      {/* animated grid background */}
      <div aria-hidden="true" className="grid-bg absolute inset-0 -z-10 opacity-60" />
      {/* gradient blobs */}
      <div
        aria-hidden="true"
        className="absolute -left-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-[#00d4ff]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-[#9d00ff]/25 blur-3xl"
      />
      {/* radial fade */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a0a0f_85%)]"
      />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-sm text-[#00d4ff]">
          <span className="text-foreground/50">$</span> whoami
        </p>

        <h1
          id="hero-title"
          className="mt-4 font-mono text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl"
        >
          <span className="text-foreground/90">Hi, I'm </span>
          <span className="text-gradient-neon text-glow-blue">{profile.name}</span>
        </h1>

        <p className="mt-6 font-mono text-xl text-foreground/80 sm:text-2xl">
          <span className="text-[#9d00ff]">&gt;</span> {typed}
          <span
            aria-hidden="true"
            className="ml-1 inline-block h-6 w-[2px] translate-y-[3px] bg-[#00d4ff]"
            style={{ animation: "blink-caret 1s steps(2) infinite" }}
          />
        </p>

        <p className="mt-6 max-w-xl text-base text-foreground/70 sm:text-lg">
          {profile.tagline}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-md border border-[#00d4ff]/50 bg-[#00d4ff]/10 px-6 py-3 font-mono text-sm font-semibold text-[#00d4ff] hover-neon-blue"
          >
            View My Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={profile.resumeUrl}
            download
            className="group inline-flex items-center gap-2 rounded-md border border-[#9d00ff]/50 bg-[#9d00ff]/10 px-6 py-3 font-mono text-sm font-semibold text-[#c98bff] hover-neon-purple"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </div>

        <ul className="mt-12 flex items-center gap-5">
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
                className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-foreground/70 transition-all hover:text-[#00d4ff] hover-neon-blue"
              >
                <Icon className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
