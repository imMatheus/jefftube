import { Hono } from "hono";
import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { videos, videoLikes } from "../db/schema";
import { getClientIp, getOrCreateUser } from "./users";

export const videoLikesRoutes = new Hono();

// GET /api/videos/:videoId/like - get user's like status for a video
videoLikesRoutes.get("/videos/:videoId/like", async (c) => {
  const videoId = c.req.param("videoId");
  const ip = getClientIp(c.req.raw);
  const user = await getOrCreateUser(ip);

  const existing = await db
    .select({ isLike: videoLikes.isLike })
    .from(videoLikes)
    .where(
      and(
        eq(videoLikes.videoId, videoId),
        eq(videoLikes.userId, user.id)
      )
    )
    .limit(1);

  return c.json({ userLike: existing.length > 0 ? existing[0].isLike : null });
});

// POST /api/videos/:videoId/like - like a video
videoLikesRoutes.post("/videos/:videoId/like", async (c) => {
  const videoId = c.req.param("videoId");
  const ip = getClientIp(c.req.raw);
  const user = await getOrCreateUser(ip);

  // Check if user already has a reaction
  const existing = await db
    .select()
    .from(videoLikes)
    .where(
      and(
        eq(videoLikes.videoId, videoId),
        eq(videoLikes.userId, user.id)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    if (existing[0].isLike) {
      // Already liked, remove the like
      await db.delete(videoLikes).where(eq(videoLikes.id, existing[0].id));
      // Decrement likes count
      await db.execute(
        `UPDATE videos SET likes = likes - 1 WHERE id = '${videoId}'`
      );
      return c.json({ userLike: null });
    } else {
      // Was dislike, change to like
      await db
        .update(videoLikes)
        .set({ isLike: true })
        .where(eq(videoLikes.id, existing[0].id));
      // Increment likes, decrement dislikes
      await db.execute(
        `UPDATE videos SET likes = likes + 1, dislikes = dislikes - 1 WHERE id = '${videoId}'`
      );
      return c.json({ userLike: true });
    }
  }

  // No existing reaction, create like
  await db.insert(videoLikes).values({
    videoId,
    userId: user.id,
    isLike: true,
  });
  // Increment likes count
  await db.execute(
    `UPDATE videos SET likes = likes + 1 WHERE id = '${videoId}'`
  );

  return c.json({ userLike: true });
});

// POST /api/videos/:videoId/dislike - dislike a video
videoLikesRoutes.post("/videos/:videoId/dislike", async (c) => {
  const videoId = c.req.param("videoId");
  const ip = getClientIp(c.req.raw);
  const user = await getOrCreateUser(ip);

  // Check if user already has a reaction
  const existing = await db
    .select()
    .from(videoLikes)
    .where(
      and(
        eq(videoLikes.videoId, videoId),
        eq(videoLikes.userId, user.id)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    if (!existing[0].isLike) {
      // Already disliked, remove the dislike
      await db.delete(videoLikes).where(eq(videoLikes.id, existing[0].id));
      // Decrement dislikes count
      await db.execute(
        `UPDATE videos SET dislikes = dislikes - 1 WHERE id = '${videoId}'`
      );
      return c.json({ userLike: null });
    } else {
      // Was like, change to dislike
      await db
        .update(videoLikes)
        .set({ isLike: false })
        .where(eq(videoLikes.id, existing[0].id));
      // Decrement likes, increment dislikes
      await db.execute(
        `UPDATE videos SET likes = likes - 1, dislikes = dislikes + 1 WHERE id = '${videoId}'`
      );
      return c.json({ userLike: false });
    }
  }

  // No existing reaction, create dislike
  await db.insert(videoLikes).values({
    videoId,
    userId: user.id,
    isLike: false,
  });
  // Increment dislikes count
  await db.execute(
    `UPDATE videos SET dislikes = dislikes + 1 WHERE id = '${videoId}'`
  );

  return c.json({ userLike: false });
});
