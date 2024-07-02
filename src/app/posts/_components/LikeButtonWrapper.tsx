"use client";
import { api } from "@/trpc/react";
import LikeButton from "./LikeButton";
import { LoadingSpinner } from "@/components/ui/loading";

export default function LikeButtonWrapper({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) {
  const { data, error, isLoading } = api.like.isPostLiked.useQuery({
    postId,
    userId,
  });

  const { data: likeCount } = api.like.likeCountByPostId.useQuery({ postId });

  const liked = data?.liked ?? false;

  if (error) {
    console.error(error);
    return <div>Error loading</div>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (likeCount?.[0]?.count == undefined) {
    return <LoadingSpinner />;
  }

  return (
    <LikeButton
      liked={liked}
      likeCount={likeCount?.[0]?.count}
      userId={userId}
      postId={postId}
    />
  );
}
