"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavSheetLink({
  href,
  children,
  setSheetOpen,
}: {
  href: string;
  children: React.ReactNode;
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const linkStyle = isActive
    ? "hover:text-foreground"
    : "text-muted-foreground hover:text-foreground";

  return (
    <Link href={href} className={linkStyle} onClick={() => setSheetOpen(false)}>
      {children}
    </Link>
  );
}
