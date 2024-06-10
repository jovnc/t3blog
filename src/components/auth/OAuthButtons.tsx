import React from "react";
import SignInButton from "./SignInButton";

export default function OAuthButtons() {
  return (
    <div className="flex flex-row gap-3">
      <SignInButton provider="github" />
      <SignInButton provider="google" />
    </div>
  );
}
