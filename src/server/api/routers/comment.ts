import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { comments } from "@/server/db/schema";
import { z } from "zod";

export const commentRouter = createTRPCRouter({
  createComment: protectedProcedure
    .input(z.object({ postId: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(comments).values({
        content: input.content,
        userId: ctx.session?.user.id,
        postId: input.postId,
      });
    }),
  getComments: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      const comment = await ctx.db.query.comments.findMany({
        where: (comments, { eq }) => eq(comments.postId, input.postId),
        orderBy: (comments, { desc }) => desc(comments.createdAt),
        with: {
          users: true,
        },
      });
      return comment;
    }),
});
