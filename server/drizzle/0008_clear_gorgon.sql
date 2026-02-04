ALTER TABLE "comments" ALTER COLUMN "video_id" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "video_likes" ALTER COLUMN "video_id" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "videos" ALTER COLUMN "id" SET DATA TYPE varchar(50);