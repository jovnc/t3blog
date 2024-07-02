import { auth } from "@/auth";
import React from "react";
import ButtonsLayer from "./_components/ButtonsLayer";
import { Separator } from "@/components/ui/separator";
import PostCardsWrapper from "./_components/PostCardsWrapper";

export default async function page() {
  const session = await auth();

  if (!session) {
    return <div>Unauthorized</div>;
  }

  return (
    <main className="flex w-full flex-grow flex-col p-5 text-white">
      <div className="container flex w-full flex-col gap-8 px-4">
        <ButtonsLayer username={session.user.name} />
        <Separator />
        <PostCardsWrapper session={session} />
      </div>
    </main>
  );
}
