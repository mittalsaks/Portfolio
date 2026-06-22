import { createServer } from "http";
import { createApp, toNodeListener } from "h3";

async function startServer() {
  const mod = await import("./dist/server/server.js");
  const handler = mod.default;
  
  const app = createApp();
  app.use(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
    });
    const response = await handler.fetch(request, {}, {});
    res.statusCode = response.status;
    response.headers.forEach((v, k) => res.setHeader(k, v));
    const text = await response.text();
    res.end(text);
  });

  const port = process.env.PORT || 3000;
  createServer(toNodeListener(app)).listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer().catch(console.error);
