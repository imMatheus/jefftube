import { Hono } from "hono";
import { desc } from "drizzle-orm";
import { db } from "../db";
import { videos } from "../db/schema";

export const videosRoutes = new Hono();

// GET /api/videos - return all videos sorted by most views
videosRoutes.get("/videos", async (c) => {
  const allVideos = await db.select().from(videos).orderBy(desc(videos.views));
  return c.json(allVideos);
});
