import { apiRequest, createCrudApi } from "./client";
import type { Project, Skill, Experience, Hackathon, ResearchPaper, Profile } from "./types";

export const projectsApi = createCrudApi<Project>("projects");
export const skillsApi = createCrudApi<Skill>("skills");
export const experienceApi = createCrudApi<Experience>("experience");
export const hackathonsApi = createCrudApi<Hackathon>("hackathons");
export const researchApi = createCrudApi<ResearchPaper>("research");

export const profileApi = {
  getProfile: () =>
    apiRequest<{ success: boolean; data: Profile }>("/profile").then(
      (r) => r.data
    ),
  updateProfile: (payload: Partial<Profile>) =>
    apiRequest<{ success: boolean; data: Profile }>("/profile", {
      method: "PUT",
      body: JSON.stringify(payload),
    }).then((r) => r.data),
};

export const contactApi = {
  submit: (payload: { name: string; email: string; subject: string; message: string }) =>
    apiRequest<{ success: boolean; message: string; data: { id: string } }>("/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

// ── Single combined fetch — replaces 6 individual calls on page load ──────────
export interface AllData {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  hackathons: Hackathon[];
  research: ResearchPaper[];
}

export const allApi = {
  getAll: () =>
    apiRequest<{ success: boolean; data: AllData }>("/all").then((r) => r.data),
};