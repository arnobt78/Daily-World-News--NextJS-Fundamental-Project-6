/**
 * Shared React Query client. Stale 2 min, GC 30 min, retry 2x.
 * Refetch on mount/reconnect; no refetch on window focus.
 */
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, /* 2 min */
      gcTime: 1000 * 60 * 30,
      retry: 2,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
  },
});
