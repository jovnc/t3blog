import { signOut } from "@/auth";
import React from "react";
import { Button } from "../ui/button";

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button
        type="submit"
        size="sm"
        variant="outline"
        className="flex flex-row gap-2"
      >
        Sign Out
      </Button>
    </form>
  );
}
