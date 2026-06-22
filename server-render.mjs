import { createServer } from "http";

async function startServer() {
  const mod = await import("./dist/server/server.js");
  const handler = mod.default;
  
  const port = process.env.PORT || 3000;
  
  createServer(async (req, res) => {
    try {
      const protocol = "https";
      const host = req.headers.host || "localhost";
      const url = new URL(req.url, `${protocol}://${host}`);
      
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) {
        if (value) headers.set(key, Array.isArray(value) ? value.join(",") : value);
      }

      const request = new Request(url.toString(), {
        method: req.method,
        headers,
      });
      
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
