// [REPLACE WITH YOUR DATA] — All content below is placeholder. Swap freely.

export const profile = {
  name: "Alex Doe", // [REPLACE WITH YOUR NAME]
  handle: "alexdoe", // [REPLACE WITH YOUR HANDLE]
  roles: [
    "Full Stack Developer",
    "Problem Solver",
    "Open Source Contributor",
  ], // [REPLACE WITH YOUR ROLES]
  tagline:
    "I design and ship resilient web, mobile, and backend systems — from idea to scale.", // [REPLACE WITH YOUR TAGLINE]
  email: "hello@alexdoe.dev", // [REPLACE WITH YOUR EMAIL]
  location: "Bengaluru, India", // [REPLACE WITH YOUR CITY]
  availability: "Freelance · Full-time · Collaborations", // [REPLACE WITH YOUR AVAILABILITY]
  resumeUrl: "/resume.pdf", // [REPLACE: drop your resume.pdf in /public/]
  socials: {
    github: "https://github.com/your-handle", // [REPLACE]
    linkedin: "https://linkedin.com/in/your-handle", // [REPLACE]
    twitter: "https://twitter.com/your-handle", // [REPLACE]
    email: "mailto:hello@alexdoe.dev", // [REPLACE]
  },
};

export type ProjectCategory = "Web" | "Mobile" | "API/Backend";

export interface Project {
  title: string;
  description: string;
  category: ProjectCategory;
  tech: string[];
  github?: string;
  demo?: string;
  image: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Nebula Analytics", // [REPLACE]
    description:
      "Realtime product analytics dashboard with sub-second query latency on 1B+ events.",
    category: "Web",
    tech: ["React", "TypeScript", "ClickHouse", "Tailwind"],
    github: "https://github.com/your-handle/nebula",
    demo: "https://nebula.example.com",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70",
    featured: true,
  },
  {
    title: "Pulse Mobile",
    description: "Cross-platform fitness companion with offline-first sync and HealthKit/Fit APIs.",
    category: "Mobile",
    tech: ["React Native", "Expo", "SQLite", "Zustand"],
    github: "https://github.com/your-handle/pulse",
    demo: "https://pulse.example.com",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=70",
    featured: true,
  },
  {
    title: "Forge API Gateway",
    description: "High-throughput API gateway with declarative routing, mTLS, and OpenTelemetry.",
    category: "API/Backend",
    tech: ["Go", "gRPC", "Redis", "Postgres"],
    github: "https://github.com/your-handle/forge",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=70",
    featured: true,
  },
  {
    title: "Aurora CMS",
    description: "Headless CMS with live previews, edge caching, and pluggable content models.",
    category: "Web",
    tech: ["Next.js", "tRPC", "Prisma", "PlanetScale"],
    github: "https://github.com/your-handle/aurora",
    demo: "https://aurora.example.com",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=70",
  },
  {
    title: "Echo Push",
    description: "Self-hosted push notification service with topic fan-out and retries.",
    category: "API/Backend",
    tech: ["Rust", "Tokio", "NATS", "Postgres"],
    github: "https://github.com/your-handle/echo",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=70",
  },
  {
    title: "Loop Wallet",
    description: "Mobile crypto wallet with hardware-backed keys and biometric auth.",
    category: "Mobile",
    tech: ["Swift", "Kotlin", "Rust FFI"],
    demo: "https://loop.example.com",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=70",
  },
];

export interface Hackathon {
  name: string;
  award: string; // e.g. "🏆 Winner"
  project: string;
  tech: string[];
  team: number;
  date: string;
}

export const hackathons: Hackathon[] = [
  {
    name: "HackMIT 2024", // [REPLACE]
    award: "🏆 Grand Prize",
    project: "Synapse — AI pair-tutor for CS undergrads",
    tech: ["Next.js", "OpenAI", "Pinecone"],
    team: 4,
    date: "Sep 2024",
  },
  {
    name: "ETHGlobal Bangalore",
    award: "🥈 Runner-up",
    project: "ChainMail — encrypted on-chain messaging",
    tech: ["Solidity", "wagmi", "IPFS"],
    team: 3,
    date: "Aug 2024",
  },
  {
    name: "Smart India Hackathon",
    award: "🏆 Winner — Govt. Track",
    project: "GreenRoute — emissions-aware logistics",
    tech: ["React", "FastAPI", "Postgres"],
    team: 6,
    date: "Dec 2023",
  },
  {
    name: "PennApps XXIV",
    award: "🥉 Best Hardware Hack",
    project: "Hum — gestural music controller",
    tech: ["Arduino", "WebMIDI", "React"],
    team: 4,
    date: "Sep 2023",
  },
];

export interface Paper {
  title: string;
  authors: string;
  venue: string;
  year: number;
  abstract: string;
  tags: string[];
  pdfUrl?: string;
  scholarUrl?: string;
  arxivUrl?: string;
}

export const papers: Paper[] = [
  {
    title: "Adaptive Sharding for Vector Indexes at Edge Scale", // [REPLACE]
    authors: "A. Doe, R. Patel, M. Lin",
    venue: "VLDB",
    year: 2024,
    abstract:
      "We present a runtime-adaptive sharding strategy for HNSW-style vector indexes that reduces tail latency by 38% on geo-distributed workloads. Our approach leverages query-locality signals to repartition shards online without rebuilding the global graph.",
    tags: ["Systems", "AI/ML"],
    pdfUrl: "#",
    scholarUrl: "#",
    arxivUrl: "#",
  },
  {
    title: "TypeFlow: Gradual Effects for TypeScript",
    authors: "A. Doe, S. Iyer",
    venue: "ICFP",
    year: 2023,
    abstract:
      "TypeFlow adds a lightweight effect system to TypeScript via a structural row-polymorphism encoding, enabling progressive adoption without changes to the host compiler.",
    tags: ["PL", "Web"],
    pdfUrl: "#",
    arxivUrl: "#",
  },
  {
    title: "Causal Replays for Distributed Test Determinism",
    authors: "A. Doe, J. Kim, F. Alvarez",
    venue: "OSDI",
    year: 2022,
    abstract:
      "A practical record-and-replay framework that captures causal cross-service dependencies and replays them deterministically in CI, surfacing 3x more flaky-test root causes.",
    tags: ["Systems"],
    pdfUrl: "#",
    scholarUrl: "#",
  },
];

export interface SkillGroup {
  category: string;
  items: { name: string; level: number }[]; // level 0–100
}

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Next.js", level: 88 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 90 },
      { name: "Go", level: 80 },
      { name: "Rust", level: 65 },
      { name: "GraphQL", level: 78 },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", level: 88 },
      { name: "Redis", level: 82 },
      { name: "ClickHouse", level: 70 },
      { name: "MongoDB", level: 75 },
    ],
  },
  {
    category: "DevOps & Tools",
    items: [
      { name: "Docker", level: 90 },
      { name: "Kubernetes", level: 78 },
      { name: "AWS", level: 80 },
      { name: "Terraform", level: 70 },
    ],
  },
  {
    category: "Languages",
    items: [
      { name: "TypeScript", level: 92 },
      { name: "Python", level: 85 },
      { name: "Go", level: 80 },
      { name: "Rust", level: 65 },
    ],
  },
];

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  type: "Full-time" | "Internship" | "Freelance" | "Contract";
  bullets: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: "Vector Labs", // [REPLACE]
    role: "Senior Full Stack Engineer",
    duration: "2023 — Present",
    type: "Full-time",
    bullets: [
      "Led migration of monolith to event-driven microservices, cutting p99 latency 42%.",
      "Designed multi-tenant billing service handling $9M ARR.",
      "Mentored 4 engineers; introduced trunk-based dev + preview envs.",
    ],
  },
  {
    company: "Helix Studio",
    role: "Full Stack Engineer",
    duration: "2021 — 2023",
    type: "Full-time",
    bullets: [
      "Shipped the v2 React Native app used by 1.2M monthly users.",
      "Owned the GraphQL API and CI pipelines across 6 client teams.",
      "Built realtime collab editor with CRDTs.",
    ],
  },
  {
    company: "Indie Clients",
    role: "Freelance Engineer",
    duration: "2020 — 2021",
    type: "Freelance",
    bullets: [
      "Delivered 9 production projects for early-stage startups.",
      "Specialized in payments, auth, and rapid MVP scaffolding.",
    ],
  },
  {
    company: "Northwind Inc.",
    role: "Software Engineering Intern",
    duration: "Summer 2019",
    type: "Internship",
    bullets: [
      "Built internal feature-flag service used by 30+ teams.",
      "Cut deploy times from 14m → 3m via Bazel remote caching.",
    ],
  },
];
