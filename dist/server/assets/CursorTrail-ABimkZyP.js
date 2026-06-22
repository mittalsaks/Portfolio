import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
const API_URL = "http://localhost:5000/api";
class ApiError extends Error {
  status;
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
async function apiRequest(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    // required so the httpOnly admin cookie is sent
    headers: {
      "Content-Type": "application/json",
      ...options.headers ?? {}
    },
    ...options
  });
  const text = await res.text();
  const body = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const message = body?.message ?? `Request failed with status ${res.status}`;
    throw new ApiError(message, res.status);
  }
  return body;
}
const authApi = {
  login: (email, password) => apiRequest(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password })
    }
  ),
  verifyOtp: (email, otp) => apiRequest(
    "/auth/verify-otp",
    {
      method: "POST",
      body: JSON.stringify({ email, otp })
    }
  ),
  forgotPassword: (email) => apiRequest("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email })
  }),
  resetPassword: (email, token, newPassword) => apiRequest("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ email, token, newPassword })
  }),
  logout: () => apiRequest("/auth/logout", {
    method: "POST"
  }),
  me: () => apiRequest("/auth/me"),
  changePassword: async (currentPassword, newPassword) => {
    const res = await fetch(`${API_URL}/auth/change-password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      // sends the httpOnly cookie
      body: JSON.stringify({ currentPassword, newPassword })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new ApiError(data.message || "Failed to change password", res.status);
    }
    return data;
  }
};
function createCrudApi(resource) {
  const base = `/${resource}`;
  return {
    getAll: () => apiRequest(base).then((r) => r.data),
    getOne: (id) => apiRequest(`${base}/${id}`).then((r) => r.data),
    create: (payload) => apiRequest(base, {
      method: "POST",
      body: JSON.stringify(payload)
    }).then((r) => r.data),
    update: (id, payload) => apiRequest(`${base}/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload)
    }).then((r) => r.data),
    // IMPORTANT: delete response has no `data` field, only a message —
    // so we return the message instead of trying to read .data here.
    remove: (id) => apiRequest(`${base}/${id}`, {
      method: "DELETE"
    }).then((r) => r.message)
  };
}
function CursorTrail() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);
  const [scrollPct, setScrollPct] = useState(0);
  useEffect(() => {
    if (matchMedia("(hover: none)").matches) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf = 0;
    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      }
    };
    const tick = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
      setScrollPct(Math.min(100, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(0).map(() => Math.random() * -100);
    const chars = "01ABCDEF{};</>$#*+=-_アイウエオカキクケコｱｲｳｴｵ";
    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(0).map(() => Math.random() * -100);
    };
    window.addEventListener("resize", onResize);
    let raf = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(10,10,15,0.08)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * fontSize;
        ctx.fillStyle = y < 30 ? "rgba(180,255,220,0.9)" : "rgba(0,255,135,0.45)";
        ctx.fillText(ch, i * fontSize, y);
        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.45;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "canvas",
      {
        ref: canvasRef,
        "aria-hidden": "true",
        className: "pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "scroll-progress", style: { width: `${scrollPct}%` }, "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("div", { ref: dotRef, className: "cursor-dot", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("div", { ref: ringRef, className: "cursor-ring", "aria-hidden": "true" })
  ] });
}
export {
  ApiError as A,
  CursorTrail as C,
  authApi as a,
  apiRequest as b,
  createCrudApi as c
};
