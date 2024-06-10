import Link from "next/link";
import { Button } from "../ui/button";

export default function SignInPageButton() {
  return (
    <Button variant="outline">
      <Link href="/auth/signin">Sign In</Link>
    </Button>
  );
}
