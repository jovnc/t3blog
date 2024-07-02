"use server";

import { serverPostSchema } from "@/schemas/post";
import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createPost = async (data: z.infer<typeof serverPostSchema>) => {
  const validated = serverPostSchema.safeParse(data);
  if (!validated.success) {
    return {
      error: validated.error,
    };
  }

  const { name, content, imageUrl } = validated.data;

  const post = await api.post.create({
    name,
    content,
    imageUrl,
  });

  revalidatePath("/posts");

  return { post };
};

export const updatePost = async (
  data: z.infer<typeof serverPostSchema>,
  id: string,
) => {
  const validated = serverPostSchema.safeParse(data);
  if (!validated.success) {
    return {
      error: validated.error,
    };
  }

  const { name, content, imageUrl } = validated.data;

  const post = await api.post.update({
    id,
    name,
    content,
    imageUrl,
  });

  revalidatePath("/posts");

  return { post };
};

export const deletePost = async (id: string) => {
  try {
    const post = await api.post.delete({ id });
    revalidatePath("/posts");
    return { post };
  } catch (error) {
    return {
      error,
    };
  }
};
