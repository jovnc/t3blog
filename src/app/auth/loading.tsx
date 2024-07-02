import { LoadingSpinner } from "@/components/ui/loading";
import React from "react";

export default function loading() {
  return (
    <div className="flex w-full flex-grow items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
