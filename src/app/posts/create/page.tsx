import CreatePostCard from "../_components/CreatePostCard";

export default function page() {
  return (
    <main className="flex w-full flex-grow flex-col p-5 text-white">
      <div className="items container flex w-full flex-grow flex-col items-center gap-8 px-4 py-12">
        <CreatePostCard />
      </div>
    </main>
  );
}
