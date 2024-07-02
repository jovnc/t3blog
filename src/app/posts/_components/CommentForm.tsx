"use client";
import { createComment } from "@/actions/comment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { commentSchema } from "@/schemas/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";
import { z } from "zod";

export default function CommentForm({ postId }: { postId: string }) {
  const {
    register,
    formState: { errors, isLoading },
    handleSubmit,
    reset,
  } = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    const validated = commentSchema.safeParse(data);
    if (!validated.success) {
      return;
    }
    const { content, postId } = validated.data;
    try {
      await createComment({ postId, content });
      reset();
      toast.success("Comment created");
    } catch (error) {
      toast.error("Failed to post comment");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-auto flex flex-col gap-4"
    >
      <Input type="hidden" {...register("postId")} value={postId} />
      <Input
        placeholder="Add a comment"
        {...register("content", { required: "Please input a comment" })}
      />
      {errors.postId && (
        <p className="text-sm text-red-500">{errors.postId.message}</p>
      )}
      <Button type="submit" className="h-[30px]" disabled={isLoading}>
        {isLoading ? <FaSpinner /> : "Comment"}
      </Button>
    </form>
  );
}
