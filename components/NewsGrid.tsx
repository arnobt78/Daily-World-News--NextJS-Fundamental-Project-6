"use client";

/**
 * NewsGrid - Renders articles as a grid of ArticleCards.
 * isHeadline=true: single large card; else 2-column grid (1 on mobile).
 */
import type { Article } from "@/types/news";
import ArticleCard from "./ui/ArticleCard";

interface NewsGridProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
  isHeadline?: boolean;
}

export default function NewsGrid({
  articles,
  onArticleClick,
  isHeadline = false,
}: NewsGridProps) {
  /* Featured headline: one large card */
  if (isHeadline && articles.length > 0) {
    return (
      <ArticleCard
        article={articles[0]}
        onClick={() => onArticleClick(articles[0])}
        index={0}
        isHeadline
      />
    );
  }

  return (
    <div className="w-full bg-[#111214] rounded-xl grid grid-cols-2 gap-4 p-4 justify-items-center items-stretch max-[500px]:grid-cols-1">
      {articles.map((article, index) => (
        <div key={`${article.url}-${index}`} className="w-full h-full min-h-60">
          <ArticleCard
            article={article}
            onClick={() => onArticleClick(article)}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}
