"use client";

import ArticleCardSkeleton from "./ArticleCardSkeleton";

interface NewsGridSkeletonProps {
  isHeadline?: boolean;
  count?: number;
}

export default function NewsGridSkeleton({
  isHeadline = false,
  count = 6,
}: NewsGridSkeletonProps) {
  if (isHeadline) {
    return (
      <div className="mb-8">
        <ArticleCardSkeleton isHeadline />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[20rem] bg-[#111214] rounded-xl grid grid-cols-3 grid-rows-2 gap-4 p-5 justify-items-center items-center max-[1400px]:grid-cols-2 max-[1400px]:grid-rows-3 max-[1400px]:overflow-y-scroll max-[1400px]:[&::-webkit-scrollbar]:hidden max-[500px]:grid-cols-1 max-[500px]:grid-rows-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-full h-full min-h-60">
          <ArticleCardSkeleton />
        </div>
      ))}
    </div>
  );
}
