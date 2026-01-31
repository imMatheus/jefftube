import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const videos = pgTable("videos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  filename: varchar("filename", { length: 255 }).notNull(),
  length: varchar("length", { length: 20 }).notNull(),
});

export type Video = typeof videos.$inferSelect;
export type NewVideo = typeof videos.$inferInsert;
