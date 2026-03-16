"use client";

import { useQuery } from "@tanstack/react-query";
import type { Article } from "@/types/news";
import { fetchHeadlinesClient } from "@/lib/api";

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
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["headlines", category, params?.country, params?.lang],
    queryFn: () =>
      fetchHeadlinesClient({
        category,
        country: params?.country,
        lang: params?.lang,
        max: params?.max ?? 10,
      }),
    initialData:
      category === "general" && initialArticles && initialArticles.length > 0
        ? {
            headline: initialArticles[0] ?? null,
            news: initialArticles.slice(1, 7),
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
  };
}
