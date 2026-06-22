import { createServer } from "http";
import { readFileSync, existsSync } from "fs";
import { join, extname } from "path";

const MIME = {
  ".js": "application/javascript",
  ".css": "text/css",
  ".html": "text/html",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

async function startServer() {
  const mod = await import("./dist/server/server.js");
  const handler = mod.default;
  const port = process.env.PORT || 3000;

  createServer(async (req, res) => {
    try {
      // Serve static assets
      if (req.url.startsWith("/assets/")) {
        const filePath = join("dist/client", req.url);
        if (existsSync(filePath)) {
          const ext = extname(filePath);
          res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
          res.setHeader("Cache-Control", "public, max-age=31536000");
          res.end(readFileSync(filePath));
          return;
        }
      }

      const protocol = "https";
      const host = req.headers.host || "localhost";
      const url = new URL(req.url, `${protocol}://${host}`);
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) {
        if (value) headers.set(key, Array.isArray(value) ? value.join(",") : value);
      }
      const request = new Request(url.toString(), { method: req.method, headers });
      const response = await handler.fetch(request, {}, {});
      res.statusCode = response.status;
      response.headers.forEach((value, key) => res.setHeader(key, value));
      const buffer = await response.arrayBuffer();
      res.end(Buffer.from(buffer));
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  }).listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer().catch(console.error);
