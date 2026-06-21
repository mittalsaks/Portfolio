import { useState } from "react";
import { Mail, MapPin, Sparkles, Github, Linkedin, Twitter, Send } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { profileApi, contactApi } from "@/lib/api/resources";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Contact() {
  const [sent, setSent] = useState(false);
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: profileApi.getProfile,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as {
      name: string;
      email: string;
      subject: string;
      message: string;
    };

    setSubmitting(true);
    try {
      await contactApi.submit(data);
      setSent(true);
      form.reset();
    } catch (err) {
      setSubmitError("Couldn't send your message. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <section
        id="contact"
        className="mx-auto max-w-7xl px-4 py-24 text-center font-mono text-sm text-[color:var(--c-text-dim)] sm:px-6 lg:px-8"
      >
        // loading profile...
      </section>
    );
  }

  if (isError || !profile) {
    return (
      <section
        id="contact"
        className="mx-auto max-w-7xl px-4 py-24 text-center font-mono text-sm text-destructive sm:px-6 lg:px-8"
      >
        // failed to load profile
      </section>
    );
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-screen -z-10 bg-[#0A0A0F]"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-screen -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,135,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <SectionHeading
        index="06"
        title="Contact"
        subtitle="Have an idea, a role, or just want to nerd out? Drop a line."
      />
      <span id="contact-title" className="sr-only">
        Contact
      </span>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <form
            onSubmit={onSubmit}
            className="glass-card rounded-md p-6 sm:p-8"
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
              <label className="block text-xs font-medium text-[color:var(--c-text-muted)]">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-2 w-full rounded-md border border-[color:var(--c-border-strong)] bg-[color:var(--c-surface-2)] px-3 py-2.5 text-sm text-[color:var(--c-text)] placeholder:text-[color:var(--c-text-dim)] focus:border-[color:var(--c-accent)] focus:outline-none"
              />
            </div>
            <button type="submit" disabled={submitting} className="mt-6 btn-primary pulse-glow disabled:opacity-50">
              <Send className="h-4 w-4" />{" "}
              {submitting ? "Sending..." : sent ? "Sent — I'll reply soon" : "Send message"}
            </button>
            {submitError && (
              <p className="mt-3 text-sm text-destructive" role="alert">
                {submitError}
              </p>
            )}
          </form>
        </Reveal>

        <Reveal delay={120}>
          <aside className="glass-card h-full rounded-md p-6 sm:p-8">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--c-text-dim)]">
              Find me
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-[color:var(--c-text-dim)]" />
                <a
                  href={profile.socials.email}
                  className="text-[color:var(--c-text)] transition-colors hover:text-[color:var(--c-accent)]"
                >
                  {profile.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-[color:var(--c-text-dim)]" />
                <span className="text-[color:var(--c-text-muted)]">{profile.location}</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 text-[color:var(--c-text-dim)]" />
                <span className="text-[color:var(--c-text-muted)]">
                  Available for: {profile.availability}
                </span>
              </li>
            </ul>

            <div className="mt-8 border-t border-[color:var(--c-border)] pt-6">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--c-text-dim)]">
                Elsewhere
              </h3>
              <ul className="mt-4 flex gap-2">
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
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-[color:var(--c-border-strong)] text-[color:var(--c-text-muted)] transition-colors hover:border-[color:var(--c-accent)] hover:text-[color:var(--c-text)]"
                    >
                      <Icon className="h-4 w-4" />
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
      <label className="block text-xs font-medium text-[color:var(--c-text-muted)]">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-md border border-[color:var(--c-border-strong)] bg-[color:var(--c-surface-2)] px-3 py-2.5 text-sm text-[color:var(--c-text)] placeholder:text-[color:var(--c-text-dim)] focus:border-[color:var(--c-accent)] focus:outline-none"
      />
    </div>
  );
}
