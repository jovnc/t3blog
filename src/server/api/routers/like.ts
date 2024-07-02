import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { likes } from "@/server/db/schema";
import { and, count, eq } from "drizzle-orm";
import { z } from "zod";

export const likeRouter = createTRPCRouter({
  likePost: protectedProcedure
    .input(z.object({ postId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(likes)
        .values({ userId: input.userId, postId: input.postId });
    }),
  removeLikePost: protectedProcedure
    .input(z.object({ postId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(likes)
        .where(
          and(eq(likes.userId, input.userId), eq(likes.postId, input.postId)),
        );
    }),
  isPostLiked: protectedProcedure
    .input(z.object({ postId: z.string(), userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const liked = await ctx.db
        .select({ liked: likes.id })
        .from(likes)
        .where(
          and(eq(likes.userId, input.userId), eq(likes.postId, input.postId)),
        );
      if (liked.length === 0) {
        return {
          liked: false,
        };
      }
      return {
        liked: true,
      };
    }),
  likeCountByPostId: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select({ count: count() })
        .from(likes)
        .where(eq(likes.postId, input.postId));
    }),
});
