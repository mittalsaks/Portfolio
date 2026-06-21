// These interfaces mirror the backend Mongoose schemas field-for-field.
// Keep them in sync manually whenever a model changes on the backend.

export interface Project {
  _id: string;
  title: string;
  description: string;
  category: "Web" | "Mobile" | "API-Backend";
  tech: string[];
  github: string;
  demo: string;
  image: string;
  featured: boolean;
  notesUrl: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface SkillItem {
  name: string;
}

export interface Skill {
  _id: string;
  category:
    | "Frontend"
    | "Backend"
    | "Databases"
    | "DevOps & Tools"
    | "Languages"
    | "Frameworks & Libraries"
    | "Tools & Platforms";
  items: SkillItem[];
  notesUrl: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  _id: string;
  company: string;
  role: string;
  duration: string;
  type: "Full-time" | "Internship" | "Freelance" | "Contract";
  bullets: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Hackathon {
  _id: string;
  name: string;
  award: string;
  project: string;
  description: string;
  tech: string[];
  team: number;
  date: string;
  github: string;
  demo: string;
  notesUrl: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResearchPaper {
  _id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  abstract: string;
  tags: string[];
  pdfUrl: string;
  scholarUrl: string;
  arxivUrl: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileSocials {
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
}

export interface Profile {
  _id: string;
  name: string;
  handle: string;
  roles: string[];
  tagline: string;
  email: string;
  location: string;
  availability: string;
  resumeUrl: string;
  socials: ProfileSocials;
  createdAt: string;
  updatedAt: string;
}