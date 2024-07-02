import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GetStartedButton() {
  return (
    <Button variant={"outline"} className="w-1/2" asChild>
      <Link href="/auth/signin" className="text-black dark:text-white">
        Get Started
      </Link>
    </Button>
  );
}
