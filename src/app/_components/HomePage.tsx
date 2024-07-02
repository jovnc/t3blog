import GetStartedButton from "./GetStartedButton";

export default function HomePage() {
  return (
    <main className="flex flex-grow flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Simple <span className="text-[hsl(280,100%,70%)]">T3</span> Blog
        </h1>
        <h2 className="text-bold text-center font-semibold">
          Built using the T3 Stack: Typescript, TailwindCSS, tRPC with NextJS,
          NextAuth, shadcn-ui, Drizzle ORM
        </h2>
        <GetStartedButton />
      </div>
    </main>
  );
}
