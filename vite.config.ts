import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: true,
  tanstackStart: {
    server: {
      entry: "server",
      preset: "vercel",
    },
  },
  vite: {
    resolve: {
      dedupe: ["react", "react-dom", "@tanstack/react-router"],
    },
    define: {
      "process.env.NODE_ENV": '"production"',
    },
  },
});