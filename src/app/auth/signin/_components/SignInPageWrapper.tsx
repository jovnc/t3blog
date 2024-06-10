import React, { Suspense } from "react";
import { SignInPage } from "./SignInPage";

export default function SignInPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInPage />
    </Suspense>
  );
}
