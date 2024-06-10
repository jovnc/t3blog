"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function login(provider: "google" | "github") {
  return signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
}
