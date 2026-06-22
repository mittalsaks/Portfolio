import { defineConfig } from "@lovable.dev/vite-tanstack-config";
export default defineConfig({
  tanstackStart: {
    server: {
      preset: "static",
    },
    routers: {
      client: {
        entry: "./src/entry-client.tsx",
      },
    },
  },
});
