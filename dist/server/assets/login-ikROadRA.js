import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { C as CursorTrail, a as authApi, A as ApiError } from "./CursorTrail-ABimkZyP.js";
function AdminLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleCredentialsSubmit = async (e) => {
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
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authApi.verifyOtp(email, otp);
      navigate({
        to: "/admin/dashboard"
      });
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
  return /* @__PURE__ */ jsxs("div", { className: "grid-bg relative min-h-dvh w-full flex items-center justify-center bg-background px-4", children: [
    /* @__PURE__ */ jsx(CursorTrail, {}),
    /* @__PURE__ */ jsx("a", { href: "/", className: "absolute left-4 top-4 font-mono text-xs text-muted-foreground hover:text-foreground", children: "← Back to site" }),
    step === "credentials" && /* @__PURE__ */ jsxs("form", { onSubmit: handleCredentialsSubmit, className: "glass-card relative w-full max-w-sm rounded-2xl p-8", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-1 font-mono text-xs text-[#00d4ff]", children: "$ admin --login" }),
      /* @__PURE__ */ jsx("h1", { className: "mb-6 font-mono text-2xl font-bold text-gradient-neon", children: "Admin Login" }),
      /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm text-muted-foreground", htmlFor: "email", children: "Email" }),
      /* @__PURE__ */ jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, autoComplete: "username", className: "mb-4 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-[#00d4ff]/60" }),
      /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm text-muted-foreground", htmlFor: "password", children: "Password" }),
      /* @__PURE__ */ jsx("input", { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, autoComplete: "current-password", className: "mb-4 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-[#00d4ff]/60" }),
      error && /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm text-destructive", role: "alert", children: error }),
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, className: "hover-neon-blue w-full rounded-lg border border-[#00d4ff]/40 bg-transparent px-4 py-2.5 font-mono text-sm font-medium text-[#00d4ff] transition-all disabled:opacity-50", children: loading ? "Logging in..." : "Log in" }),
      /* @__PURE__ */ jsx("a", { href: "/admin/forgot-password", className: "mt-3 block text-center font-mono text-xs text-muted-foreground hover:text-foreground", children: "Forgot password?" })
    ] }),
    step === "otp" && /* @__PURE__ */ jsxs("form", { onSubmit: handleOtpSubmit, className: "glass-card relative w-full max-w-sm rounded-2xl p-8", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-1 font-mono text-xs text-[#00d4ff]", children: "$ admin --verify" }),
      /* @__PURE__ */ jsx("h1", { className: "mb-2 font-mono text-2xl font-bold text-gradient-neon", children: "Enter Code" }),
      /* @__PURE__ */ jsxs("p", { className: "mb-6 text-sm text-muted-foreground", children: [
        "We emailed a 6-digit code to ",
        /* @__PURE__ */ jsx("span", { className: "text-foreground", children: email }),
        ". It expires in 10 minutes."
      ] }),
      /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm text-muted-foreground", htmlFor: "otp", children: "Verification code" }),
      /* @__PURE__ */ jsx("input", { id: "otp", type: "text", inputMode: "numeric", pattern: "[0-9]{6}", maxLength: 6, value: otp, onChange: (e) => setOtp(e.target.value.replace(/\D/g, "")), required: true, autoComplete: "one-time-code", placeholder: "123456", className: "mb-4 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-center font-mono text-lg tracking-[0.3em] text-foreground outline-none transition-colors focus:border-[#00d4ff]/60" }),
      error && /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm text-destructive", role: "alert", children: error }),
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading || otp.length !== 6, className: "hover-neon-blue w-full rounded-lg border border-[#00d4ff]/40 bg-transparent px-4 py-2.5 font-mono text-sm font-medium text-[#00d4ff] transition-all disabled:opacity-50", children: loading ? "Verifying..." : "Verify & Log in" }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: backToCredentials, className: "mt-3 w-full text-center font-mono text-xs text-muted-foreground hover:text-foreground", children: "← Back" })
    ] })
  ] });
}
export {
  AdminLogin as component
};
