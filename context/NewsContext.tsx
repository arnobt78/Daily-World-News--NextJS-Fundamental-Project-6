"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { CountryCode } from "@/data/countries";
import type { LangCode } from "@/data/languages";
import { queryKeys } from "@/lib/queryKeys";

interface NewsFilters {
  country: CountryCode | "";
  lang: LangCode | "";
}

interface NewsContextValue {
  filters: NewsFilters;
  setCountry: (country: CountryCode | "") => void;
  setLang: (lang: LangCode | "") => void;
}

const defaultFilters: NewsFilters = {
  country: "",
  lang: "",
};

const NewsContext = createContext<NewsContextValue | null>(null);

export function NewsProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<NewsFilters>(defaultFilters);

  const setCountry = useCallback((country: CountryCode | "") => {
    setFilters((prev) => ({ ...prev, country }));
    queryClient.invalidateQueries({ queryKey: queryKeys.headlines.all });
    queryClient.invalidateQueries({ queryKey: queryKeys.search.all });
  }, [queryClient]);

  const setLang = useCallback((lang: LangCode | "") => {
    setFilters((prev) => ({ ...prev, lang }));
    queryClient.invalidateQueries({ queryKey: queryKeys.headlines.all });
    queryClient.invalidateQueries({ queryKey: queryKeys.search.all });
  }, [queryClient]);

  return (
    <NewsContext.Provider value={{ filters, setCountry, setLang }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNewsContext(): NewsContextValue {
  const ctx = useContext(NewsContext);
  if (!ctx) {
    throw new Error("useNewsContext must be used within NewsProvider");
  }
  return ctx;
}
