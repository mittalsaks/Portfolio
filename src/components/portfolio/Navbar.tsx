import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/60 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <a
          href="#hero"
          className="font-mono text-lg font-bold tracking-tight text-foreground"
          aria-label="Go to top"
        >
          <span className="text-gradient-neon">&lt;/&gt;</span>{" "}
          <span className="text-foreground/90">alex.doe</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active === l.id
                    ? "text-[#00d4ff] text-glow-blue"
                    : "text-foreground/70 hover:text-foreground"
                }`}
                aria-current={active === l.id ? "page" : undefined}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-md border border-[#00d4ff]/40 px-4 py-2 font-mono text-xs uppercase tracking-wider text-[#00d4ff] hover-neon-blue md:inline-flex"
        >
          Let's talk
        </a>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="rounded-md p-2 text-foreground md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl"
          >
            <SheetTitle asChild>
              <VisuallyHidden>Navigation</VisuallyHidden>
            </SheetTitle>
            <ul className="mt-10 flex flex-col gap-2">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-md px-3 py-3 font-mono text-base ${
                      active === l.id
                        ? "border border-[#00d4ff]/40 text-[#00d4ff]"
                        : "text-foreground/80 hover:text-foreground"
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
