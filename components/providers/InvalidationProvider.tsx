"use client";

/**
 * InvalidationProvider - Invalidates news cache on route change.
 * Skips first mount (prevPathname null); invalidates on subsequent navigations.
 */
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
      invalidateAllNews(); /* Refetch when user navigates */
    }
    prevPathname.current = pathname;
  }, [pathname]);

  return <>{children}</>;
}
