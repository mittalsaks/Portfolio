import { apiRequest, createCrudApi } from "./client";
import type { Project, Skill, Experience, Hackathon, ResearchPaper, Profile } from "./types";

export const projectsApi = createCrudApi<Project>("projects");
export const skillsApi = createCrudApi<Skill>("skills");
export const experienceApi = createCrudApi<Experience>("experience");
export const hackathonsApi = createCrudApi<Hackathon>("hackathons");

// NOTE: backend model is named "Research" (mongoose.model("Research", ...)),
// not "ResearchPaper" — confirm the mount path in app.js/researchRoutes.js
// matches "research" before relying on this. If the route is actually
// mounted at /api/researchpapers, change the string below to match.
export const researchApi = createCrudApi<ResearchPaper>("research");

// Profile is a singleton (one document, not a list), so it does NOT use
// createCrudApi — there's no getAll/create/delete for it, only
// getProfile (GET /api/profile) and updateProfile (PUT /api/profile).
// Response shape from profileController.js matches the same
// { success, data } shape as the other resources, so we unwrap .data
// the same way createCrudApi does internally.
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
// Contact form — public POST only, no list/get/delete needed on the frontend.
// Response shape from contactController.js: { success, message, data: { id } }
export const contactApi = {
  submit: (payload: { name: string; email: string; subject: string; message: string }) =>
    apiRequest<{ success: boolean; message: string; data: { id: string } }>("/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};