import NotFound from "@/app/not-found";
import { auth } from "@/auth";
import { isUUID } from "@/lib/utils";
import { api } from "@/trpc/server";
import EditPostCard from "../../_components/EditPostCard";

export default async function page({ params }: { params: { id: string } }) {
  const id = params.id[0];
  const session = await auth();

  if (!session || !id || !isUUID(id)) {
    return <NotFound />;
  }

  const post = await api.post.getPostById(id);

  if (!post || post.userId !== session.user.id) {
    return <NotFound />;
  }

  return (
    <main className="flex w-full flex-grow flex-col p-5 text-white">
      <div className="items container flex w-full flex-grow flex-col items-center gap-8 px-4 py-12">
        <EditPostCard post={post} />
      </div>
    </main>
  );
}
