"use client";

import { Skeleton } from "./skeleton";

interface ArticleCardSkeletonProps {
  isHeadline?: boolean;
}

export default function ArticleCardSkeleton({
  isHeadline = false,
}: ArticleCardSkeletonProps) {
  return (
    <div
      className={`w-full rounded-xl overflow-hidden relative ${
        isHeadline ? "h-[calc(45%-2rem)] min-h-64" : "h-full min-h-60"
      }`}
    >
      <Skeleton
        className={`w-full h-full rounded-xl block ${
          isHeadline ? "min-h-64" : "min-h-60"
        }`}
      />
      <div className="absolute left-0 bottom-0 w-full p-4 pr-12 rounded-b-xl space-y-2">
        <Skeleton
          className={`rounded ${
            isHeadline ? "w-3/4 h-8 max-[500px]:h-6" : "h-4 w-full"
          }`}
        />
        {!isHeadline && <Skeleton className="h-3 w-24 rounded" />}
      </div>
    </div>
  );
}
