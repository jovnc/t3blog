"use client";

import { api } from "@/trpc/react";

export default function TestComponent() {
  const users = api.user.getUser.useQuery();

  return <div>{JSON.stringify(users)}</div>;
}
