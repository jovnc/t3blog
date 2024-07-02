import { z } from "zod";

const imageFileSchema = z
  .instanceof(File)
  .refine(
    (file) => ["image/jpeg", "image/png"].includes(file.type),
    "Only image files are allowed",
  );

export const postSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  image: imageFileSchema.optional(),
});

export const serverPostSchema = postSchema.omit({ image: true }).extend({
  imageUrl: z.string().optional(),
});
