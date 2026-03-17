/**
 * HomePage - Wrapper for NewsSection. Receives SSR initial articles from app/page.tsx.
 * NewsSection is client component; this can stay server (no hooks here).
 */
import NewsSection from "@/components/NewsSection";
import type { Article } from "@/types/news";

interface HomePageProps {
  initialArticles: Article[];
}

export default function HomePage({ initialArticles }: HomePageProps) {
  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="max-w-9xl mx-auto w-full h-full">
        <NewsSection initialArticles={initialArticles} />
      </div>
    </div>
  );
}
