"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { postSchema } from "@/schemas/post";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost, updatePost } from "@/actions/post";
import { useUploadThing } from "@/lib/uploadthings";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Post } from "@/types/post";

export default function EditPostCard({ post }: { post: Post }) {
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      name: post.name,
      content: post.content,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      toast.success("Upload Completed");
    },
    onUploadError: () => {
      toast.error("Upload Failed");
    },
    onUploadBegin: () => {
      toast.info("Uploading image...");
    },
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  const onSubmit = async (data: z.infer<typeof postSchema>) => {
    setIsLoading(true);
    // validate schema
    const validated = postSchema.safeParse(data);
    if (!validated.success) {
      return;
    }
    const postData = {
      name: validated.data.name,
      content: validated.data.content,
      imageUrl: "",
    };

    // Upload image if it exists
    if (validated.data.image) {
      const fileList = [validated.data.image];
      const fileUploadRes = await startUpload(fileList);
      if (!fileUploadRes) {
        return;
      }

      const imageUrl = fileUploadRes[0]?.url;
      if (imageUrl) {
        postData.imageUrl = imageUrl;
      }
    }

    const res = await updatePost(postData, post.id);
    if (res?.error) {
      toast.error(res?.error.message);
      return;
    }

    form.reset();
    router.push("/posts");
    toast.success("Post updated successfully");

    setIsLoading(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Post (ID: {post.id})</CardTitle>
        <CardDescription>
          Edit your current post by filling out the form below.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex w-full flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormDescription>This is your post title.</FormDescription>
                    <FormControl>
                      <Input placeholder="Name of your post" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Type here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input type="file" onChange={handleOnChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full justify-end">
                <Button type="submit" disabled={isLoading}>
                  Edit
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
