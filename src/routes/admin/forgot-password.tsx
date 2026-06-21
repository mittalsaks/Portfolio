import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { authApi, ApiError } from "@/lib/api/client";
import { CursorTrail } from "@/components/portfolio/CursorTrail";

export const Route = createFileRoute("/admin/forgot-password")({
  head: () => ({
    meta: [{ title: "Forgot Password" }],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authApi.forgotPassword(email);
      // Backend always returns the same generic message whether or not
      // the email exists — we just show it as-is.
      setSent(true);
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
        <p className="mb-1 font-mono text-xs text-[#00d4ff]">$ admin --recover</p>
        <h1 className="mb-6 font-mono text-2xl font-bold text-gradient-neon">
          Forgot Password
        </h1>

        {sent ? (
          <div className="space-y-4">
            <p className="text-sm text-[#00d4ff]">
              If that email is registered, a reset link has been sent. Check your inbox — the link expires in 10 minutes.
            </p>
            <a
              href="/admin/login"
              className="block text-center font-mono text-xs text-muted-foreground hover:text-foreground"
            >
              ← Back to login
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="mb-1 block text-sm text-muted-foreground" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
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
              {loading ? "Sending..." : "Send reset link"}
            </button>

            <a
              href="/admin/login"
              className="mt-3 block text-center font-mono text-xs text-muted-foreground hover:text-foreground"
            >
              ← Back to login
            </a>
          </form>
        )}
      </div>
    </div>
  );
}