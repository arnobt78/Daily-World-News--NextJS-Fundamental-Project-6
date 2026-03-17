"use client";

/**
 * SearchResultsSkeleton - 9 ArticleCardSkeletons in 3-column grid.
 * Shown while search is loading. Matches SearchPage results layout.
 */
import ArticleCardSkeleton from "./ArticleCardSkeleton";

export default function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="w-full h-full min-h-60">
          <ArticleCardSkeleton />
        </div>
      ))}
    </div>
  );
}
