import { pgTable, uuid, varchar, integer } from "drizzle-orm/pg-core";

export const videos = pgTable("videos", {
  id: uuid("id").primaryKey(),
  title: varchar("title", { length: 255 }),
  filename: varchar("filename", { length: 255 }).notNull(),
  length: integer("length").notNull(),
  views: integer("views").notNull().default(0),
});

export type Video = typeof videos.$inferSelect;
export type NewVideo = typeof videos.$inferInsert;
