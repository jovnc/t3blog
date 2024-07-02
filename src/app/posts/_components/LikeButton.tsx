"use client";
import { createLike, removeLike } from "@/actions/like";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import React, { useOptimistic, useState, useTransition } from "react";

export default function LikeButton({
  liked,
  userId,
  postId,
  likeCount,
}: {
  liked: boolean;
  userId: string;
  postId: string;
  likeCount: number;
}) {
  const [like, setLike] = useState<Boolean>(liked);

  const [likeCounts, setLikeCounts] = useState(likeCount);

  const handleClick = async () => {
    if (like) {
      setLikeCounts((prev) => prev - 1);
      const post = await removeLike({ postId });
    } else {
      setLikeCounts((prev) => prev + 1);
      const post = await createLike({ postId });
    }
    setLike((prev) => !prev);
  };

  return (
    <div className="flex w-full justify-between">
      <Button variant="ghost" size="icon" onClick={handleClick}>
        <HeartIcon className={`h-5 w-5 ${like ? "fill-red-500" : ""}`} />
        <span className="sr-only">Like</span>
      </Button>
      <div className="mt-auto items-center text-sm">
        Like Count: {likeCounts}
      </div>
    </div>
  );
}
