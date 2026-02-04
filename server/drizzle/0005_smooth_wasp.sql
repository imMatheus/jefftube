ALTER TABLE "videos" ADD COLUMN "has_thumbnail" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "videos" ADD CONSTRAINT "videos_filename_unique" UNIQUE("filename");