import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { authApi, ApiError } from "@/lib/api/client";
import { CursorTrail } from "@/components/portfolio/CursorTrail";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Admin Login" }],
  }),
  component: AdminLogin,
});

type Step = "credentials" | "otp";

function AdminLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authApi.login(email, password);
      setStep("otp");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.status === 401 ? "Invalid email or password." : err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authApi.verifyOtp(email, otp);
      navigate({ to: "/admin/dashboard" });
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.status === 401 ? "Incorrect or expired code." : err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const backToCredentials = () => {
    setStep("credentials");
    setOtp("");
    setError(null);
  };

  return (
    <div className="grid-bg relative min-h-dvh w-full flex items-center justify-center bg-background px-4">
      <CursorTrail />

      <a
        href="/"
        className="absolute left-4 top-4 font-mono text-xs text-muted-foreground hover:text-foreground"
      >
        ← Back to site
      </a>

      {step === "credentials" && (
        <form
          onSubmit={handleCredentialsSubmit}
          className="glass-card relative w-full max-w-sm rounded-2xl p-8"
        >
          <p className="mb-1 font-mono text-xs text-[#00d4ff]">$ admin --login</p>
          <h1 className="mb-6 font-mono text-2xl font-bold text-gradient-neon">
            Admin Login
          </h1>

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

          <label className="mb-1 block text-sm text-muted-foreground" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
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
            {loading ? "Logging in..." : "Log in"}
          </button>

          <a
            href="/admin/forgot-password"
            className="mt-3 block text-center font-mono text-xs text-muted-foreground hover:text-foreground"
          >
            Forgot password?
          </a>
        </form>
      )}

      {step === "otp" && (
        <form
          onSubmit={handleOtpSubmit}
          className="glass-card relative w-full max-w-sm rounded-2xl p-8"
        >
          <p className="mb-1 font-mono text-xs text-[#00d4ff]">$ admin --verify</p>
          <h1 className="mb-2 font-mono text-2xl font-bold text-gradient-neon">
            Enter Code
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            We emailed a 6-digit code to <span className="text-foreground">{email}</span>.
            It expires in 10 minutes.
          </p>

          <label className="mb-1 block text-sm text-muted-foreground" htmlFor="otp">
            Verification code
          </label>
          <input
            id="otp"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            required
            autoComplete="one-time-code"
            placeholder="123456"
            className="mb-4 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-center font-mono text-lg tracking-[0.3em] text-foreground outline-none transition-colors focus:border-[#00d4ff]/60"
          />

          {error && (
            <p className="mb-4 text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="hover-neon-blue w-full rounded-lg border border-[#00d4ff]/40 bg-transparent px-4 py-2.5 font-mono text-sm font-medium text-[#00d4ff] transition-all disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify & Log in"}
          </button>

          <button
            type="button"
            onClick={backToCredentials}
            className="mt-3 w-full text-center font-mono text-xs text-muted-foreground hover:text-foreground"
          >
            ← Back
          </button>
        </form>
      )}
    </div>
  );
}