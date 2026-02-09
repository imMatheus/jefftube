import { readFileSync } from "fs";
import { join } from "path";

const dist = join(import.meta.dir, "dist");
const indexHtml = readFileSync(join(dist, "index.html"));

Bun.serve({
  port: Number(process.env.PORT) || 8080,
  async fetch(req) {
    const url = new URL(req.url);
    const filePath = join(dist, url.pathname);
    const file = Bun.file(filePath);

    if (await file.exists()) {
      return new Response(file);
    }

    return new Response(indexHtml, {
      headers: { "content-type": "text/html" },
    });
  },
});
