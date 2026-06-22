import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: true,
  tanstackStart: {
    server: { 
      entry: "server",
    },
  },
  vite: {
    build: {
      minify: true,
    },
    define: {
      "process.env.NODE_ENV": '"production"',
    },
  },
});