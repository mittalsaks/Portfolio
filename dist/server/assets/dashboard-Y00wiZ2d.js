import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { a as authApi, C as CursorTrail, A as ApiError } from "./CursorTrail-q_7RbpRR.js";
import { p as profileApi, a as projectsApi, s as skillsApi, e as experienceApi, h as hackathonsApi, r as researchApi } from "./resources-D8f9zfdo.js";
function AdminDashboard() {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState("projects");
  const [showChangePassword, setShowChangePassword] = useState(false);
  useEffect(() => {
    authApi.me().catch(() => {
      navigate({
        to: "/admin/login"
      });
    }).finally(() => setCheckingAuth(false));
  }, [navigate]);
  const handleLogout = async () => {
    await authApi.logout().catch(() => {
    });
    navigate({
      to: "/admin/login"
    });
  };
  if (checkingAuth) {
    return /* @__PURE__ */ jsx("div", { className: "grid-bg flex min-h-dvh items-center justify-center bg-background font-mono text-sm text-[color:var(--c-accent)]", children: "$ checking session..." });
  }
  const tabs = [{
    id: "profile",
    label: "Profile"
  }, {
    id: "projects",
    label: "Projects"
  }, {
    id: "skills",
    label: "Skills"
  }, {
    id: "experience",
    label: "Experience"
  }, {
    id: "hackathons",
    label: "Hackathons"
  }, {
    id: "research",
    label: "Research"
  }];
  return /* @__PURE__ */ jsxs("div", { className: "grid-bg min-h-dvh w-full bg-background px-4 py-8 text-foreground", children: [
    /* @__PURE__ */ jsx(CursorTrail, {}),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "glass-card mb-6 flex items-center justify-between rounded-2xl px-6 py-4", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-mono text-xl font-bold text-gradient-neon", children: "Admin Dashboard" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => setShowChangePassword(true), className: "hover-neon-blue rounded-lg border border-white/10 px-3 py-1.5 font-mono text-sm text-muted-foreground", children: "Change Password" }),
          /* @__PURE__ */ jsx("button", { onClick: handleLogout, className: "hover-neon-blue rounded-lg border border-white/10 px-3 py-1.5 font-mono text-sm text-muted-foreground", children: "Log out" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "glass-card mb-6 flex gap-1 rounded-xl p-1.5", children: tabs.map((tab) => /* @__PURE__ */ jsx("button", { onClick: () => setActiveTab(tab.id), className: `rounded-lg px-3 py-2 font-mono text-sm transition-all ${activeTab === tab.id ? "neon-glow-blue bg-[color:var(--c-accent)]/10 text-[color:var(--c-accent)]" : "text-muted-foreground hover:text-foreground"}`, children: tab.label }, tab.id)) }),
      activeTab === "profile" && /* @__PURE__ */ jsx(ProfilePanel, {}),
      activeTab === "projects" && /* @__PURE__ */ jsx(ProjectsPanel, {}),
      activeTab === "skills" && /* @__PURE__ */ jsx(SkillsPanel, {}),
      activeTab === "experience" && /* @__PURE__ */ jsx(ExperiencePanel, {}),
      activeTab === "hackathons" && /* @__PURE__ */ jsx(HackathonsPanel, {}),
      activeTab === "research" && /* @__PURE__ */ jsx(ResearchPanel, {}),
      showChangePassword && /* @__PURE__ */ jsx(ChangePasswordModal, { onClose: () => setShowChangePassword(false) })
    ] })
  ] });
}
function SkillsPanel() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptySkill);
  const [saving, setSaving] = useState(false);
  const loadSkills = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await skillsApi.getAll();
      setSkills(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load skills.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadSkills();
  }, []);
  const resetForm = () => {
    setForm(emptySkill);
    setEditingId(null);
  };
  const startEdit = (skill) => {
    setForm(skill);
    setEditingId(skill._id);
  };
  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items ?? [], {
        name: ""
      }]
    });
  };
  const removeItem = (index) => {
    setForm({
      ...form,
      items: (form.items ?? []).filter((_, i) => i !== index)
    });
  };
  const updateItem = (index, field, value) => {
    const items = [...form.items ?? []];
    items[index] = {
      ...items[index],
      [field]: value
    };
    setForm({
      ...form,
      items
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (editingId) {
        await skillsApi.update(editingId, form);
      } else {
        await skillsApi.create(form);
      }
      resetForm();
      await loadSkills();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save skill group.");
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this skill category? This can't be undone.")) return;
    try {
      await skillsApi.remove(id);
      await loadSkills();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete skill group.");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-8 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h2", { className: "mb-3 font-mono text-sm text-[color:var(--c-accent)]", children: [
        "$ existing-skills ",
        loading && "(loading...)"
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "mb-3 text-sm text-destructive", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        skills.map((s) => /* @__PURE__ */ jsxs("div", { className: "glass-card hover-neon-blue rounded-xl px-4 py-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: s.category }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx("button", { onClick: () => startEdit(s), className: "text-xs font-mono text-[color:var(--c-accent)] hover:underline", children: "Edit" }),
              /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(s._id), className: "text-xs font-mono text-destructive hover:underline", children: "Delete" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: s.items.map((i) => i.name).join(", ") || "No items" })
        ] }, s._id)),
        !loading && skills.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No skill categories yet." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "glass-card rounded-2xl p-6", children: [
      /* @__PURE__ */ jsxs("h2", { className: "mb-3 font-mono text-sm text-[color:var(--c-accent)]", children: [
        "$ ",
        editingId ? "edit-skill-category" : "add-skill-category"
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("select", { value: form.category ?? "Frontend", onChange: (e) => setForm({
          ...form,
          category: e.target.value
        }), className: "w-full admin-input", children: [
          /* @__PURE__ */ jsx("option", { value: "Frontend", children: "Frontend" }),
          /* @__PURE__ */ jsx("option", { value: "Backend", children: "Backend" }),
          /* @__PURE__ */ jsx("option", { value: "Databases", children: "Databases" }),
          /* @__PURE__ */ jsx("option", { value: "DevOps & Tools", children: "DevOps & Tools" }),
          /* @__PURE__ */ jsx("option", { value: "Languages", children: "Languages" }),
          /* @__PURE__ */ jsx("option", { value: "Frameworks & Libraries", children: "Frameworks & Libraries" }),
          /* @__PURE__ */ jsx("option", { value: "Tools & Platforms", children: "Tools & Platforms" })
        ] }),
        /* @__PURE__ */ jsx("input", { type: "number", placeholder: "Order", value: form.order ?? 0, onChange: (e) => setForm({
          ...form,
          order: Number(e.target.value)
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Skill items" }),
          (form.items ?? []).map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx("input", { placeholder: "Skill name (e.g. React)", value: item.name, onChange: (e) => updateItem(index, "name", e.target.value), required: true, className: "flex-1 admin-input" }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeItem(index), className: "rounded-lg border border-white/10 px-3 text-xs text-destructive hover:bg-white/5", children: "✕" })
          ] }, index)),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: addItem, className: "w-full rounded-lg border border-dashed border-white/20 px-3 py-2 text-xs text-muted-foreground hover:bg-white/5", children: "+ Add skill item" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: saving, className: "btn-primary disabled:opacity-50", children: saving ? "Saving..." : editingId ? "Update Category" : "Add Category" }),
          editingId && /* @__PURE__ */ jsx("button", { type: "button", onClick: resetForm, className: "rounded-lg border border-white/10 px-4 py-2 font-mono text-sm text-muted-foreground hover:bg-white/5", children: "Cancel" })
        ] })
      ] })
    ] })
  ] });
}
function ProfilePanel() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({});
  const [rolesInput, setRolesInput] = useState("");
  const [saving, setSaving] = useState(false);
  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await profileApi.getProfile();
      setProfile(data);
      setForm(data);
      setRolesInput(data.roles.join(", "));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    const payload = {
      ...form,
      roles: rolesInput.split(",").map((r) => r.trim()).filter(Boolean)
    };
    try {
      const updated = await profileApi.updateProfile(payload);
      setProfile(updated);
      setForm(updated);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "$ loading profile..." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "glass-card mx-auto max-w-xl rounded-2xl p-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-3 font-mono text-sm text-[color:var(--c-accent)]", children: "$ edit-profile" }),
    error && /* @__PURE__ */ jsx("p", { className: "mb-3 text-sm text-destructive", children: error }),
    success && /* @__PURE__ */ jsx("p", { className: "mb-3 text-sm text-[color:var(--c-accent)]", children: "Profile updated successfully." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
      /* @__PURE__ */ jsx("input", { placeholder: "Name", value: form.name ?? "", onChange: (e) => setForm({
        ...form,
        name: e.target.value
      }), required: true, className: "w-full admin-input" }),
      /* @__PURE__ */ jsx("input", { placeholder: "Handle (e.g. @sakshimittal)", value: form.handle ?? "", onChange: (e) => setForm({
        ...form,
        handle: e.target.value
      }), className: "w-full admin-input" }),
      /* @__PURE__ */ jsx("input", { placeholder: "Roles (comma separated, e.g. Full Stack Developer, Student)", value: rolesInput, onChange: (e) => setRolesInput(e.target.value), className: "w-full admin-input" }),
      /* @__PURE__ */ jsx("textarea", { placeholder: "Tagline", value: form.tagline ?? "", onChange: (e) => setForm({
        ...form,
        tagline: e.target.value
      }), rows: 2, className: "w-full admin-input" }),
      /* @__PURE__ */ jsx("input", { placeholder: "Email", value: form.email ?? "", onChange: (e) => setForm({
        ...form,
        email: e.target.value
      }), className: "w-full admin-input" }),
      /* @__PURE__ */ jsx("input", { placeholder: "Location", value: form.location ?? "", onChange: (e) => setForm({
        ...form,
        location: e.target.value
      }), className: "w-full admin-input" }),
      /* @__PURE__ */ jsx("input", { placeholder: "Availability (e.g. Open to internships)", value: form.availability ?? "", onChange: (e) => setForm({
        ...form,
        availability: e.target.value
      }), className: "w-full admin-input" }),
      /* @__PURE__ */ jsx("input", { placeholder: "Resume URL", value: form.resumeUrl ?? "", onChange: (e) => setForm({
        ...form,
        resumeUrl: e.target.value
      }), className: "w-full admin-input" }),
      /* @__PURE__ */ jsx("p", { className: "pt-2 text-xs text-muted-foreground", children: "Socials" }),
      /* @__PURE__ */ jsx("input", { placeholder: "GitHub URL", value: form.socials?.github ?? "", onChange: (e) => setForm({
        ...form,
        socials: {
          ...form.socials ?? {
            github: "",
            linkedin: "",
            twitter: "",
            email: ""
          },
          github: e.target.value
        }
      }), className: "w-full admin-input" }),
      /* @__PURE__ */ jsx("input", { placeholder: "LinkedIn URL", value: form.socials?.linkedin ?? "", onChange: (e) => setForm({
        ...form,
        socials: {
          ...form.socials ?? {
            github: "",
            linkedin: "",
            twitter: "",
            email: ""
          },
          linkedin: e.target.value
        }
      }), className: "w-full admin-input" }),
      /* @__PURE__ */ jsx("input", { placeholder: "Twitter / X URL", value: form.socials?.twitter ?? "", onChange: (e) => setForm({
        ...form,
        socials: {
          ...form.socials ?? {
            github: "",
            linkedin: "",
            twitter: "",
            email: ""
          },
          twitter: e.target.value
        }
      }), className: "w-full admin-input" }),
      /* @__PURE__ */ jsx("input", { placeholder: "Contact email (for socials.email, can differ from main email)", value: form.socials?.email ?? "", onChange: (e) => setForm({
        ...form,
        socials: {
          ...form.socials ?? {
            github: "",
            linkedin: "",
            twitter: "",
            email: ""
          },
          email: e.target.value
        }
      }), className: "w-full admin-input" }),
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: saving, className: "btn-primary w-full disabled:opacity-50", children: saving ? "Saving..." : "Save Profile" })
    ] })
  ] });
}
const emptyProject = {
  title: "",
  description: "",
  category: "Web",
  tech: [],
  github: "",
  demo: "",
  image: "",
  notesUrl: "",
  featured: false,
  order: 0
};
const emptySkill = {
  category: "Frontend",
  items: [],
  notesUrl: "",
  order: 0
};
const emptyExperience = {
  company: "",
  role: "",
  duration: "",
  type: "Full-time",
  bullets: [],
  order: 0
};
const emptyHackathon = {
  name: "",
  award: "",
  project: "",
  description: "",
  tech: [],
  team: 1,
  date: "",
  github: "",
  demo: "",
  notesUrl: "",
  order: 0
};
const emptyResearch = {
  title: "",
  authors: "",
  venue: "",
  year: (/* @__PURE__ */ new Date()).getFullYear(),
  abstract: "",
  tags: [],
  pdfUrl: "",
  scholarUrl: "",
  arxivUrl: "",
  order: 0
};
function ProjectsPanel() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);
  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectsApi.getAll();
      setProjects(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadProjects();
  }, []);
  const resetForm = () => {
    setForm(emptyProject);
    setTechInput("");
    setEditingId(null);
  };
  const startEdit = (project) => {
    setForm(project);
    setTechInput(project.tech.join(", "));
    setEditingId(project._id);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      ...form,
      tech: techInput.split(",").map((t) => t.trim()).filter(Boolean)
    };
    try {
      if (editingId) {
        await projectsApi.update(editingId, payload);
      } else {
        await projectsApi.create(payload);
      }
      resetForm();
      await loadProjects();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save project.");
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this project? This can't be undone.")) return;
    try {
      await projectsApi.remove(id);
      await loadProjects();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete project.");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-8 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h2", { className: "mb-3 font-mono text-sm text-[color:var(--c-accent)]", children: [
        "$ existing-projects ",
        loading && "(loading...)"
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "mb-3 text-sm text-destructive", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        projects.map((p) => /* @__PURE__ */ jsxs("div", { className: "glass-card hover-neon-blue flex items-center justify-between rounded-xl px-4 py-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: p.title }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: p.category })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => startEdit(p), className: "text-xs font-mono text-[color:var(--c-accent)] hover:underline", children: "Edit" }),
            /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(p._id), className: "text-xs font-mono text-destructive hover:underline", children: "Delete" })
          ] })
        ] }, p._id)),
        !loading && projects.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No projects yet." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "glass-card rounded-2xl p-6", children: [
      /* @__PURE__ */ jsxs("h2", { className: "mb-3 font-mono text-sm text-[color:var(--c-accent)]", children: [
        "$ ",
        editingId ? "edit-project" : "add-project"
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
        /* @__PURE__ */ jsx("input", { placeholder: "Title", value: form.title ?? "", onChange: (e) => setForm({
          ...form,
          title: e.target.value
        }), required: true, className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("textarea", { placeholder: "Description", value: form.description ?? "", onChange: (e) => setForm({
          ...form,
          description: e.target.value
        }), required: true, rows: 3, className: "w-full admin-input" }),
        /* @__PURE__ */ jsxs("select", { value: form.category ?? "Web", onChange: (e) => setForm({
          ...form,
          category: e.target.value
        }), className: "w-full admin-input", children: [
          /* @__PURE__ */ jsx("option", { value: "Web", children: "Web" }),
          /* @__PURE__ */ jsx("option", { value: "Mobile", children: "Mobile" }),
          /* @__PURE__ */ jsx("option", { value: "API/Backend", children: "API/Backend" })
        ] }),
        /* @__PURE__ */ jsx("input", { placeholder: "Tech stack (comma separated, e.g. React, Node.js)", value: techInput, onChange: (e) => setTechInput(e.target.value), className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { placeholder: "GitHub URL", value: form.github ?? "", onChange: (e) => setForm({
          ...form,
          github: e.target.value
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { placeholder: "Demo URL (leave blank if none — e.g. hackathon IP-restricted project)", value: form.demo ?? "", onChange: (e) => setForm({
          ...form,
          demo: e.target.value
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { placeholder: "Image URL", value: form.image ?? "", onChange: (e) => setForm({
          ...form,
          image: e.target.value
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { placeholder: "Notes URL (optional — private link to project notes)", value: form.notesUrl ?? "", onChange: (e) => setForm({
          ...form,
          notesUrl: e.target.value
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: form.featured ?? false, onChange: (e) => setForm({
            ...form,
            featured: e.target.checked
          }) }),
          "Featured"
        ] }),
        /* @__PURE__ */ jsx("input", { type: "number", placeholder: "Order", value: form.order ?? 0, onChange: (e) => setForm({
          ...form,
          order: Number(e.target.value)
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { placeholder: "Notes URL (optional)", value: form.notesUrl ?? "", onChange: (e) => setForm({
          ...form,
          notesUrl: e.target.value
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: saving, className: "btn-primary disabled:opacity-50", children: saving ? "Saving..." : editingId ? "Update Category" : "Add Category" }),
          editingId && /* @__PURE__ */ jsx("button", { type: "button", onClick: resetForm, className: "rounded-lg border border-white/10 px-4 py-2 font-mono text-sm text-muted-foreground hover:bg-white/5", children: "Cancel" })
        ] })
      ] })
    ] })
  ] });
}
function ChangePasswordModal({
  onClose
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password don't match.");
      return;
    }
    setSaving(true);
    try {
      await authApi.changePassword(currentPassword, newPassword);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to change password.");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4", children: /* @__PURE__ */ jsxs("div", { className: "glass-card w-full max-w-sm rounded-2xl p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-mono text-sm text-[color:var(--c-accent)]", children: "$ change-password" }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "text-sm text-muted-foreground hover:text-foreground", children: "✕" })
    ] }),
    success ? /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-[color:var(--c-accent)]", children: "Password updated successfully. Please log in again with your new password." }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "w-full rounded-lg border border-white/10 px-4 py-2 font-mono text-sm text-muted-foreground hover:bg-white/5", children: "Close" })
    ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
      /* @__PURE__ */ jsx("input", { type: "password", placeholder: "Current password", value: currentPassword, onChange: (e) => setCurrentPassword(e.target.value), required: true, className: "w-full admin-input" }),
      /* @__PURE__ */ jsx("input", { type: "password", placeholder: "New password (min 6 characters)", value: newPassword, onChange: (e) => setNewPassword(e.target.value), required: true, className: "w-full admin-input" }),
      /* @__PURE__ */ jsx("input", { type: "password", placeholder: "Confirm new password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true, className: "w-full admin-input" }),
      error && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: saving, className: "btn-primary disabled:opacity-50", children: saving ? "Saving..." : "Update Password" }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, className: "rounded-lg border border-white/10 px-4 py-2 font-mono text-sm text-muted-foreground hover:bg-white/5", children: "Cancel" })
      ] })
    ] })
  ] }) });
}
function ExperiencePanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyExperience);
  const [bulletInput, setBulletInput] = useState("");
  const [saving, setSaving] = useState(false);
  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await experienceApi.getAll();
      setItems(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load experience.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);
  const resetForm = () => {
    setForm(emptyExperience);
    setBulletInput("");
    setEditingId(null);
  };
  const startEdit = (item) => {
    setForm(item);
    setBulletInput(item.bullets.join("\n"));
    setEditingId(item._id);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      ...form,
      bullets: bulletInput.split("\n").map((b) => b.trim()).filter(Boolean)
    };
    try {
      if (editingId) {
        await experienceApi.update(editingId, payload);
      } else {
        await experienceApi.create(payload);
      }
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save experience.");
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this experience entry? This can't be undone.")) return;
    try {
      await experienceApi.remove(id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete experience.");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-8 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h2", { className: "mb-3 font-mono text-sm text-[color:var(--c-accent)]", children: [
        "$ existing-experience ",
        loading && "(loading...)"
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "mb-3 text-sm text-destructive", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        items.map((item) => /* @__PURE__ */ jsx("div", { className: "glass-card hover-neon-blue rounded-xl px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium", children: [
              item.role,
              " @ ",
              item.company
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
              item.duration,
              " · ",
              item.type
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => startEdit(item), className: "text-xs font-mono text-[color:var(--c-accent)] hover:underline", children: "Edit" }),
            /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(item._id), className: "text-xs font-mono text-destructive hover:underline", children: "Delete" })
          ] })
        ] }) }, item._id)),
        !loading && items.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No experience entries yet." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "glass-card rounded-2xl p-6", children: [
      /* @__PURE__ */ jsxs("h2", { className: "mb-3 font-mono text-sm text-[color:var(--c-accent)]", children: [
        "$ ",
        editingId ? "edit-experience" : "add-experience"
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
        /* @__PURE__ */ jsx("input", { placeholder: "Company", value: form.company ?? "", onChange: (e) => setForm({
          ...form,
          company: e.target.value
        }), required: true, className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { placeholder: "Role", value: form.role ?? "", onChange: (e) => setForm({
          ...form,
          role: e.target.value
        }), required: true, className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { placeholder: "Duration (e.g. Jan 2024 - Present)", value: form.duration ?? "", onChange: (e) => setForm({
          ...form,
          duration: e.target.value
        }), required: true, className: "w-full admin-input" }),
        /* @__PURE__ */ jsxs("select", { value: form.type ?? "Full-time", onChange: (e) => setForm({
          ...form,
          type: e.target.value
        }), className: "w-full admin-input", children: [
          /* @__PURE__ */ jsx("option", { value: "Full-time", children: "Full-time" }),
          /* @__PURE__ */ jsx("option", { value: "Internship", children: "Internship" }),
          /* @__PURE__ */ jsx("option", { value: "Freelance", children: "Freelance" }),
          /* @__PURE__ */ jsx("option", { value: "Contract", children: "Contract" })
        ] }),
        /* @__PURE__ */ jsx("textarea", { placeholder: "Bullets (one point per line)", value: bulletInput, onChange: (e) => setBulletInput(e.target.value), rows: 4, className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { type: "number", placeholder: "Order", value: form.order ?? 0, onChange: (e) => setForm({
          ...form,
          order: Number(e.target.value)
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: saving, className: "btn-primary disabled:opacity-50", children: saving ? "Saving..." : editingId ? "Update Experience" : "Add Experience" }),
          editingId && /* @__PURE__ */ jsx("button", { type: "button", onClick: resetForm, className: "rounded-lg border border-white/10 px-4 py-2 font-mono text-sm text-muted-foreground hover:bg-white/5", children: "Cancel" })
        ] })
      ] })
    ] })
  ] });
}
function HackathonsPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyHackathon);
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);
  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await hackathonsApi.getAll();
      setItems(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load hackathons.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);
  const resetForm = () => {
    setForm(emptyHackathon);
    setTechInput("");
    setEditingId(null);
  };
  const startEdit = (item) => {
    setForm(item);
    setTechInput(item.tech.join(", "));
    setEditingId(item._id);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      ...form,
      tech: techInput.split(",").map((t) => t.trim()).filter(Boolean)
    };
    try {
      if (editingId) {
        await hackathonsApi.update(editingId, payload);
      } else {
        await hackathonsApi.create(payload);
      }
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save hackathon.");
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this hackathon entry? This can't be undone.")) return;
    try {
      await hackathonsApi.remove(id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete hackathon.");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-8 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h2", { className: "mb-3 font-mono text-sm text-[color:var(--c-accent)]", children: [
        "$ existing-hackathons ",
        loading && "(loading...)"
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "mb-3 text-sm text-destructive", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        items.map((item) => /* @__PURE__ */ jsx("div", { className: "glass-card hover-neon-blue rounded-xl px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: item.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
              item.award,
              " · ",
              item.date
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => startEdit(item), className: "text-xs font-mono text-[color:var(--c-accent)] hover:underline", children: "Edit" }),
            /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(item._id), className: "text-xs font-mono text-destructive hover:underline", children: "Delete" })
          ] })
        ] }) }, item._id)),
        !loading && items.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No hackathon entries yet." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "glass-card rounded-2xl p-6", children: [
      /* @__PURE__ */ jsxs("h2", { className: "mb-3 font-mono text-sm text-[color:var(--c-accent)]", children: [
        "$ ",
        editingId ? "edit-hackathon" : "add-hackathon"
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
        /* @__PURE__ */ jsx("input", { placeholder: "Hackathon name", value: form.name ?? "", onChange: (e) => setForm({
          ...form,
          name: e.target.value
        }), required: true, className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { placeholder: "Award (e.g. Winner, Runner-up)", value: form.award ?? "", onChange: (e) => setForm({
          ...form,
          award: e.target.value
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { placeholder: "Project name", value: form.project ?? "", onChange: (e) => setForm({
          ...form,
          project: e.target.value
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("textarea", { placeholder: "Description", value: form.description ?? "", onChange: (e) => setForm({
          ...form,
          description: e.target.value
        }), rows: 4, className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { placeholder: "Tech stack (comma separated)", value: techInput, onChange: (e) => setTechInput(e.target.value), className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { type: "number", min: 1, placeholder: "Team size", value: form.team ?? 1, onChange: (e) => setForm({
          ...form,
          team: Number(e.target.value)
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { placeholder: "Date (e.g. March 2024)", value: form.date ?? "", onChange: (e) => setForm({
          ...form,
          date: e.target.value
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { placeholder: "GitHub URL (leave blank if none)", value: form.github ?? "", onChange: (e) => setForm({
          ...form,
          github: e.target.value
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { placeholder: "Demo URL (leave blank if none — e.g. hackathon IP-restricted project)", value: form.demo ?? "", onChange: (e) => setForm({
          ...form,
          demo: e.target.value
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { placeholder: "Notes URL (optional)", value: form.notesUrl ?? "", onChange: (e) => setForm({
          ...form,
          notesUrl: e.target.value
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { type: "number", placeholder: "Order", value: form.order ?? 0, onChange: (e) => setForm({
          ...form,
          order: Number(e.target.value)
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: saving, className: "btn-primary disabled:opacity-50", children: saving ? "Saving..." : editingId ? "Update Hackathon" : "Add Hackathon" }),
          editingId && /* @__PURE__ */ jsx("button", { type: "button", onClick: resetForm, className: "rounded-lg border border-white/10 px-4 py-2 font-mono text-sm text-muted-foreground hover:bg-white/5", children: "Cancel" })
        ] })
      ] })
    ] })
  ] });
}
function ResearchPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyResearch);
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);
  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await researchApi.getAll();
      setItems(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load research papers.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);
  const resetForm = () => {
    setForm(emptyResearch);
    setTagsInput("");
    setEditingId(null);
  };
  const startEdit = (item) => {
    setForm(item);
    setTagsInput(item.tags.join(", "));
    setEditingId(item._id);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      ...form,
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean)
    };
    try {
      if (editingId) {
        await researchApi.update(editingId, payload);
      } else {
        await researchApi.create(payload);
      }
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save research paper.");
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this research entry? This can't be undone.")) return;
    try {
      await researchApi.remove(id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete research paper.");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-8 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h2", { className: "mb-3 font-mono text-sm text-[color:var(--c-accent)]", children: [
        "$ existing-research ",
        loading && "(loading...)"
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "mb-3 text-sm text-destructive", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        items.map((item) => /* @__PURE__ */ jsx("div", { className: "glass-card hover-neon-blue rounded-xl px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: item.title }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
              item.venue,
              " · ",
              item.year
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => startEdit(item), className: "text-xs font-mono text-[color:var(--c-accent)] hover:underline", children: "Edit" }),
            /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(item._id), className: "text-xs font-mono text-destructive hover:underline", children: "Delete" })
          ] })
        ] }) }, item._id)),
        !loading && items.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No research entries yet." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "glass-card rounded-2xl p-6", children: [
      /* @__PURE__ */ jsxs("h2", { className: "mb-3 font-mono text-sm text-[color:var(--c-accent)]", children: [
        "$ ",
        editingId ? "edit-research" : "add-research"
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
        /* @__PURE__ */ jsx("input", { placeholder: "Title", value: form.title ?? "", onChange: (e) => setForm({
          ...form,
          title: e.target.value
        }), required: true, className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { placeholder: "Authors (comma separated names)", value: form.authors ?? "", onChange: (e) => setForm({
          ...form,
          authors: e.target.value
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { placeholder: "Venue (e.g. IEEE Conference)", value: form.venue ?? "", onChange: (e) => setForm({
          ...form,
          venue: e.target.value
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { type: "number", placeholder: "Year", value: form.year ?? (/* @__PURE__ */ new Date()).getFullYear(), onChange: (e) => setForm({
          ...form,
          year: Number(e.target.value)
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("textarea", { placeholder: "Abstract", value: form.abstract ?? "", onChange: (e) => setForm({
          ...form,
          abstract: e.target.value
        }), rows: 4, className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { placeholder: "Tags (comma separated, e.g. ML, NLP)", value: tagsInput, onChange: (e) => setTagsInput(e.target.value), className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { placeholder: "PDF URL", value: form.pdfUrl ?? "", onChange: (e) => setForm({
          ...form,
          pdfUrl: e.target.value
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { placeholder: "Google Scholar URL", value: form.scholarUrl ?? "", onChange: (e) => setForm({
          ...form,
          scholarUrl: e.target.value
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { placeholder: "arXiv URL", value: form.arxivUrl ?? "", onChange: (e) => setForm({
          ...form,
          arxivUrl: e.target.value
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsx("input", { type: "number", placeholder: "Order", value: form.order ?? 0, onChange: (e) => setForm({
          ...form,
          order: Number(e.target.value)
        }), className: "w-full admin-input" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: saving, className: "btn-primary disabled:opacity-50", children: saving ? "Saving..." : editingId ? "Update Research" : "Add Research" }),
          editingId && /* @__PURE__ */ jsx("button", { type: "button", onClick: resetForm, className: "rounded-lg border border-white/10 px-4 py-2 font-mono text-sm text-muted-foreground hover:bg-white/5", children: "Cancel" })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminDashboard as component
};
