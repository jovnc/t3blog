ALTER TABLE "t3blog_post" DROP CONSTRAINT "t3blog_post_like_t3blog_like_id_fk";
--> statement-breakpoint
ALTER TABLE "t3blog_post" DROP COLUMN IF EXISTS "like";