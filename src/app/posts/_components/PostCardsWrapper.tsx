"use client";
import PostCard from "./PostCard";
import { Session } from "@/types/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import PostCardView from "./PostCardView";
import { useEffect, useMemo, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { FaSpinner } from "react-icons/fa";
import { api } from "@/trpc/react";
import { LoadingSpinner } from "@/components/ui/loading";
import { useSearchParams } from "next/navigation";

export default function PostCardsWrapper({ session }: { session: Session }) {
  const data = useSearchParams();

  const sortOrder = data.get("sort") ?? "Newest";

  const {
    data: postsRaw,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = api.post.getInfinitePosts.useInfiniteQuery(
    { limit: 12, sortOrder: sortOrder as "Newest" | "Oldest" },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const viewportRef = useRef<HTMLDivElement>(null);
  const { entry, ref } = useIntersection({
    root: viewportRef.current,
    threshold: 1,
  });

  useEffect(() => {
    // if the user reaches the bottom of the page, and there are more posts to fetch, fetch them
    if (
      entry?.isIntersecting &&
      postsRaw?.pages.length &&
      postsRaw?.pages[postsRaw?.pages.length - 1]?.nextCursor &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry]);

  const posts = useMemo(
    () => postsRaw?.pages.flatMap((page) => page.data) ?? [],
    [postsRaw],
  );

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-12 px-4 sm:grid-cols-2 xl:grid-cols-3">
        {posts &&
          posts.map((post, index) => {
            if (index === posts.length - 1) {
              return (
                <div ref={ref} key={post.id + sortOrder}>
                  <Dialog>
                    <PostCard session={session} post={post} />
                    <DialogContent
                      className="max-w-full"
                      aria-describedby="post content"
                    >
                      <DialogTitle></DialogTitle>
                      <DialogDescription></DialogDescription>
                      <PostCardView session={session} post={post} />
                    </DialogContent>
                  </Dialog>
                </div>
              );
            } else {
              return (
                <div key={post.id + sortOrder}>
                  <Dialog>
                    <PostCard session={session} post={post} />
                    <DialogContent
                      className="max-w-full"
                      aria-describedby="post content"
                    >
                      <DialogTitle></DialogTitle>
                      <DialogDescription></DialogDescription>
                      <PostCardView session={session} post={post} />
                    </DialogContent>
                  </Dialog>
                </div>
              );
            }
          })}
      </div>
      {isFetchingNextPage && (
        <div className="flex justify-center">
          <FaSpinner />
        </div>
      )}
      {!isFetchingNextPage &&
        postsRaw?.pages.length &&
        postsRaw?.pages[postsRaw?.pages.length - 1]?.nextCursor === null && (
          <div className=" text-center opacity-60">
            <p className="text-xs md:text-sm">No more posts to load</p>
          </div>
        )}
    </>
  );
}
