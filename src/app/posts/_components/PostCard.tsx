"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Post } from "@/types/post";
import Image from "next/image";
import { Session } from "@/types/user";
import LikeButtonWrapper from "./LikeButtonWrapper";
import CommentButton from "./CommentButton";
import { DialogTrigger } from "@/components/ui/dialog";
import PostSettingsButton from "./PostSettingsButton";

export default function PostCard({
  post,
  session,
}: {
  post: Post;
  session: Session;
}) {
  const isCurrentUserPost = session?.user?.id === post?.users?.id;
  const currentUserId = session?.user?.id;

  return (
    <Card className="h-fit w-full rounded-lg bg-white shadow-md hover:cursor-pointer hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-black">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src={post?.users?.image ?? ""} />
          <AvatarFallback>{post?.users?.name?.[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <div className="font-medium">{post?.users?.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            @{post?.users?.name?.toLowerCase().replaceAll(" ", "")}
          </div>
        </div>
        <div className="ml-auto">
          {isCurrentUserPost && (
            <PostSettingsButton post={post} session={session} />
          )}
        </div>
      </CardHeader>
      <Separator />
      <DialogTrigger asChild>
        <CardContent className="p-4">
          <div className="flex flex-col space-y-4">
            <p>{post?.content}</p>
            <div className="flex items-center justify-center">
              {post.imageUrl && (
                <Image
                  src={post?.imageUrl ?? ""}
                  alt={post?.name}
                  width={600}
                  height={350}
                  className="h-[350px] w-[600px] self-center rounded-lg bg-gray-50 object-contain dark:bg-gray-950"
                />
              )}
            </div>
          </div>
        </CardContent>
      </DialogTrigger>
      <CardFooter className="flex items-center justify-between self-end border-t p-4 dark:border-gray-800">
        <div className="flex w-full items-center gap-4 text-gray-500 dark:text-gray-400">
          <CommentButton postId={post?.id} />
          <LikeButtonWrapper postId={post?.id} userId={currentUserId} />
        </div>
      </CardFooter>
    </Card>
  );
}
