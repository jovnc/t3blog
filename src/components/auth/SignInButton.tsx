"use client";
import { Button } from "../ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { login } from "@/actions/auth";

type Providers = "google" | "github";

export default function SignInButton({ provider }: { provider: Providers }) {
  return (
    <form
      action={async () => {
        await login(provider);
      }}
    >
      <Button type="submit" className="flex flex-row gap-2">
        {provider == "google" && <FaGoogle />}
        {provider == "github" && <FaGithub />}
        Sign In with {provider.charAt(0).toUpperCase() + provider.slice(1)}
      </Button>
    </form>
  );
}
