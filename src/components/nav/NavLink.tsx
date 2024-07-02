"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const linkStyle = isActive
    ? "text-foreground transition-colors hover:text-foreground"
    : "text-muted-foreground transition-colors hover:text-foreground";

  return (
    <Link href={href} className={linkStyle}>
      {children}
    </Link>
  );
}
