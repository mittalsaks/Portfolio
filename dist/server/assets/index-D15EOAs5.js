import { jsxs, jsx } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { p as profileApi, a as projectsApi, h as hackathonsApi, r as researchApi, s as skillsApi, e as experienceApi, c as contactApi, b as allApi } from "./resources-D8f9zfdo.js";
import * as React from "react";
import { useState, useEffect, useRef, useMemo } from "react";
import { X, Menu, ArrowRight, Download, Github, Linkedin, Twitter, Mail, Star, ExternalLink, Trophy, Users, Calendar, FileText, GraduationCap, BookOpen, Send, MapPin, Sparkles } from "lucide-react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { C as CursorTrail } from "./CursorTrail-q_7RbpRR.js";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(SheetPrimitive.Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
function VisuallyHidden({ children }) {
  return /* @__PURE__ */ jsx("span", { className: "absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0_0_0_0)]", children });
}
const links = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "hackathons", label: "Hackathons" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" }
];
function Navbar() {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: profileApi.getProfile
  });
  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter((el) => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsx("header", { className: "fixed inset-x-0 top-0 z-50 border-b border-[color:var(--c-border)] bg-[color:var(--c-bg)]/80 backdrop-blur-xl", children: /* @__PURE__ */ jsxs(
    "nav",
    {
      className: "mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8",
      "aria-label": "Primary",
      children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "#hero",
            className: "group inline-flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-[color:var(--c-text)]",
            "aria-label": "Go to top",
            children: [
              /* @__PURE__ */ jsx("span", { className: "pulse-glow font-mono text-[color:var(--c-accent)] text-glow-green", children: "</>" }),
              /* @__PURE__ */ jsx("span", { children: profile?.handle ?? "..." })
            ]
          }
        ),
        /* @__PURE__ */ jsx("ul", { className: "hidden items-center gap-1 md:flex", children: links.map((l) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "a",
          {
            href: `#${l.id}`,
            className: `relative rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${active === l.id ? "text-[color:var(--c-accent)] text-glow-green" : "text-[color:var(--c-text-muted)] hover:text-[color:var(--c-text)]"}`,
            "aria-current": active === l.id ? "page" : void 0,
            children: [
              l.label,
              active === l.id && /* @__PURE__ */ jsx("span", { className: "absolute left-3 right-3 -bottom-[15px] h-[2px] bg-[color:var(--c-accent)] shadow-[0_0_12px_rgba(0,255,135,0.8)]" })
            ]
          }
        ) }, l.id)) }),
        /* @__PURE__ */ jsx("a", { href: "#contact", className: "hidden btn-primary md:inline-flex", children: "Let's talk" }),
        /* @__PURE__ */ jsxs(Sheet, { open, onOpenChange: setOpen, children: [
          /* @__PURE__ */ jsx(
            SheetTrigger,
            {
              className: "rounded-md p-2 text-[color:var(--c-text)] md:hidden",
              "aria-label": "Open menu",
              children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
            }
          ),
          /* @__PURE__ */ jsxs(
            SheetContent,
            {
              side: "right",
              className: "border-[color:var(--c-border)] bg-[color:var(--c-bg)]/95 backdrop-blur-xl",
              children: [
                /* @__PURE__ */ jsx(SheetTitle, { asChild: true, children: /* @__PURE__ */ jsx(VisuallyHidden, { children: "Navigation" }) }),
                /* @__PURE__ */ jsx("ul", { className: "mt-10 flex flex-col gap-1", children: links.map((l) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `#${l.id}`,
                    onClick: () => setOpen(false),
                    className: `block rounded-md px-3 py-3 text-sm ${active === l.id ? "bg-[color:var(--c-surface)] text-[color:var(--c-accent)]" : "text-[color:var(--c-text-muted)] hover:text-[color:var(--c-text)]"}`,
                    children: l.label
                  }
                ) }, l.id)) })
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function useTypewriter(words, { type = 80, erase = 40, pause = 1400 } = {}) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    if (!words.length) return;
    const current = words[i % words.length];
    let timer;
    if (!deleting && text === current) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setI((v) => (v + 1) % words.length);
    } else {
      timer = setTimeout(
        () => {
          setText(
            (t) => deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
          );
        },
        deleting ? erase : type
      );
    }
    return () => clearTimeout(timer);
  }, [text, deleting, i, words, type, erase, pause]);
  return text;
}
function Hero({ profile, isLoading, isError }) {
  const typed = useTypewriter(profile?.roles ?? []);
  if (isLoading) {
    return /* @__PURE__ */ jsx(
      "section",
      {
        id: "hero",
        className: "flex min-h-dvh items-center justify-center font-mono text-sm text-[color:var(--c-text-dim)]",
        children: "// loading profile..."
      }
    );
  }
  if (isError || !profile) {
    return /* @__PURE__ */ jsx(
      "section",
      {
        id: "hero",
        className: "flex min-h-dvh items-center justify-center font-mono text-sm text-destructive",
        children: "// failed to load profile"
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "hero",
      "aria-labelledby": "hero-title",
      className: "relative isolate flex min-h-dvh items-center overflow-hidden pt-16",
      children: [
        /* @__PURE__ */ jsx("div", { "aria-hidden": "true", className: "grid-bg absolute inset-0 -z-10 opacity-50" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": "true",
            className: "pointer-events-none absolute inset-0 -z-10",
            style: {
              background: "radial-gradient(60% 50% at 50% 40%, rgba(0,255,135,0.10), transparent 70%), linear-gradient(180deg, var(--c-bg) 0%, transparent 25%, transparent 75%, var(--c-bg) 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-8", children: [
            /* @__PURE__ */ jsxs("p", { className: "stagger-1 font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--c-accent)] text-glow-green", children: [
              /* @__PURE__ */ jsx("span", { className: "pulse-glow inline-block", children: "$" }),
              " whoami",
              /* @__PURE__ */ jsx(
                "span",
                {
                  "aria-hidden": "true",
                  className: "ml-1 inline-block h-3 w-[8px] translate-y-[1px] bg-[color:var(--c-accent)]",
                  style: { animation: "blink-caret 1s steps(2) infinite" }
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(
              "h1",
              {
                id: "hero-title",
                className: "stagger-2 mt-6 font-display text-[clamp(2.75rem,8.5vw,6rem)] font-bold leading-[1.02] tracking-[-0.04em] text-3d text-[color:var(--c-text)]",
                children: [
                  /* @__PURE__ */ jsxs("span", { className: "block", children: [
                    profile.name,
                    "."
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "block text-[color:var(--c-accent)] text-glow-green", children: "<FullStack />" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("p", { className: "stagger-3 mt-8 font-mono text-sm text-[color:var(--c-text-muted)] sm:text-base", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[color:var(--c-accent)]", children: ">" }),
              " ",
              typed,
              /* @__PURE__ */ jsx(
                "span",
                {
                  "aria-hidden": "true",
                  className: "ml-1 inline-block h-4 w-[2px] translate-y-[2px] bg-[color:var(--c-accent)]",
                  style: { animation: "blink-caret 1s steps(2) infinite" }
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "stagger-4 mt-6 max-w-xl text-base leading-relaxed text-[color:var(--c-text-muted)] sm:text-lg", children: profile.tagline }),
            /* @__PURE__ */ jsxs("div", { className: "stagger-5 mt-10 flex flex-wrap gap-3", children: [
              /* @__PURE__ */ jsxs("a", { href: "#projects", className: "btn-primary group", children: [
                "View My Work",
                /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })
              ] }),
              /* @__PURE__ */ jsxs("a", { href: profile.resumeUrl, download: true, className: "btn-ghost", children: [
                /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }),
                "Download Resume"
              ] })
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "stagger-6 mt-12 flex items-center gap-2", children: [
              { href: profile.socials.github, Icon: Github, label: "GitHub" },
              { href: profile.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: profile.socials.twitter, Icon: Twitter, label: "Twitter" },
              { href: profile.socials.email, Icon: Mail, label: "Email" }
            ].map(({ href, Icon, label }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              "a",
              {
                href,
                target: "_blank",
                rel: "noreferrer noopener",
                "aria-label": label,
                className: "flex h-10 w-10 items-center justify-center rounded-md border border-[color:var(--c-border-strong)] text-[color:var(--c-text-muted)] transition-all hover:border-[color:var(--c-accent)] hover:text-[color:var(--c-accent)] hover:shadow-[0_0_16px_rgba(0,255,135,0.5)]",
                children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" })
              }
            ) }, label)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative hidden lg:col-span-4 lg:block", children: [
            /* @__PURE__ */ jsx("div", { className: "cube-scene mx-auto grid h-[224px] place-items-center opacity-70 -translate-y-6 translate-x-8 scale-[0.7]", children: /* @__PURE__ */ jsxs("div", { className: "cube", children: [
              /* @__PURE__ */ jsx("div", { className: "cube-face f1" }),
              /* @__PURE__ */ jsx("div", { className: "cube-face f2" }),
              /* @__PURE__ */ jsx("div", { className: "cube-face f3" }),
              /* @__PURE__ */ jsx("div", { className: "cube-face f4" }),
              /* @__PURE__ */ jsx("div", { className: "cube-face f5" }),
              /* @__PURE__ */ jsx("div", { className: "cube-face f6" })
            ] }) }),
            /* @__PURE__ */ jsxs("p", { className: "mt-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--c-text-dim)]", children: [
              "v2026.06 · ",
              profile.location ?? "remote"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--c-accent)] md:block", children: "scroll ↓" })
      ]
    }
  );
}
function SectionHeading({ index, title, subtitle }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-12 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxs("span", { className: "font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--c-accent)] text-glow-green", children: [
        "$ ",
        title.toLowerCase(),
        " ",
        /* @__PURE__ */ jsxs("span", { className: "text-[color:var(--c-text-dim)]", children: [
          "— /",
          index
        ] })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "h-px w-12 bg-[color:var(--c-accent)]/40" })
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-3d-sm text-[color:var(--c-text)] sm:text-4xl lg:text-5xl", children: title }),
    subtitle && /* @__PURE__ */ jsx("p", { className: "max-w-2xl text-base leading-relaxed text-[color:var(--c-text-muted)]", children: subtitle })
  ] });
}
function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px", ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}
function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const { ref, inView } = useInView();
  const Tag = as;
  return /* @__PURE__ */ jsx(
    Tag,
    {
      ref,
      "data-visible": inView,
      className: `reveal ${className}`,
      style: { transitionDelay: `${delay}ms` },
      children
    }
  );
}
const filters = [
  { label: "All", value: "All" },
  { label: "Web", value: "Web" },
  { label: "Mobile", value: "Mobile" },
  { label: "API/Backend", value: "API/Backend" }
];
function Projects() {
  const [filter, setFilter] = useState("All");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: projectsApi.getAll
  });
  const projects = data ?? [];
  const visible = useMemo(
    () => filter === "All" ? projects : projects.filter((p) => p.category === filter),
    [filter, projects]
  );
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "projects",
      "aria-labelledby": "projects-title",
      className: "mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8",
      children: [
        /* @__PURE__ */ jsx(
          SectionHeading,
          {
            index: "01",
            title: "Projects",
            subtitle: "A selection of things I've shipped — from realtime dashboards to backend infrastructure."
          }
        ),
        /* @__PURE__ */ jsx("span", { id: "projects-title", className: "sr-only", children: "Projects" }),
        /* @__PURE__ */ jsx("div", { role: "tablist", "aria-label": "Filter projects", className: "mb-10 flex flex-wrap gap-1.5", children: filters.map((f) => /* @__PURE__ */ jsx(
          "button",
          {
            role: "tab",
            "aria-selected": filter === f.value,
            onClick: () => setFilter(f.value),
            className: `rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${filter === f.value ? "border-[color:var(--c-accent)] bg-[color:var(--c-accent)] text-white" : "border-[color:var(--c-border-strong)] text-[color:var(--c-text-muted)] hover:border-[color:var(--c-text-dim)] hover:text-[color:var(--c-text)]"}`,
            children: f.label
          },
          f.value
        )) }),
        isLoading && /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-[color:var(--c-text-dim)]", children: "// loading projects..." }),
        isError && /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-[color:var(--c-text-dim)]", children: "// failed to load projects" }),
        !isLoading && !isError && visible.length === 0 && /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-[color:var(--c-text-dim)]", children: "// no projects found" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3", children: visible.map((p, idx) => /* @__PURE__ */ jsx(Reveal, { delay: idx * 60, as: "article", children: /* @__PURE__ */ jsxs("div", { className: "glass-card hover-neon-blue scan-line group relative flex h-full flex-col overflow-hidden rounded-md", children: [
          p.featured && /* @__PURE__ */ jsxs("span", { className: "absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded border border-[color:var(--c-accent)]/40 bg-[color:var(--c-accent)]/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[color:var(--c-accent)]", children: [
            /* @__PURE__ */ jsx(Star, { className: "h-2.5 w-2.5" }),
            " Featured"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative aspect-video w-full overflow-hidden border-b border-[color:var(--c-border)]", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: p.image,
              alt: "",
              loading: "lazy",
              className: "h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col p-5", children: [
            /* @__PURE__ */ jsx("p", { className: "font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--c-text-dim)]", children: p.category }),
            /* @__PURE__ */ jsx("h3", { className: "mt-2 text-lg font-semibold tracking-tight text-[color:var(--c-text)]", children: p.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-sm leading-relaxed text-[color:var(--c-text-muted)]", children: p.description }),
            /* @__PURE__ */ jsx("ul", { className: "mt-4 flex flex-wrap gap-1", children: p.tech.map((t) => /* @__PURE__ */ jsx(
              "li",
              {
                className: "rounded border border-[color:var(--c-border-strong)] bg-[color:var(--c-surface-2)] px-1.5 py-0.5 font-mono text-[10px] text-[color:var(--c-text-muted)]",
                children: t
              },
              t
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-center gap-4 pt-4 border-t border-[color:var(--c-border)]", children: [
              p.github && /* @__PURE__ */ jsxs(
                "a",
                {
                  href: p.github,
                  target: "_blank",
                  rel: "noreferrer noopener",
                  className: "inline-flex items-center gap-1.5 text-xs text-[color:var(--c-text-muted)] transition-colors hover:text-[color:var(--c-accent)]",
                  "aria-label": `${p.title} on GitHub`,
                  children: [
                    /* @__PURE__ */ jsx(Github, { className: "h-3.5 w-3.5" }),
                    " Code"
                  ]
                }
              ),
              p.demo && /* @__PURE__ */ jsxs(
                "a",
                {
                  href: p.demo,
                  target: "_blank",
                  rel: "noreferrer noopener",
                  className: "inline-flex items-center gap-1.5 text-xs text-[color:var(--c-text-muted)] transition-colors hover:text-[color:var(--c-accent)]",
                  "aria-label": `${p.title} live demo`,
                  children: [
                    /* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
                    " Demo"
                  ]
                }
              )
            ] })
          ] })
        ] }) }, p._id)) })
      ]
    }
  );
}
function Hackathons() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["hackathons"],
    queryFn: hackathonsApi.getAll
  });
  const hackathons = data ?? [];
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "hackathons",
      "aria-labelledby": "hackathons-title",
      className: "relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8",
      children: [
        /* @__PURE__ */ jsx(
          SectionHeading,
          {
            index: "02",
            title: "Hackathons",
            subtitle: "48-hour sprints, trophies, and the occasional 4am pivot."
          }
        ),
        /* @__PURE__ */ jsx("span", { id: "hackathons-title", className: "sr-only", children: "Hackathons" }),
        isLoading && /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-[color:var(--c-text-dim)]", children: "// loading hackathons..." }),
        isError && /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-[color:var(--c-text-dim)]", children: "// failed to load hackathons" }),
        !isLoading && !isError && hackathons.length === 0 && /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-[color:var(--c-text-dim)]", children: "// no hackathons added yet" }),
        /* @__PURE__ */ jsx("ol", { className: "timeline-electric relative space-y-4 border-l border-[color:var(--c-border-strong)] pl-6 sm:pl-8", children: hackathons.map((h, idx) => /* @__PURE__ */ jsxs(Reveal, { as: "li", delay: idx * 80, children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              "aria-hidden": "true",
              className: "absolute -left-[5px] mt-5 h-2.5 w-2.5 rounded-full bg-[color:var(--c-accent)] ring-4 ring-[color:var(--c-bg)]"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "glass-card hover-neon-blue scan-line rounded-md p-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "inline-block rounded border border-[color:var(--c-accent)]/40 bg-[color:var(--c-accent)]/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[color:var(--c-accent)]", children: h.award }),
                /* @__PURE__ */ jsx("h3", { className: "mt-2.5 text-lg font-semibold tracking-tight text-[color:var(--c-text)]", children: h.name }),
                /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-[color:var(--c-text-muted)]", children: h.project })
              ] }),
              /* @__PURE__ */ jsx(Trophy, { className: "h-5 w-5 shrink-0 text-[color:var(--c-text-dim)]", "aria-hidden": "true" })
            ] }),
            h.description && /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-[color:var(--c-text-muted)]", children: h.description }),
            /* @__PURE__ */ jsx("ul", { className: "mt-4 flex flex-wrap gap-1", children: h.tech.map((t) => /* @__PURE__ */ jsx(
              "li",
              {
                className: "rounded border border-[color:var(--c-border-strong)] bg-[color:var(--c-surface-2)] px-1.5 py-0.5 font-mono text-[10px] text-[color:var(--c-text-muted)]",
                children: t
              },
              t
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-4 font-mono text-[11px] text-[color:var(--c-text-dim)]", children: [
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Users, { className: "h-3 w-3" }),
                " Team of ",
                h.team
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3" }),
                " ",
                h.date
              ] })
            ] }),
            (h.github || h.demo) && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-4 border-t border-[color:var(--c-border)] pt-4", children: [
              h.github && /* @__PURE__ */ jsxs(
                "a",
                {
                  href: h.github,
                  target: "_blank",
                  rel: "noreferrer noopener",
                  className: "inline-flex items-center gap-1.5 text-xs text-[color:var(--c-text-muted)] transition-colors hover:text-[color:var(--c-accent)]",
                  "aria-label": `${h.name} on GitHub`,
                  children: [
                    /* @__PURE__ */ jsx(Github, { className: "h-3.5 w-3.5" }),
                    " Code"
                  ]
                }
              ),
              h.demo && /* @__PURE__ */ jsxs(
                "a",
                {
                  href: h.demo,
                  target: "_blank",
                  rel: "noreferrer noopener",
                  className: "inline-flex items-center gap-1.5 text-xs text-[color:var(--c-text-muted)] transition-colors hover:text-[color:var(--c-accent)]",
                  "aria-label": `${h.name} live demo`,
                  children: [
                    /* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
                    " Demo"
                  ]
                }
              )
            ] })
          ] })
        ] }, h._id)) })
      ]
    }
  );
}
function PaperCard({ paper, idx }) {
  const [open, setOpen] = useState(false);
  const truncated = paper.abstract.length > 180 && !open;
  const abstract = truncated ? paper.abstract.slice(0, 180) + "…" : paper.abstract;
  return /* @__PURE__ */ jsx(Reveal, { as: "article", delay: idx * 80, children: /* @__PURE__ */ jsxs("div", { className: "glass-card hover-neon-blue scan-line h-full rounded-md p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsx("ul", { className: "flex flex-wrap gap-1", children: paper.tags.map((t, i) => /* @__PURE__ */ jsx(
        "li",
        {
          className: `rounded border px-1.5 py-0.5 font-mono text-[10px] ${i === 0 ? "border-[color:var(--c-accent)]/40 bg-[color:var(--c-accent)]/10 text-[color:var(--c-accent)]" : "border-[color:var(--c-border-strong)] bg-[color:var(--c-surface-2)] text-[color:var(--c-text-muted)]"}`,
          children: t
        },
        t
      )) }),
      /* @__PURE__ */ jsx("span", { className: "font-mono text-[11px] text-[color:var(--c-text-dim)]", children: paper.year })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "mt-4 text-lg font-semibold leading-snug tracking-tight text-[color:var(--c-text)]", children: paper.title }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-[color:var(--c-text-muted)]", children: paper.authors }),
    /* @__PURE__ */ jsxs("p", { className: "mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--c-text-dim)]", children: [
      paper.venue,
      " · ",
      paper.year
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm leading-relaxed text-[color:var(--c-text-muted)]", children: abstract }),
    paper.abstract.length > 180 && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => setOpen((v) => !v),
        className: "mt-2 font-mono text-[11px] text-[color:var(--c-accent)] hover:underline",
        children: open ? "Read less" : "Read more"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-wrap gap-4 border-t border-[color:var(--c-border)] pt-4", children: [
      paper.pdfUrl && /* @__PURE__ */ jsxs(
        "a",
        {
          href: paper.pdfUrl,
          target: "_blank",
          rel: "noreferrer noopener",
          className: "inline-flex items-center gap-1.5 text-xs text-[color:var(--c-text-muted)] transition-colors hover:text-[color:var(--c-accent)]",
          children: [
            /* @__PURE__ */ jsx(FileText, { className: "h-3.5 w-3.5" }),
            " View PDF"
          ]
        }
      ),
      paper.scholarUrl && /* @__PURE__ */ jsxs(
        "a",
        {
          href: paper.scholarUrl,
          target: "_blank",
          rel: "noreferrer noopener",
          className: "inline-flex items-center gap-1.5 text-xs text-[color:var(--c-text-muted)] transition-colors hover:text-[color:var(--c-accent)]",
          children: [
            /* @__PURE__ */ jsx(GraduationCap, { className: "h-3.5 w-3.5" }),
            " Scholar"
          ]
        }
      ),
      paper.arxivUrl && /* @__PURE__ */ jsxs(
        "a",
        {
          href: paper.arxivUrl,
          target: "_blank",
          rel: "noreferrer noopener",
          className: "inline-flex items-center gap-1.5 text-xs text-[color:var(--c-text-muted)] transition-colors hover:text-[color:var(--c-accent)]",
          children: [
            /* @__PURE__ */ jsx(BookOpen, { className: "h-3.5 w-3.5" }),
            " arXiv"
          ]
        }
      )
    ] })
  ] }) });
}
function Research() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["research"],
    queryFn: researchApi.getAll
  });
  const papers = data ?? [];
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "research",
      "aria-labelledby": "research-title",
      className: "mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8",
      children: [
        /* @__PURE__ */ jsx(
          SectionHeading,
          {
            index: "03",
            title: "Research",
            subtitle: "Peer-reviewed papers and ongoing investigations."
          }
        ),
        /* @__PURE__ */ jsx("span", { id: "research-title", className: "sr-only", children: "Research papers" }),
        isLoading && /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-[color:var(--c-text-dim)]", children: "// loading research papers..." }),
        isError && /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-[color:var(--c-text-dim)]", children: "// failed to load research papers" }),
        !isLoading && !isError && papers.length === 0 && /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-[color:var(--c-text-dim)]", children: "// no research papers added yet" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-2", children: papers.map((p, i) => /* @__PURE__ */ jsx(PaperCard, { paper: p, idx: i }, p._id)) })
      ]
    }
  );
}
function Skills() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["skills"],
    queryFn: skillsApi.getAll
  });
  const skills = data ?? [];
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "skills",
      "aria-labelledby": "skills-title",
      className: "relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8",
      children: [
        /* @__PURE__ */ jsx(
          SectionHeading,
          {
            index: "04",
            title: "Skills",
            subtitle: "The stack I reach for — daily-driver tools and battle-tested favorites."
          }
        ),
        /* @__PURE__ */ jsx("span", { id: "skills-title", className: "sr-only", children: "Skills" }),
        isLoading && /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-[color:var(--c-text-dim)]", children: "// loading skills..." }),
        isError && /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-[color:var(--c-text-dim)]", children: "// failed to load skills" }),
        !isLoading && !isError && skills.length === 0 && /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-[color:var(--c-text-dim)]", children: "// no skills added yet" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3", children: skills.map((group, gi) => /* @__PURE__ */ jsx(Reveal, { delay: gi * 60, children: /* @__PURE__ */ jsxs("div", { className: "glass-card hover-neon-blue scan-line h-full rounded-md p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold tracking-tight text-[color:var(--c-text)]", children: group.category }),
            /* @__PURE__ */ jsxs("span", { className: "font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--c-accent)]", children: [
              "/0",
              gi + 1
            ] })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "mt-5 flex flex-wrap gap-2", children: group.items.map((s) => /* @__PURE__ */ jsx(
            "li",
            {
              className: "rounded border border-[color:var(--c-border-strong)] bg-[color:var(--c-surface-2)] px-2.5 py-1 font-mono text-xs text-[color:var(--c-text)]",
              children: s.name
            },
            s.name
          )) })
        ] }) }, group.category)) })
      ]
    }
  );
}
function Experience() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["experience"],
    queryFn: experienceApi.getAll
  });
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: profileApi.getProfile
  });
  const experience = data ?? [];
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "experience",
      "aria-labelledby": "experience-title",
      className: "mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8",
      children: [
        /* @__PURE__ */ jsx(
          SectionHeading,
          {
            index: "05",
            title: "Experience",
            subtitle: "Where I've shipped, broken, and rebuilt."
          }
        ),
        /* @__PURE__ */ jsx("span", { id: "experience-title", className: "sr-only", children: "Experience" }),
        isLoading && /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-[color:var(--c-text-dim)]", children: "// loading experience..." }),
        isError && /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-[color:var(--c-text-dim)]", children: "// failed to load experience" }),
        !isLoading && !isError && experience.length === 0 && /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-[color:var(--c-text-dim)]", children: "// no experience added yet" }),
        /* @__PURE__ */ jsx("ol", { className: "timeline-electric relative space-y-6 border-l border-[color:var(--c-border-strong)] pl-6 sm:pl-8", children: experience.map((e, idx) => /* @__PURE__ */ jsxs(Reveal, { as: "li", delay: idx * 80, children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              "aria-hidden": "true",
              className: "absolute -left-[5px] mt-6 h-2.5 w-2.5 rounded-full bg-[color:var(--c-accent)] ring-4 ring-[color:var(--c-bg)]"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "glass-card hover-neon-blue scan-line rounded-md p-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold tracking-tight text-[color:var(--c-text)]", children: e.role }),
                /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-sm font-medium text-[color:var(--c-accent)]", children: e.company })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-right font-mono text-[11px]", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[color:var(--c-text-muted)]", children: e.duration }),
                /* @__PURE__ */ jsx("p", { className: "mt-1 inline-block rounded border border-[color:var(--c-border-strong)] bg-[color:var(--c-surface-2)] px-1.5 py-0.5 text-[color:var(--c-text-dim)]", children: e.type })
              ] })
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-2 text-sm text-[color:var(--c-text-muted)]", children: e.bullets.map((b, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2.5", children: [
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--c-text-dim)]" }),
              /* @__PURE__ */ jsx("span", { children: b })
            ] }, i)) })
          ] })
        ] }, e._id)) }),
        /* @__PURE__ */ jsx("div", { className: "mt-12 flex justify-center", children: /* @__PURE__ */ jsxs("a", { href: profile?.resumeUrl ?? "#", download: true, className: "btn-primary", children: [
          /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }),
          "Download Full Resume"
        ] }) })
      ]
    }
  );
}
function Contact() {
  const [sent, setSent] = useState(false);
  const {
    data: profile,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["profile"],
    queryFn: profileApi.getProfile
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  async function onSubmit(e) {
    e.preventDefault();
    setSubmitError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
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
    return /* @__PURE__ */ jsx(
      "section",
      {
        id: "contact",
        className: "mx-auto max-w-7xl px-4 py-24 text-center font-mono text-sm text-[color:var(--c-text-dim)] sm:px-6 lg:px-8",
        children: "// loading profile..."
      }
    );
  }
  if (isError || !profile) {
    return /* @__PURE__ */ jsx(
      "section",
      {
        id: "contact",
        className: "mx-auto max-w-7xl px-4 py-24 text-center font-mono text-sm text-destructive sm:px-6 lg:px-8",
        children: "// failed to load profile"
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "contact",
      "aria-labelledby": "contact-title",
      className: "relative isolate mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": "true",
            className: "absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-screen -z-10 bg-[#0A0A0F]"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": "true",
            className: "absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-screen -z-10 opacity-[0.03]",
            style: {
              backgroundImage: "linear-gradient(rgba(0,255,135,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          SectionHeading,
          {
            index: "06",
            title: "Contact",
            subtitle: "Have an idea, a role, or just want to nerd out? Drop a line."
          }
        ),
        /* @__PURE__ */ jsx("span", { id: "contact-title", className: "sr-only", children: "Contact" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]", children: [
          /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs(
            "form",
            {
              onSubmit,
              className: "glass-card rounded-md p-6 sm:p-8",
              "aria-label": "Contact form",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2", children: [
                  /* @__PURE__ */ jsx(Field, { label: "Name", name: "name", type: "text", required: true }),
                  /* @__PURE__ */ jsx(Field, { label: "Email", name: "email", type: "email", required: true })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsx(Field, { label: "Subject", name: "subject", type: "text", required: true }) }),
                /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-[color:var(--c-text-muted)]", children: "Message" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      name: "message",
                      required: true,
                      rows: 5,
                      className: "mt-2 w-full rounded-md border border-[color:var(--c-border-strong)] bg-[color:var(--c-surface-2)] px-3 py-2.5 text-sm text-[color:var(--c-text)] placeholder:text-[color:var(--c-text-dim)] focus:border-[color:var(--c-accent)] focus:outline-none"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("button", { type: "submit", disabled: submitting, className: "mt-6 btn-primary pulse-glow disabled:opacity-50", children: [
                  /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }),
                  " ",
                  submitting ? "Sending..." : sent ? "Sent — I'll reply soon" : "Send message"
                ] }),
                submitError && /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-destructive", role: "alert", children: submitError })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(Reveal, { delay: 120, children: /* @__PURE__ */ jsxs("aside", { className: "glass-card h-full rounded-md p-6 sm:p-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--c-text-dim)]", children: "Find me" }),
            /* @__PURE__ */ jsxs("ul", { className: "mt-5 space-y-4 text-sm", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx(Mail, { className: "mt-0.5 h-4 w-4 text-[color:var(--c-text-dim)]" }),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: profile.socials.email,
                    className: "text-[color:var(--c-text)] transition-colors hover:text-[color:var(--c-accent)]",
                    children: profile.email
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "mt-0.5 h-4 w-4 text-[color:var(--c-text-dim)]" }),
                /* @__PURE__ */ jsx("span", { className: "text-[color:var(--c-text-muted)]", children: profile.location })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx(Sparkles, { className: "mt-0.5 h-4 w-4 text-[color:var(--c-text-dim)]" }),
                /* @__PURE__ */ jsxs("span", { className: "text-[color:var(--c-text-muted)]", children: [
                  "Available for: ",
                  profile.availability
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 border-t border-[color:var(--c-border)] pt-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--c-text-dim)]", children: "Elsewhere" }),
              /* @__PURE__ */ jsx("ul", { className: "mt-4 flex gap-2", children: [
                { href: profile.socials.github, Icon: Github, label: "GitHub" },
                { href: profile.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
                { href: profile.socials.twitter, Icon: Twitter, label: "Twitter" },
                { href: profile.socials.email, Icon: Mail, label: "Email" }
              ].map(({ href, Icon, label }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                "a",
                {
                  href,
                  target: "_blank",
                  rel: "noreferrer noopener",
                  "aria-label": label,
                  className: "flex h-9 w-9 items-center justify-center rounded-md border border-[color:var(--c-border-strong)] text-[color:var(--c-text-muted)] transition-colors hover:border-[color:var(--c-accent)] hover:text-[color:var(--c-text)]",
                  children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" })
                }
              ) }, label)) })
            ] })
          ] }) })
        ] })
      ]
    }
  );
}
function Field({
  label,
  name,
  type,
  required
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-[color:var(--c-text-muted)]", children: label }),
    /* @__PURE__ */ jsx(
      "input",
      {
        name,
        type,
        required,
        className: "mt-2 w-full rounded-md border border-[color:var(--c-border-strong)] bg-[color:var(--c-surface-2)] px-3 py-2.5 text-sm text-[color:var(--c-text)] placeholder:text-[color:var(--c-text-dim)] focus:border-[color:var(--c-accent)] focus:outline-none"
      }
    )
  ] });
}
function Footer() {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: profileApi.getProfile
  });
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-[color:var(--c-border)] px-4 py-8 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[color:var(--c-text-dim)]", children: [
    /* @__PURE__ */ jsxs("p", { children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " ",
      profile?.name ?? "...",
      ". Built with care & caffeine."
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[color:var(--c-accent)]" }),
      "coded by hand",
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/admin/login",
          "aria-label": "Admin",
          className: "ml-2 opacity-40 transition-opacity hover:opacity-100 hover:text-[color:var(--c-accent)]",
          children: "</>"
        }
      )
    ] })
  ] }) });
}
function Index() {
  const {
    data,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["all"],
    queryFn: allApi.getAll,
    staleTime: 5 * 60 * 1e3
    // treat data as fresh for 5 min (matches backend cache TTL)
  });
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-dvh bg-[color:var(--c-bg)] text-[color:var(--c-text)] antialiased", children: [
    /* @__PURE__ */ jsx(CursorTrail, {}),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(Hero, { profile: data?.profile, isLoading, isError }),
      /* @__PURE__ */ jsx(Projects, { projects: data?.projects, isLoading, isError }),
      /* @__PURE__ */ jsx(Hackathons, { hackathons: data?.hackathons, isLoading, isError }),
      /* @__PURE__ */ jsx(Research, { research: data?.research, isLoading, isError }),
      /* @__PURE__ */ jsx(Skills, { skills: data?.skills, isLoading, isError }),
      /* @__PURE__ */ jsx(Experience, { experience: data?.experience, isLoading, isError }),
      /* @__PURE__ */ jsx(Contact, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, { profile: data?.profile })
  ] });
}
export {
  Index as component
};
