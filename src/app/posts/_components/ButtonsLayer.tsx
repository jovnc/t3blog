"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ArrowUpDownIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { FaPlusCircle } from "react-icons/fa";

export default function ButtonsLayer({ username }: { username: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="flex w-full justify-between gap-2 px-4 py-4">
      <div className="w-1/2">
        <div className="text-xl font-bold text-black dark:text-white">
          Welcome back, {username}!
        </div>
      </div>
      <div className="flex w-1/2 justify-end gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-black dark:text-white"
            >
              <ArrowUpDownIcon className="h-4 w-4" />
              Sort by: {searchParams.get("sort") || "Newest"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]" align="end">
            <DropdownMenuRadioGroup
              value={searchParams.get("sort") || "Newest"}
              onValueChange={(value: string) => {
                router.push(pathname + "?" + createQueryString("sort", value));
              }}
            >
              <DropdownMenuRadioItem
                value="Newest"
                className="hover:cursor-pointer"
              >
                Newest
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="Oldest"
                className="hover:cursor-pointer"
              >
                Oldest
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <div className="relative">
          <Input placeholder="Search posts..." />
          <SearchIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-black dark:text-gray-400" />
          <span className="sr-only">Search</span>
        </div> */}
        <Button
          variant="outline"
          className="flex flex-row gap-2 text-black dark:text-white"
          asChild
        >
          <Link href="/posts/create">
            <FaPlusCircle />
            Create Post
          </Link>
        </Button>
      </div>
    </div>
  );
}
