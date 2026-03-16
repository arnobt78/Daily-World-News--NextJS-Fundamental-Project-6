"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Article } from "@/types/news";

const STORAGE_KEY = "news-world-bookmarks";

export interface BookmarkArticle {
  url: string;
  title: string;
  image: string | null;
  publishedAt: string;
  source: { name: string };
}

interface BookmarkContextValue {
  bookmarkedUrls: Set<string>;
  bookmarkedArticles: BookmarkArticle[];
  toggleBookmark: (url: string, article?: Article) => void;
  isBookmarked: (url: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextValue | null>(null);

function toMinimal(article: Article): BookmarkArticle {
  return {
    url: article.url,
    title: article.title,
    image: article.image ?? null,
    publishedAt: article.publishedAt,
    source: { name: article.source?.name ?? "Unknown" },
  };
}

function loadFromStorage(): BookmarkArticle[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as BookmarkArticle[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveToStorage(articles: BookmarkArticle[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  } catch {
    // ignore
  }
}

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarkedArticles, setBookmarkedArticles] = useState<BookmarkArticle[]>(
    []
  );

  useEffect(() => {
    setBookmarkedArticles(loadFromStorage());
  }, []);

  const bookmarkedUrls = new Set(bookmarkedArticles.map((a) => a.url));

  const toggleBookmark = useCallback((url: string, article?: Article) => {
    setBookmarkedArticles((prev) => {
      const idx = prev.findIndex((a) => a.url === url);
      let next: BookmarkArticle[];
      if (idx >= 0) {
        next = prev.filter((a) => a.url !== url);
      } else if (article) {
        next = [...prev, toMinimal(article)];
      } else {
        next = [...prev, { url, title: "", image: null, publishedAt: "", source: { name: "" } }];
      }
      saveToStorage(next);
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (url: string) => bookmarkedUrls.has(url),
    [bookmarkedArticles]
  );

  return (
    <BookmarkContext.Provider
      value={{ bookmarkedUrls, bookmarkedArticles, toggleBookmark, isBookmarked }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks(): BookmarkContextValue {
  const ctx = useContext(BookmarkContext);
  if (!ctx) {
    throw new Error("useBookmarks must be used within BookmarkProvider");
  }
  return ctx;
}
