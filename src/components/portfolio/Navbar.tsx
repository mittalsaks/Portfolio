import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { profileApi } from "@/lib/api/resources";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/portfolio/VisuallyHidden";
const links = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "hackathons", label: "Hackathons" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: profileApi.getProfile,
  });

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--c-border)] bg-[color:var(--c-bg)]/80 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <a
          href="#hero"
          className="group inline-flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-[color:var(--c-text)]"
          aria-label="Go to top"
        >
          <span className="pulse-glow font-mono text-[color:var(--c-accent)] text-glow-green">
            &lt;/&gt;
          </span>
          <span>{profile?.handle ?? "..."}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`relative rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                  active === l.id
                    ? "text-[color:var(--c-accent)] text-glow-green"
                    : "text-[color:var(--c-text-muted)] hover:text-[color:var(--c-text)]"
                }`}
                aria-current={active === l.id ? "page" : undefined}
              >
                {l.label}
                {active === l.id && (
                  <span className="absolute left-3 right-3 -bottom-[15px] h-[2px] bg-[color:var(--c-accent)] shadow-[0_0_12px_rgba(0,255,135,0.8)]" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="hidden btn-primary md:inline-flex">
          Let's talk
        </a>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="rounded-md p-2 text-[color:var(--c-text)] md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-[color:var(--c-border)] bg-[color:var(--c-bg)]/95 backdrop-blur-xl"
          >
            <SheetTitle asChild>
              <VisuallyHidden>Navigation</VisuallyHidden>
            </SheetTitle>
            <ul className="mt-10 flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-md px-3 py-3 text-sm ${
                      active === l.id
                        ? "bg-[color:var(--c-surface)] text-[color:var(--c-accent)]"
                        : "text-[color:var(--c-text-muted)] hover:text-[color:var(--c-text)]"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
