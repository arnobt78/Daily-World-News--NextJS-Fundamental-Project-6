"use client";

/**
 * SearchPage - Search bar, results grid, empty/no-results states.
 * useSearch runs only when query is non-empty. Uses NewsContext filters.
 */
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "@/components/ui/SearchBar";
import ArticleCard from "@/components/ui/ArticleCard";
import PageHeader from "@/components/ui/PageHeader";
import Footer from "@/components/ui/Footer";
import NewsModal from "@/components/NewsModal";
import SearchResultsSkeleton from "@/components/ui/SearchResultsSkeleton";
import { useSearch } from "@/hooks/useSearch";
import { useNewsContext } from "@/context/NewsContext";
import type { Article } from "@/types/news";

/** Search page content - client component */
export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { filters } = useNewsContext();
  const { articles, totalArticles, loading, error } = useSearch(query, {
    lang: filters.lang || undefined,
    country: filters.country || undefined,
  });

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="max-w-9xl mx-auto w-full flex flex-col flex-1">
        <header className="w-full bg-[#111214] border-b border-[#222] shrink-0">
          <PageHeader />
        </header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="py-8 px-2 sm:px-4 flex-1"
        >
          <h1 className="font-playfair text-2xl sm:text-3xl text-white/80 tracking-wider mb-6">
            Search News
          </h1>
          <div className="max-w-2xl mb-6">
            <SearchBar
              onSearch={setQuery}
              placeholder="e.g. technology, sports..."
            />
          </div>
          {error && (
            <div className="py-12 text-center text-red-400 font-outfit">
              {error}
            </div>
          )}
          {loading && query && <SearchResultsSkeleton />}
          {!loading && query && !error && totalArticles > 0 && (
            <p className="font-outfit text-white/70 mb-6">
              {totalArticles} articles found
            </p>
          )}
          {/* Empty state: no search yet */}
          {!query && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center"
            >
              <p className="font-outfit text-white/60 text-base sm:text-lg mb-2">
                Search for news across thousands of sources
              </p>
              <p className="font-outfit text-white/50 text-sm">
                Try keywords like technology, sports, or world events
              </p>
            </motion.div>
          )}
          {/* No results for query */}
          {!loading && query && articles.length === 0 && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center"
            >
              <p className="font-outfit text-white/60 text-base sm:text-lg mb-2">
                No articles found for &quot;{query}&quot;
              </p>
              <p className="font-outfit text-white/50 text-sm">
                Try different keywords or adjust your country/language filters
              </p>
              <Link
                href="/"
                className="inline-block mt-4 font-outfit text-[#b88efc] hover:text-white transition-colors underline"
              >
                Browse headlines instead
              </Link>
            </motion.div>
          )}
          <AnimatePresence mode="wait">
            {!loading && articles.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {articles.map((article, index) => (
                  <ArticleCard
                    key={article.url + index}
                    article={article}
                    onClick={() => handleArticleClick(article)}
                    index={index}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <Footer />
      </div>
      <NewsModal
        show={showModal}
        article={selectedArticle}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
