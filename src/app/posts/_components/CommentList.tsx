import React from "react";

export default function CommentList({ comments }: { comments: any[] }) {
  if (!comments || comments.length === 0) {
    return <div>No comments</div>;
  }

  return (
    <div className="mb-6 flex flex-col gap-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex flex-row items-center gap-4">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              @{comment.users.name.toLowerCase().replaceAll(" ", "")}
            </div>
          </div>
          <p className="text-md flex flex-row gap-2">{comment.content}</p>
          <p className="ml-auto text-sm font-extralight">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
