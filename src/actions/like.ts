"use server";

import { auth } from "@/auth";
import { likeSchema } from "@/schemas/like";
import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createLike = async (data: z.infer<typeof likeSchema>) => {
  const validated = likeSchema.safeParse(data);
  if (!validated.success) {
    return {
      error: validated.error,
    };
  }
  const { postId } = validated.data;

  // get current user session details
  const session = await auth();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  const { id: userId } = session.user;

  // create like
  try {
    const post = await api.like.likePost({ userId, postId });
    return { post };
  } catch (error) {
    return {
      error,
    };
  }
};

export const removeLike = async (data: z.infer<typeof likeSchema>) => {
  const validated = likeSchema.safeParse(data);
  if (!validated.success) {
    return {
      error: validated.error,
    };
  }
  const { postId } = validated.data;

  // get current user session details
  const session = await auth();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  const { id: userId } = session.user;

  try {
    const post = await api.like.removeLikePost({ userId, postId });
    return { post };
  } catch (error) {
    return {
      error,
    };
  }
};
