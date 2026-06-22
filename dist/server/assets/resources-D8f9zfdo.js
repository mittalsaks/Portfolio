import { b as apiRequest, c as createCrudApi } from "./CursorTrail-q_7RbpRR.js";
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
const allApi = {
  getAll: () => apiRequest("/all").then((r) => r.data)
};
export {
  projectsApi as a,
  allApi as b,
  contactApi as c,
  experienceApi as e,
  hackathonsApi as h,
  profileApi as p,
  researchApi as r,
  skillsApi as s
};
