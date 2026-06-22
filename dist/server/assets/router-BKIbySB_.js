import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
const appCss = "/assets/styles-CN2qPVv2.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-dvh items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-mono text-7xl font-bold text-gradient-neon", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md border border-[#00d4ff]/40 bg-transparent px-4 py-2 text-sm font-medium text-[#00d4ff] hover-neon-blue",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-dvh items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$5 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Alex Doe — Full Stack Developer" },
      {
        name: "description",
        content: "Portfolio of Alex Doe — Full Stack Developer building performant web, mobile, and backend systems."
      },
      { name: "author", content: "Alex Doe" },
      { property: "og:title", content: "Alex Doe — Full Stack Developer" },
      {
        property: "og:description",
        content: "Projects, hackathons, research, and experience."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$5.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(Outlet, {}) });
}
const $$splitComponentImporter$4 = () => import("./index-iXjUUVmm.js");
const Route$4 = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Sakshi Mittal — Full Stack Developer & AI/ML Engineer"
      },
      // [REPLACE WITH YOUR NAME]
      {
        name: "description",
        content: "Portfolio of Sakshi Mittal — Full Stack Developer & AI/ML Engineer. Projects, hackathons, research and experience."
      },
      {
        property: "og:title",
        content: "Sakshi Mittal — Full Stack Developer & AI/ML Engineer"
      },
      {
        property: "og:description",
        content: "Projects, hackathons, research papers, and experience."
      }
    ]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./reset-password-uonF14Yh.js");
const Route$3 = createFileRoute("/admin/reset-password")({
  head: () => ({
    meta: [{
      title: "Reset Password"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./login-ikROadRA.js");
const Route$2 = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{
      title: "Admin Login"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./forgot-password-CsCUDR7r.js");
const Route$1 = createFileRoute("/admin/forgot-password")({
  head: () => ({
    meta: [{
      title: "Forgot Password"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./dashboard-CgW2Dule.js");
const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [{
      title: "Admin Dashboard"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$5
});
const AdminResetPasswordRoute = Route$3.update({
  id: "/admin/reset-password",
  path: "/admin/reset-password",
  getParentRoute: () => Route$5
});
const AdminLoginRoute = Route$2.update({
  id: "/admin/login",
  path: "/admin/login",
  getParentRoute: () => Route$5
});
const AdminForgotPasswordRoute = Route$1.update({
  id: "/admin/forgot-password",
  path: "/admin/forgot-password",
  getParentRoute: () => Route$5
});
const AdminDashboardRoute = Route.update({
  id: "/admin/dashboard",
  path: "/admin/dashboard",
  getParentRoute: () => Route$5
});
const rootRouteChildren = {
  IndexRoute,
  AdminDashboardRoute,
  AdminForgotPasswordRoute,
  AdminLoginRoute,
  AdminResetPasswordRoute
};
const routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
