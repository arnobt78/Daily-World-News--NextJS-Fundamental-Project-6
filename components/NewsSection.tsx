"use client";

/**
 * NewsSection - Main home layout: header, category sidebar, article grid, footer.
 * Uses useNews for headlines; passes SSR initialArticles when category is "general".
 * Layout: fixed header, sticky sidebar, scrollable main with footer at bottom.
 */
import { useState } from "react";
import type { Article } from "@/types/news";
import type { NewsCategory } from "@/data/categories";
import { useNews } from "@/hooks/useNews";
import { useNewsContext } from "@/context/NewsContext";
import NewsNavbar from "./NewsNavbar";
import NewsGrid from "./NewsGrid";
import NewsModal from "./NewsModal";
import PageHeader from "./ui/PageHeader";
import Footer from "./ui/Footer";
import AnimatedSection from "./ui/AnimatedSection";
import NewsGridSkeleton from "./ui/NewsGridSkeleton";

interface NewsSectionProps {
  initialArticles: Article[];
}

export default function NewsSection({ initialArticles }: NewsSectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<NewsCategory>("general");
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { filters } = useNewsContext();

  const { headline, news, loading, error } = useNews(
    selectedCategory,
    selectedCategory === "general" ? initialArticles : undefined, /* SSR data only for general */
    {
      country: filters.country || undefined,
      lang: filters.lang || undefined,
      max: 10,
    },
  );

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  return (
    <div className="w-full min-w-0 h-screen flex flex-col overflow-hidden">
      <div className="w-full h-full bg-[#060709] flex flex-col shadow-2xl rounded-2xl overflow-hidden">
        <header className="w-full bg-[#111214] border-b border-[#222] shrink-0">
          <PageHeader />
        </header>

        <div className="flex gap-4 flex-1 min-h-0 px-2 sm:px-4 pt-4 pb-8 max-[900px]:flex-col max-[900px]:gap-6">
          <NewsNavbar
            selectedCategory={selectedCategory}
            onCategoryClick={setSelectedCategory}
          />

          <main className="flex-1 min-w-0 overflow-y-auto scrollbar-custom flex flex-col min-h-0">
            <AnimatedSection
              delay={0.1}
              direction="up"
              className="flex flex-col flex-1 min-h-0"
            >
              {error ? (
                <div className="flex flex-col items-center justify-center h-64 text-white/80 gap-4">
                  <p className="text-red-400">{error}</p>
                  <p className="text-sm font-outfit">
                    Check GNEWS_API_KEY in Vercel env vars.
                  </p>
                </div>
              ) : loading && !headline && news.length === 0 ? (
                /* Skeleton while fetching; matches ArticleCard layout */
                <>
                  <NewsGridSkeleton isHeadline />
                  <NewsGridSkeleton count={6} />
                </>
              ) : (
                <>
                  {headline && (
                    <div className="mb-4">
                      <NewsGrid
                        articles={[headline]}
                        onArticleClick={handleArticleClick}
                        isHeadline
                      />
                    </div>
                  )}
                  <NewsGrid
                    articles={news}
                    onArticleClick={handleArticleClick}
                  />
                </>
              )}
            </AnimatedSection>

            <div className="mt-auto shrink-0 pt-4">
              <Footer />
            </div>
          </main>
        </div>

        <NewsModal
          show={showModal}
          article={selectedArticle}
          onClose={() => setShowModal(false)}
        />
      </div>
    </div>
  );
}
