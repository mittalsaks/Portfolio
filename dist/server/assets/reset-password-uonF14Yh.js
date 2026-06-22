import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { C as CursorTrail, a as authApi, A as ApiError } from "./CursorTrail-ABimkZyP.js";
function ResetPassword() {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email") ?? "";
  const token = params.get("token") ?? "";
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const missingLinkInfo = !email || !token;
  const handleSubmit = async (e) => {
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
  return /* @__PURE__ */ jsxs("div", { className: "grid-bg relative min-h-dvh w-full flex items-center justify-center bg-background px-4", children: [
    /* @__PURE__ */ jsx(CursorTrail, {}),
    /* @__PURE__ */ jsxs("div", { className: "glass-card relative w-full max-w-sm rounded-2xl p-8", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-1 font-mono text-xs text-[#00d4ff]", children: "$ admin --reset" }),
      /* @__PURE__ */ jsx("h1", { className: "mb-6 font-mono text-2xl font-bold text-gradient-neon", children: "Reset Password" }),
      missingLinkInfo ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: "This reset link looks incomplete. Please use the link from your email, or request a new one." }),
        /* @__PURE__ */ jsx("a", { href: "/admin/forgot-password", className: "block text-center font-mono text-xs text-muted-foreground hover:text-foreground", children: "← Request a new link" })
      ] }) : success ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-[#00d4ff]", children: "Password reset successfully. You can now log in with your new password." }),
        /* @__PURE__ */ jsx("a", { href: "/admin/login", className: "block w-full rounded-lg border border-[#00d4ff]/40 bg-transparent px-4 py-2.5 text-center font-mono text-sm font-medium text-[#00d4ff] hover-neon-blue", children: "Go to login" })
      ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm text-muted-foreground", htmlFor: "newPassword", children: "New password (min 6 characters)" }),
        /* @__PURE__ */ jsx("input", { id: "newPassword", type: "password", value: newPassword, onChange: (e) => setNewPassword(e.target.value), required: true, autoComplete: "new-password", className: "mb-4 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-[#00d4ff]/60" }),
        /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm text-muted-foreground", htmlFor: "confirmPassword", children: "Confirm new password" }),
        /* @__PURE__ */ jsx("input", { id: "confirmPassword", type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true, autoComplete: "new-password", className: "mb-4 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-[#00d4ff]/60" }),
        error && /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm text-destructive", role: "alert", children: error }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, className: "hover-neon-blue w-full rounded-lg border border-[#00d4ff]/40 bg-transparent px-4 py-2.5 font-mono text-sm font-medium text-[#00d4ff] transition-all disabled:opacity-50", children: loading ? "Resetting..." : "Reset password" })
      ] })
    ] })
  ] });
}
export {
  ResetPassword as component
};
