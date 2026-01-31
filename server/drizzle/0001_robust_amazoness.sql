-- Drop and recreate the length column since we're changing from time string to seconds
ALTER TABLE "videos" DROP COLUMN "length";
ALTER TABLE "videos" ADD COLUMN "length" integer NOT NULL DEFAULT 0;