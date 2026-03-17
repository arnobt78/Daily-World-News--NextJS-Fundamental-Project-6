"use client";

/**
 * useSearch - Fetches search results via React Query.
 * Only runs when query is non-empty (enabled: !!query.trim()).
 * Page state is local; changing it triggers a new fetch.
 */
import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSearchClient } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

interface UseSearchParams {
  lang?: string;
  country?: string;
  max?: number;
  sortby?: "publishedAt" | "relevance";
}

export function useSearch(query: string, params?: UseSearchParams) {
  const [page, setPageState] = useState(1);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.search.list(
      query.trim(),
      page,
      params?.country,
      params?.lang
    ),
    queryFn: () =>
      fetchSearchClient({
        q: query.trim(),
        page,
        lang: params?.lang,
        country: params?.country,
        max: params?.max,
        sortby: params?.sortby,
      }),
    enabled: !!query.trim(), /* No fetch when search is empty */
  });

  const setPage = useCallback((p: number) => {
    setPageState(p);
  }, []);

  return {
    articles: data?.articles ?? [],
    totalArticles: data?.totalArticles ?? 0,
    loading: isLoading,
    error: error instanceof Error ? error.message : error ? "Unknown error" : null,
    page,
    setPage,
    refetch,
  };
}
