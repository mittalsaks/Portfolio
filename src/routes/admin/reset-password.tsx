import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { authApi, ApiError } from "@/lib/api/client";
import { CursorTrail } from "@/components/portfolio/CursorTrail";

export const Route = createFileRoute("/admin/reset-password")({
  head: () => ({
    meta: [{ title: "Reset Password" }],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email") ?? "";
  const token = params.get("token") ?? "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const missingLinkInfo = !email || !token;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    try {
      await authApi.resetPassword(email, token, newPassword);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid-bg relative min-h-dvh w-full flex items-center justify-center bg-background px-4">
      <CursorTrail />
      <div className="glass-card relative w-full max-w-sm rounded-2xl p-8">
        <p className="mb-1 font-mono text-xs text-[#00d4ff]">$ admin --reset</p>
        <h1 className="mb-6 font-mono text-2xl font-bold text-gradient-neon">
          Reset Password
        </h1>

        {missingLinkInfo ? (
          <div className="space-y-4">
            <p className="text-sm text-destructive">
              This reset link looks incomplete. Please use the link from your email, or request a new one.
            </p>
            <a
              href="/admin/forgot-password"
              className="block text-center font-mono text-xs text-muted-foreground hover:text-foreground"
            >
              ← Request a new link
            </a>
          </div>
        ) : success ? (
          <div className="space-y-4">
            <p className="text-sm text-[#00d4ff]">
              Password reset successfully. You can now log in with your new password.
            </p>
            <a
              href="/admin/login"
              className="block w-full rounded-lg border border-[#00d4ff]/40 bg-transparent px-4 py-2.5 text-center font-mono text-sm font-medium text-[#00d4ff] hover-neon-blue"
            >
              Go to login
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="mb-1 block text-sm text-muted-foreground" htmlFor="newPassword">
              New password (min 6 characters)
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="mb-4 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-[#00d4ff]/60"
            />

            <label className="mb-1 block text-sm text-muted-foreground" htmlFor="confirmPassword">
              Confirm new password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="mb-4 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-[#00d4ff]/60"
            />

            {error && (
              <p className="mb-4 text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="hover-neon-blue w-full rounded-lg border border-[#00d4ff]/40 bg-transparent px-4 py-2.5 font-mono text-sm font-medium text-[#00d4ff] transition-all disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}