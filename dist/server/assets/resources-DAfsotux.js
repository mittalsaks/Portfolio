import { b as apiRequest, c as createCrudApi } from "./CursorTrail-BFdyBvhh.js";
const projectsApi = createCrudApi("projects");
const skillsApi = createCrudApi("skills");
const experienceApi = createCrudApi("experience");
const hackathonsApi = createCrudApi("hackathons");
const researchApi = createCrudApi("research");
const profileApi = {
  getProfile: () => apiRequest("/profile").then(
    (r) => r.data
  ),
  updateProfile: (payload) => apiRequest("/profile", {
    method: "PUT",
    body: JSON.stringify(payload)
  }).then((r) => r.data)
};
const contactApi = {
  submit: (payload) => apiRequest("/contact", {
    method: "POST",
    body: JSON.stringify(payload)
  })
};
export {
  projectsApi as a,
  contactApi as c,
  experienceApi as e,
  hackathonsApi as h,
  profileApi as p,
  researchApi as r,
  skillsApi as s
};
