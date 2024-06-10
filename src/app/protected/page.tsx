import { auth } from "@/auth";
import React from "react";
import { CrudShowcase } from "../_components/crud-showcase";
import TestComponent from "./_components/TestComponent";

export default async function page() {
  const session = await auth();

  if (!session) {
    return <div>Unauthorized</div>;
  }

  return (
    <main className="flex flex-grow flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Simple <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
        <TestComponent />
        <CrudShowcase />
      </div>
    </main>
  );
}