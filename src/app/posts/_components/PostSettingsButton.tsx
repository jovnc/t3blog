import { Post } from "@/types/post";
import { Session } from "@/types/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaCog } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeletePostButton from "./DeletePostButton";

export default function PostSettingsButton({
  post,
  session,
}: {
  post: Post;
  session: Session;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"ghost"}>
          <FaCog />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Post Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/posts/edit/[id]" as={`/posts/edit/${post?.id}`}>
          <DropdownMenuItem className="hover:cursor-pointer">
            Edit
          </DropdownMenuItem>
        </Link>
        <DeletePostButton post={post}>Delete</DeletePostButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
