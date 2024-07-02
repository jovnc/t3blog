import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { posts } from "@/server/db/schema";
import { serverPostSchema } from "@/schemas/post";
import { eq } from "drizzle-orm";
import { withCursorPagination } from "drizzle-pagination";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(serverPostSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        userId: ctx?.session?.user.id,
        updatedAt: new Date(),
        name: input.name,
        content: input.content,
        imageUrl: input.imageUrl,
      });
    }),

  update: protectedProcedure
    .input(serverPostSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(posts)
        .set({
          updatedAt: new Date(),
          name: input.name,
          content: input.content,
          imageUrl: input.imageUrl,
        })
        .where(eq(posts.id, input.id));
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // check if the user is the owner of the post
      const user = await ctx.auth.user;
      const post = await ctx.db.query.posts.findFirst({
        where: (posts, { eq, and }) =>
          and(eq(posts.id, input.id), eq(posts.userId, user?.id)),
      });

      if (!post) {
        throw new Error("Post not found");
      }

      await ctx.db.delete(posts).where(eq(posts.id, input.id));
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      with: {
        users: true,
      },
    });
  }),

  getMyPost: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findMany({
      where: (posts, { eq }) => eq(posts.userId, ctx?.session?.user.id),
      with: {
        users: true,
      },
    });
  }),

  getPostById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    const res = ctx.db.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, input),
      with: {
        users: true,
      },
    });

    if (!res) {
      throw new Error("Post not found");
    }

    return res;
  }),

  getInfinitePosts: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.string().nullish(),
        sortOrder: z.enum(["Newest", "Oldest"]),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input;
      const orderDirection = input.sortOrder === "Newest" ? "desc" : "asc";
      const data = await ctx.db.query.posts.findMany({
        ...withCursorPagination({
          limit,
          cursors: [
            [
              posts.createdAt,
              orderDirection,
              cursor ? new Date(cursor) : undefined,
            ],
          ],
        }),
        with: {
          users: true,
        },
        orderBy: (posts, { desc, asc }) => {
          return input.sortOrder === "Newest"
            ? desc(posts.createdAt)
            : asc(posts.createdAt);
        },
      });

      return {
        data,
        nextCursor:
          data.length === limit
            ? data[data.length - 1]?.createdAt.toISOString()
            : null,
      };
    }),
});
