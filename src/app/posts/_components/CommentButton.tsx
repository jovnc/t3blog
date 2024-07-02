"use client";
import { createComment } from "@/actions/comment";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { commentSchema } from "@/schemas/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircleIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function CommentButton({ postId }: { postId: string }) {
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    const validated = commentSchema.safeParse(data);
    if (!validated.success) {
      return;
    }
    const { content } = validated.data;
    await createComment({ postId, content });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <MessageCircleIcon className="h-5 w-5" />
          <span className="sr-only">Comment</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Add Comment</h4>
            <p className="text-sm text-muted-foreground">
              Add a new comment to the post
            </p>
          </div>
          <div className="grid gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        id="width"
                        defaultValue=""
                        placeholder="Comment"
                        className="col-span-2 h-8"
                        {...field}
                      />
                    </FormControl>
                  )}
                />

                <Button type="submit">Comment</Button>
              </form>
            </Form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
