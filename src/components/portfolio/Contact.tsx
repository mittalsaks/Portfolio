import { useState } from "react";
import { Mail, MapPin, Sparkles, Github, Linkedin, Twitter, Send } from "lucide-react";
import { profile } from "./data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    // TODO: wire this up to your backend / email service (Resend, Formspree, etc.)
    console.log("[contact form]", data);
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <SectionHeading
        index="06"
        title="Contact"
        subtitle="Have an idea, a role, or just want to nerd out? Drop a line."
        accent="purple"
      />
      <span id="contact-title" className="sr-only">
        Contact
      </span>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <form
            onSubmit={onSubmit}
            className="glass-card hover-neon-purple rounded-xl p-6 sm:p-8"
            aria-label="Contact form"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" type="text" required />
              <Field label="Email" name="email" type="email" required />
            </div>
            <div className="mt-5">
              <Field label="Subject" name="subject" type="text" required />
            </div>
            <div className="mt-5">
              <label className="block font-mono text-xs uppercase tracking-wider text-foreground/60">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-2 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2.5 font-sans text-sm text-foreground placeholder:text-foreground/30 focus:border-[#00d4ff]/60 focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/30"
              />
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-md border border-[#00d4ff]/50 bg-[#00d4ff]/10 px-6 py-3 font-mono text-sm font-semibold text-[#00d4ff] hover-neon-blue"
              style={{ animation: "pulse-neon 3s ease-in-out infinite" }}
            >
              <Send className="h-4 w-4" /> {sent ? "Sent — I'll reply soon" : "Send Message"}
            </button>
          </form>
        </Reveal>

        <Reveal delay={120}>
          <aside className="glass-card hover-neon-blue h-full rounded-xl p-6 sm:p-8">
            <h3 className="font-mono text-sm uppercase tracking-wider text-[#00d4ff]">
              Find me
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-[#00d4ff]" />
                <a
                  href={profile.socials.email}
                  className="text-foreground/80 transition-colors hover:text-[#00d4ff]"
                >
                  {profile.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-[#9d00ff]" />
                <span className="text-foreground/80">{profile.location}</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 text-[#ffd700]" />
                <span className="text-foreground/80">
                  Available for: {profile.availability}
                </span>
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="font-mono text-sm uppercase tracking-wider text-[#00d4ff]">
                Elsewhere
              </h3>
              <ul className="mt-4 flex gap-3">
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
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block font-mono text-xs uppercase tracking-wider text-foreground/60">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2.5 font-sans text-sm text-foreground placeholder:text-foreground/30 focus:border-[#00d4ff]/60 focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/30"
      />
    </div>
  );
}
