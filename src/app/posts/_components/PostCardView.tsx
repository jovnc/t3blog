"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Post } from "@/types/post";
import { Session } from "@/types/user";
import Image from "next/image";
import React from "react";
import CommentForm from "./CommentForm";
import { api } from "@/trpc/react";
import CommentList from "./CommentList";

export default function PostCardView({
  session,
  post,
}: {
  session: Session;
  post: Post;
}) {
  const comments = api.comment.getComments.useQuery({ postId: post.id });
  const commentsData = comments.data ?? [];

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-2 gap-4">
        {post.imageUrl && (
          <div>
            <Image
              src={post?.imageUrl ?? ""}
              alt="Post image"
              width={500}
              height={500}
            />
          </div>
        )}
        <div
          className={`flex flex-col gap-4 ${!post.imageUrl && "col-span-2"}`}
        >
          <div className="flex flex-row gap-4">
            <Avatar>
              <AvatarImage src={post?.users?.image ?? ""} />
              <AvatarFallback>{post?.users?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{post?.users?.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                @{post?.users?.name?.toLowerCase().replaceAll(" ", "")}
              </div>
            </div>
          </div>
          <Separator />
          <p className="text-md flex flex-row gap-2">
            <span className="font-bold">
              @{post?.users?.name?.toLowerCase().replaceAll(" ", "")}{" "}
            </span>
            {post?.content}
          </p>
          <p className="text-sm font-extralight">
            Created at {new Date(post.createdAt).toLocaleString()}
          </p>

          <Separator />
          <p className="text font-bold">Comments</p>
          <CommentList comments={commentsData} />
          <CommentForm postId={post.id} />
        </div>
      </div>
    </div>
  );
}
