import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { authApi, ApiError } from "@/lib/api/client";
import { projectsApi, skillsApi, experienceApi, hackathonsApi, researchApi, profileApi } from "@/lib/api/resources";
import type { Project, Skill, SkillItem, Experience, Hackathon, ResearchPaper, Profile } from "@/lib/api/types";
import { CursorTrail } from "@/components/portfolio/CursorTrail";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [{ title: "Admin Dashboard" }],
  }),
  component: AdminDashboard,
});

type Tab = "profile" | "projects" | "skills" | "experience" | "hackathons" | "research";

function AdminDashboard() {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Guard: confirm there's a valid session before showing anything.
  useEffect(() => {
    authApi
      .me()
      .catch(() => {
        navigate({ to: "/admin/login" });
      })
      .finally(() => setCheckingAuth(false));
  }, [navigate]);

  const handleLogout = async () => {
    await authApi.logout().catch(() => {
      // even if the call fails, still send them to login
    });
    navigate({ to: "/admin/login" });
  };

  if (checkingAuth) {
    return (
      <div className="grid-bg flex min-h-dvh items-center justify-center bg-background font-mono text-sm text-[color:var(--c-accent)]">
        $ checking session...
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "profile", label: "Profile" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "hackathons", label: "Hackathons" },
    { id: "research", label: "Research" },
  ];

  return (
    <div className="grid-bg min-h-dvh w-full bg-background px-4 py-8 text-foreground">
      <CursorTrail />
      <div className="mx-auto max-w-5xl">
        <div className="glass-card mb-6 flex items-center justify-between rounded-2xl px-6 py-4">
          <h1 className="font-mono text-xl font-bold text-gradient-neon">
            Admin Dashboard
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowChangePassword(true)}
              className="hover-neon-blue rounded-lg border border-white/10 px-3 py-1.5 font-mono text-sm text-muted-foreground"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="hover-neon-blue rounded-lg border border-white/10 px-3 py-1.5 font-mono text-sm text-muted-foreground"
            >
              Log out
            </button>
          </div>
        </div>

        <div className="glass-card mb-6 flex gap-1 rounded-xl p-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-3 py-2 font-mono text-sm transition-all ${
                activeTab === tab.id
                  ? "neon-glow-blue bg-[color:var(--c-accent)]/10 text-[color:var(--c-accent)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "profile" && <ProfilePanel />}
        {activeTab === "projects" && <ProjectsPanel />}
        {activeTab === "skills" && <SkillsPanel />}
        {activeTab === "experience" && <ExperiencePanel />}
        {activeTab === "hackathons" && <HackathonsPanel />}
        {activeTab === "research" && <ResearchPanel />}

        {showChangePassword && (
          <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
        )}
      </div>
    </div>
  );
}
function SkillsPanel() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Skill>>(emptySkill);
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

  const startEdit = (skill: Skill) => {
    setForm(skill);
    setEditingId(skill._id);
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...(form.items ?? []), { name: "" }],
    });
  };

  const removeItem = (index: number) => {
    setForm({
      ...form,
      items: (form.items ?? []).filter((_, i) => i !== index),
    });
  };

  const updateItem = (index: number, field: keyof SkillItem, value: string | number) => {
    const items = [...(form.items ?? [])];
    items[index] = { ...items[index], [field]: value };
    setForm({ ...form, items });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill category? This can't be undone.")) return;
    try {
      await skillsApi.remove(id);
      await loadSkills();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete skill group.");
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* List */}
      <div>
        <h2 className="mb-3 font-mono text-sm text-[color:var(--c-accent)]">
          $ existing-skills {loading && "(loading...)"}
        </h2>
        {error && <p className="mb-3 text-sm text-destructive">{error}</p>}
        <div className="space-y-2">
          {skills.map((s) => (
            <div
              key={s._id}
              className="glass-card hover-neon-blue rounded-xl px-4 py-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{s.category}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => startEdit(s)}
                    className="text-xs font-mono text-[color:var(--c-accent)] hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="text-xs font-mono text-destructive hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {s.items.map((i) => i.name).join(", ") || "No items"}
              </p>
            </div>
          ))}
          {!loading && skills.length === 0 && (
            <p className="text-sm text-muted-foreground">No skill categories yet.</p>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="mb-3 font-mono text-sm text-[color:var(--c-accent)]">
          $ {editingId ? "edit-skill-category" : "add-skill-category"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <select
            value={form.category ?? "Frontend"}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value as Skill["category"] })
            }
            className="w-full admin-input"
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Databases">Databases</option>
            <option value="DevOps & Tools">DevOps & Tools</option>
            <option value="Languages">Languages</option>
            <option value="Frameworks & Libraries">Frameworks & Libraries</option>
            <option value="Tools & Platforms">Tools & Platforms</option>
          </select>

          <input
            type="number"
            placeholder="Order"
            value={form.order ?? 0}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            className="w-full admin-input"
          />

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Skill items</p>
            {(form.items ?? []).map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  placeholder="Skill name (e.g. React)"
                  value={item.name}
                  onChange={(e) => updateItem(index, "name", e.target.value)}
                  required
                  className="flex-1 admin-input"
                />
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="rounded-lg border border-white/10 px-3 text-xs text-destructive hover:bg-white/5"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addItem}
              className="w-full rounded-lg border border-dashed border-white/20 px-3 py-2 text-xs text-muted-foreground hover:bg-white/5"
            >
              + Add skill item
            </button>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary disabled:opacity-50"
            >
              {saving ? "Saving..." : editingId ? "Update Category" : "Add Category"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-white/10 px-4 py-2 font-mono text-sm text-muted-foreground hover:bg-white/5"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// ---- Profile panel: singleton, single edit form (no list, no delete) ----
// Unlike the other 5 panels, there's only ever one Profile document, so
// this just loads it once and lets Sakshi edit + save in place.

function ProfilePanel() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState<Partial<Profile>>({});
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    const payload: Partial<Profile> = {
      ...form,
      roles: rolesInput
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean),
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
    return (
      <p className="text-sm text-muted-foreground">$ loading profile...</p>
    );
  }

  return (
    <div className="glass-card mx-auto max-w-xl rounded-2xl p-6">
      <h2 className="mb-3 font-mono text-sm text-[color:var(--c-accent)]">$ edit-profile</h2>
      {error && <p className="mb-3 text-sm text-destructive">{error}</p>}
      {success && (
        <p className="mb-3 text-sm text-[color:var(--c-accent)]">Profile updated successfully.</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          placeholder="Name"
          value={form.name ?? ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full admin-input"
        />
        <input
          placeholder="Handle (e.g. @sakshimittal)"
          value={form.handle ?? ""}
          onChange={(e) => setForm({ ...form, handle: e.target.value })}
          className="w-full admin-input"
        />
        <input
          placeholder="Roles (comma separated, e.g. Full Stack Developer, Student)"
          value={rolesInput}
          onChange={(e) => setRolesInput(e.target.value)}
          className="w-full admin-input"
        />
        <textarea
          placeholder="Tagline"
          value={form.tagline ?? ""}
          onChange={(e) => setForm({ ...form, tagline: e.target.value })}
          rows={2}
          className="w-full admin-input"
        />
        <input
          placeholder="Email"
          value={form.email ?? ""}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full admin-input"
        />
        <input
          placeholder="Location"
          value={form.location ?? ""}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full admin-input"
        />
        <input
          placeholder="Availability (e.g. Open to internships)"
          value={form.availability ?? ""}
          onChange={(e) => setForm({ ...form, availability: e.target.value })}
          className="w-full admin-input"
        />
        <input
          placeholder="Resume URL"
          value={form.resumeUrl ?? ""}
          onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
          className="w-full admin-input"
        />

        <p className="pt-2 text-xs text-muted-foreground">Socials</p>
        <input
          placeholder="GitHub URL"
          value={form.socials?.github ?? ""}
          onChange={(e) =>
            setForm({
              ...form,
              socials: { ...(form.socials ?? { github: "", linkedin: "", twitter: "", email: "" }), github: e.target.value },
            })
          }
          className="w-full admin-input"
        />
        <input
          placeholder="LinkedIn URL"
          value={form.socials?.linkedin ?? ""}
          onChange={(e) =>
            setForm({
              ...form,
              socials: { ...(form.socials ?? { github: "", linkedin: "", twitter: "", email: "" }), linkedin: e.target.value },
            })
          }
          className="w-full admin-input"
        />
        <input
          placeholder="Twitter / X URL"
          value={form.socials?.twitter ?? ""}
          onChange={(e) =>
            setForm({
              ...form,
              socials: { ...(form.socials ?? { github: "", linkedin: "", twitter: "", email: "" }), twitter: e.target.value },
            })
          }
          className="w-full admin-input"
        />
        <input
          placeholder="Contact email (for socials.email, can differ from main email)"
          value={form.socials?.email ?? ""}
          onChange={(e) =>
            setForm({
              ...form,
              socials: { ...(form.socials ?? { github: "", linkedin: "", twitter: "", email: "" }), email: e.target.value },
            })
          }
          className="w-full admin-input"
        />

        <button
          type="submit"
          disabled={saving}
          className="btn-primary w-full disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
function PlaceholderPanel({ label }: { label: string }) {
  return (
    <p className="text-sm text-muted-foreground">
      {label} management — coming next, once the Projects pattern is confirmed working.
    </p>
  );
}

// ---- Projects panel: the full pattern (list + create + edit + delete) ----
// Once this works end-to-end, the same shape gets copied for Skills,
// Experience, Hackathons, and Research.

const emptyProject: Partial<Project> = {
  title: "",
  description: "",
  category: "Web",
  tech: [],
  github: "",
  demo: "",
  image: "",
  featured: false,
  order: 0,
};
const emptySkill: Partial<Skill> = {
  category: "Frontend",
  items: [],
  order: 0,
};
const emptyExperience: Partial<Experience> = {
  company: "",
  role: "",
  duration: "",
  type: "Full-time",
  bullets: [],
  order: 0,
};
const emptyHackathon: Partial<Hackathon> = {
  name: "",
  award: "",
  project: "",
  description: "",
  tech: [],
  team: 1,
  date: "",
  github: "",
  demo: "",
  order: 0,
};
const emptyResearch: Partial<ResearchPaper> = {
  title: "",
  authors: "",
  venue: "",
  year: new Date().getFullYear(),
  abstract: "",
  tags: [],
  pdfUrl: "",
  scholarUrl: "",
  arxivUrl: "",
  order: 0,
};
function ProjectsPanel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Project>>(emptyProject);
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

  const startEdit = (project: Project) => {
    setForm(project);
    setTechInput(project.tech.join(", "));
    setEditingId(project._id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: Partial<Project> = {
      ...form,
      tech: techInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
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

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project? This can't be undone.")) return;
    try {
      await projectsApi.remove(id);
      await loadProjects();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete project.");
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* List */}
      <div>
        <h2 className="mb-3 font-mono text-sm text-[color:var(--c-accent)]">
          $ existing-projects {loading && "(loading...)"}
        </h2>
        {error && <p className="mb-3 text-sm text-destructive">{error}</p>}
        <div className="space-y-2">
          {projects.map((p) => (
            <div
              key={p._id}
              className="glass-card hover-neon-blue flex items-center justify-between rounded-xl px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.category}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(p)}
                  className="text-xs font-mono text-[color:var(--c-accent)] hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-xs font-mono text-destructive hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {!loading && projects.length === 0 && (
            <p className="text-sm text-muted-foreground">No projects yet.</p>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="mb-3 font-mono text-sm text-[color:var(--c-accent)]">
          $ {editingId ? "edit-project" : "add-project"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Title"
            value={form.title ?? ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full admin-input"
          />
          <textarea
            placeholder="Description"
            value={form.description ?? ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            rows={3}
            className="w-full admin-input"
          />
          <select
            value={form.category ?? "Web"}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value as Project["category"] })
            }
            className="w-full admin-input"
          >
            <option value="Web">Web</option>
            <option value="Mobile">Mobile</option>
            <option value="API/Backend">API/Backend</option>
          </select>
          <input
            placeholder="Tech stack (comma separated, e.g. React, Node.js)"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            className="w-full admin-input"
          />
          <input
            placeholder="GitHub URL"
            value={form.github ?? ""}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            className="w-full admin-input"
          />
          <input
            placeholder="Demo URL (leave blank if none — e.g. hackathon IP-restricted project)"
            value={form.demo ?? ""}
            onChange={(e) => setForm({ ...form, demo: e.target.value })}
            className="w-full admin-input"
          />
          <input
            placeholder="Image URL"
            value={form.image ?? ""}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full admin-input"
          />
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={form.featured ?? false}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            Featured
          </label>
          <input
            type="number"
            placeholder="Order"
            value={form.order ?? 0}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            className="w-full admin-input"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary disabled:opacity-50"
            >
              {saving ? "Saving..." : editingId ? "Update Project" : "Add Project"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-white/10 px-4 py-2 font-mono text-sm text-muted-foreground hover:bg-white/5"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="glass-card w-full max-w-sm rounded-2xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-mono text-sm text-[color:var(--c-accent)]">$ change-password</h2>
          <button
            onClick={onClose}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {success ? (
          <div className="space-y-3">
            <p className="text-sm text-[color:var(--c-accent)]">
              Password updated successfully. Please log in again with your new password.
            </p>
            <button
              onClick={onClose}
              className="w-full rounded-lg border border-white/10 px-4 py-2 font-mono text-sm text-muted-foreground hover:bg-white/5"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full admin-input"
            />
            <input
              type="password"
              placeholder="New password (min 6 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full admin-input"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full admin-input"
            />

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary disabled:opacity-50"
              >
                {saving ? "Saving..." : "Update Password"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-white/10 px-4 py-2 font-mono text-sm text-muted-foreground hover:bg-white/5"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
function ExperiencePanel() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Experience>>(emptyExperience);
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

  const startEdit = (item: Experience) => {
    setForm(item);
    setBulletInput(item.bullets.join("\n"));
    setEditingId(item._id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: Partial<Experience> = {
      ...form,
      bullets: bulletInput
        .split("\n")
        .map((b) => b.trim())
        .filter(Boolean),
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

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this experience entry? This can't be undone.")) return;
    try {
      await experienceApi.remove(id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete experience.");
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* List */}
      <div>
        <h2 className="mb-3 font-mono text-sm text-[color:var(--c-accent)]">
          $ existing-experience {loading && "(loading...)"}
        </h2>
        {error && <p className="mb-3 text-sm text-destructive">{error}</p>}
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item._id}
              className="glass-card hover-neon-blue rounded-xl px-4 py-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">
                    {item.role} @ {item.company}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.duration} · {item.type}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => startEdit(item)}
                    className="text-xs font-mono text-[color:var(--c-accent)] hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-xs font-mono text-destructive hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {!loading && items.length === 0 && (
            <p className="text-sm text-muted-foreground">No experience entries yet.</p>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="mb-3 font-mono text-sm text-[color:var(--c-accent)]">
          $ {editingId ? "edit-experience" : "add-experience"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Company"
            value={form.company ?? ""}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            required
            className="w-full admin-input"
          />
          <input
            placeholder="Role"
            value={form.role ?? ""}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
            className="w-full admin-input"
          />
          <input
            placeholder="Duration (e.g. Jan 2024 - Present)"
            value={form.duration ?? ""}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            required
            className="w-full admin-input"
          />
          <select
            value={form.type ?? "Full-time"}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value as Experience["type"] })
            }
            className="w-full admin-input"
          >
            <option value="Full-time">Full-time</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
            <option value="Contract">Contract</option>
          </select>
          <textarea
            placeholder="Bullets (one point per line)"
            value={bulletInput}
            onChange={(e) => setBulletInput(e.target.value)}
            rows={4}
            className="w-full admin-input"
          />
          <input
            type="number"
            placeholder="Order"
            value={form.order ?? 0}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            className="w-full admin-input"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary disabled:opacity-50"
            >
              {saving ? "Saving..." : editingId ? "Update Experience" : "Add Experience"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-white/10 px-4 py-2 font-mono text-sm text-muted-foreground hover:bg-white/5"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
function HackathonsPanel() {
  const [items, setItems] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Hackathon>>(emptyHackathon);
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

  const startEdit = (item: Hackathon) => {
    setForm(item);
    setTechInput(item.tech.join(", "));
    setEditingId(item._id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: Partial<Hackathon> = {
      ...form,
      tech: techInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
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

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this hackathon entry? This can't be undone.")) return;
    try {
      await hackathonsApi.remove(id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete hackathon.");
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* List */}
      <div>
        <h2 className="mb-3 font-mono text-sm text-[color:var(--c-accent)]">
          $ existing-hackathons {loading && "(loading...)"}
        </h2>
        {error && <p className="mb-3 text-sm text-destructive">{error}</p>}
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item._id}
              className="glass-card hover-neon-blue rounded-xl px-4 py-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.award} · {item.date}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => startEdit(item)}
                    className="text-xs font-mono text-[color:var(--c-accent)] hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-xs font-mono text-destructive hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {!loading && items.length === 0 && (
            <p className="text-sm text-muted-foreground">No hackathon entries yet.</p>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="mb-3 font-mono text-sm text-[color:var(--c-accent)]">
          $ {editingId ? "edit-hackathon" : "add-hackathon"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Hackathon name"
            value={form.name ?? ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full admin-input"
          />
          <input
            placeholder="Award (e.g. Winner, Runner-up)"
            value={form.award ?? ""}
            onChange={(e) => setForm({ ...form, award: e.target.value })}
            className="w-full admin-input"
          />
          <input
            placeholder="Project name"
            value={form.project ?? ""}
            onChange={(e) => setForm({ ...form, project: e.target.value })}
            className="w-full admin-input"
          />
          <textarea
            placeholder="Description"
            value={form.description ?? ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full admin-input"
          />
          <input
            placeholder="Tech stack (comma separated)"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            className="w-full admin-input"
          />
          <input
            type="number"
            min={1}
            placeholder="Team size"
            value={form.team ?? 1}
            onChange={(e) => setForm({ ...form, team: Number(e.target.value) })}
            className="w-full admin-input"
          />
          <input
            placeholder="Date (e.g. March 2024)"
            value={form.date ?? ""}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full admin-input"
          />
          <input
            placeholder="GitHub URL (leave blank if none)"
            value={form.github ?? ""}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            className="w-full admin-input"
          />
          <input
            placeholder="Demo URL (leave blank if none — e.g. hackathon IP-restricted project)"
            value={form.demo ?? ""}
            onChange={(e) => setForm({ ...form, demo: e.target.value })}
            className="w-full admin-input"
          />
          <input
            type="number"
            placeholder="Order"
            value={form.order ?? 0}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            className="w-full admin-input"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary disabled:opacity-50"
            >
              {saving ? "Saving..." : editingId ? "Update Hackathon" : "Add Hackathon"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-white/10 px-4 py-2 font-mono text-sm text-muted-foreground hover:bg-white/5"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
function ResearchPanel() {
  const [items, setItems] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<ResearchPaper>>(emptyResearch);
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

  const startEdit = (item: ResearchPaper) => {
    setForm(item);
    setTagsInput(item.tags.join(", "));
    setEditingId(item._id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: Partial<ResearchPaper> = {
      ...form,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
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

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this research entry? This can't be undone.")) return;
    try {
      await researchApi.remove(id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete research paper.");
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* List */}
      <div>
        <h2 className="mb-3 font-mono text-sm text-[color:var(--c-accent)]">
          $ existing-research {loading && "(loading...)"}
        </h2>
        {error && <p className="mb-3 text-sm text-destructive">{error}</p>}
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item._id}
              className="glass-card hover-neon-blue rounded-xl px-4 py-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.venue} · {item.year}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => startEdit(item)}
                    className="text-xs font-mono text-[color:var(--c-accent)] hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-xs font-mono text-destructive hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {!loading && items.length === 0 && (
            <p className="text-sm text-muted-foreground">No research entries yet.</p>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="mb-3 font-mono text-sm text-[color:var(--c-accent)]">
          $ {editingId ? "edit-research" : "add-research"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Title"
            value={form.title ?? ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full admin-input"
          />
          <input
            placeholder="Authors (comma separated names)"
            value={form.authors ?? ""}
            onChange={(e) => setForm({ ...form, authors: e.target.value })}
            className="w-full admin-input"
          />
          <input
            placeholder="Venue (e.g. IEEE Conference)"
            value={form.venue ?? ""}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
            className="w-full admin-input"
          />
          <input
            type="number"
            placeholder="Year"
            value={form.year ?? new Date().getFullYear()}
            onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
            className="w-full admin-input"
          />
          <textarea
            placeholder="Abstract"
            value={form.abstract ?? ""}
            onChange={(e) => setForm({ ...form, abstract: e.target.value })}
            rows={4}
            className="w-full admin-input"
          />
          <input
            placeholder="Tags (comma separated, e.g. ML, NLP)"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full admin-input"
          />
          <input
            placeholder="PDF URL"
            value={form.pdfUrl ?? ""}
            onChange={(e) => setForm({ ...form, pdfUrl: e.target.value })}
            className="w-full admin-input"
          />
          <input
            placeholder="Google Scholar URL"
            value={form.scholarUrl ?? ""}
            onChange={(e) => setForm({ ...form, scholarUrl: e.target.value })}
            className="w-full admin-input"
          />
          <input
            placeholder="arXiv URL"
            value={form.arxivUrl ?? ""}
            onChange={(e) => setForm({ ...form, arxivUrl: e.target.value })}
            className="w-full admin-input"
          />
          <input
            type="number"
            placeholder="Order"
            value={form.order ?? 0}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            className="w-full admin-input"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary disabled:opacity-50"
            >
              {saving ? "Saving..." : editingId ? "Update Research" : "Add Research"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-white/10 px-4 py-2 font-mono text-sm text-muted-foreground hover:bg-white/5"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}