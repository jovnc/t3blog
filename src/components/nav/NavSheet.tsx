"use client";

import { useState } from "react";
import { Menu, Package2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import NavSheetLink from "./NavSheetLink";

export default function NavSheet({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
            onClick={() => setSheetOpen(false)}
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">T3 Blog</span>
          </Link>

          <NavSheetLink href="/" setSheetOpen={setSheetOpen}>
            Home
          </NavSheetLink>

          {isLoggedIn && (
            <NavSheetLink href="/posts" setSheetOpen={setSheetOpen}>
              Posts
            </NavSheetLink>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
