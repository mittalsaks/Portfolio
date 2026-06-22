import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { C as CursorTrail, a as authApi, A as ApiError } from "./CursorTrail-m8pXc8Zf.js";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authApi.forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid-bg relative min-h-dvh w-full flex items-center justify-center bg-background px-4", children: [
    /* @__PURE__ */ jsx(CursorTrail, {}),
    /* @__PURE__ */ jsxs("div", { className: "glass-card relative w-full max-w-sm rounded-2xl p-8", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-1 font-mono text-xs text-[#00d4ff]", children: "$ admin --recover" }),
      /* @__PURE__ */ jsx("h1", { className: "mb-6 font-mono text-2xl font-bold text-gradient-neon", children: "Forgot Password" }),
      sent ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-[#00d4ff]", children: "If that email is registered, a reset link has been sent. Check your inbox — the link expires in 10 minutes." }),
        /* @__PURE__ */ jsx("a", { href: "/admin/login", className: "block text-center font-mono text-xs text-muted-foreground hover:text-foreground", children: "← Back to login" })
      ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm text-muted-foreground", htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, autoComplete: "username", className: "mb-4 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-[#00d4ff]/60" }),
        error && /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm text-destructive", role: "alert", children: error }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, className: "hover-neon-blue w-full rounded-lg border border-[#00d4ff]/40 bg-transparent px-4 py-2.5 font-mono text-sm font-medium text-[#00d4ff] transition-all disabled:opacity-50", children: loading ? "Sending..." : "Send reset link" }),
        /* @__PURE__ */ jsx("a", { href: "/admin/login", className: "mt-3 block text-center font-mono text-xs text-muted-foreground hover:text-foreground", children: "← Back to login" })
      ] })
    ] })
  ] });
}
export {
  ForgotPassword as component
};
