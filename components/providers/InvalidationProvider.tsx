"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { invalidateAllNews } from "@/lib/invalidateNews";

export function InvalidationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    if (prevPathname.current !== null) {
      invalidateAllNews();
    }
    prevPathname.current = pathname;
  }, [pathname]);

  return <>{children}</>;
}
