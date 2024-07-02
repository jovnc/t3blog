"use server";

import { commentSchema } from "@/schemas/comment";
import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createComment = async (data: z.infer<typeof commentSchema>) => {
  const validated = commentSchema.safeParse(data);
  if (!validated.success) {
    return {
      error: validated.error,
    };
  }
  const { postId, content } = validated.data;
  try {
    const comment = await api.comment.createComment({ postId, content });
    revalidatePath("/posts");
    return { comment };
  } catch (error) {
    return {
      error,
    };
  }
};
