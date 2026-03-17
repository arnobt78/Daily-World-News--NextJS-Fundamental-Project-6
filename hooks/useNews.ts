"use client";

/**
 * useNews - Fetches headlines for a category via React Query.
 * Uses initialData from SSR when category is "general" to avoid loading flash.
 * Refetches when category or filters change (queryKey includes them).
 */
import { useQuery } from "@tanstack/react-query";
import type { Article } from "@/types/news";
import { fetchHeadlinesClient } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

interface UseNewsParams {
  country?: string;
  lang?: string;
  max?: number;
}

export function useNews(
  category: string,
  initialArticles?: Article[],
  params?: UseNewsParams
) {
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: queryKeys.headlines.list(
      category,
      params?.country,
      params?.lang
    ),
    queryFn: () =>
      fetchHeadlinesClient({
        category,
        country: params?.country,
        lang: params?.lang,
        max: params?.max ?? 10,
      }),
    /* SSR data for "general" avoids spinner on first load */
    initialData:
      category === "general" && initialArticles && initialArticles.length > 0
        ? {
            headline: initialArticles[0] ?? null,
            news: initialArticles.slice(1, 10),
          }
        : undefined,
    enabled: !!category,
  });

  return {
    headline: data?.headline ?? null,
    news: data?.news ?? [],
    loading: isLoading,
    error: error instanceof Error ? error.message : error ? "Unknown error" : null,
    isFetching,
    refetch,
  };
}
