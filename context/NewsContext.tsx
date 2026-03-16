"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { CountryCode } from "@/data/countries";
import type { LangCode } from "@/data/languages";

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
  const [filters, setFilters] = useState<NewsFilters>(defaultFilters);

  const setCountry = useCallback((country: CountryCode | "") => {
    setFilters((prev) => ({ ...prev, country }));
  }, []);

  const setLang = useCallback((lang: LangCode | "") => {
    setFilters((prev) => ({ ...prev, lang }));
  }, []);

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
