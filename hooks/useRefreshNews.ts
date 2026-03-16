"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invalidateAllNews } from "@/lib/invalidateNews";
import { queryKeys } from "@/lib/queryKeys";

export function useRefreshNews() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await invalidateAllNews();
      await queryClient.refetchQueries({ queryKey: queryKeys.headlines.all });
      await queryClient.refetchQueries({ queryKey: queryKeys.search.all });
    },
  });

  return {
    refresh: mutation.mutate,
    refreshAsync: mutation.mutateAsync,
    isRefreshing: mutation.isPending,
  };
}
