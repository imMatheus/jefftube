import { desc, eq, sql } from "drizzle-orm";
import { db } from "./db";
import { videos } from "./db/schema";

const server = Bun.serve({
  port: 3001,
  async fetch(req) {
    const url = new URL(req.url);

    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // GET /api/videos - return all videos sorted by most views
    if (url.pathname === "/api/videos" && req.method === "GET") {
      const allVideos = await db.select().from(videos).orderBy(desc(videos.views));
      return Response.json(allVideos, { headers: corsHeaders });
    }

    // POST /api/videos/:id/view - increment view count
    const viewMatch = url.pathname.match(/^\/api\/videos\/([^/]+)\/view$/);
    if (viewMatch && req.method === "POST") {
      const videoId = viewMatch[1];

      const result = await db
        .update(videos)
        .set({ views: sql`${videos.views} + 1` })
        .where(eq(videos.id, videoId))
        .returning();

      if (result.length === 0) {
        return Response.json(
          { error: "Video not found" },
          { status: 404, headers: corsHeaders }
        );
      }

      return Response.json({ views: result[0].views }, { headers: corsHeaders });
    }

    // 404 for other routes
    return Response.json(
      { error: "Not found" },
      { status: 404, headers: corsHeaders }
    );
  },
});

console.log(`Server running at http://localhost:${server.port}`);
