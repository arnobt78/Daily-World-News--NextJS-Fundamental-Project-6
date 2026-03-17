"use client";

/**
 * BookmarksPage - Displays articles saved via BookmarkContext (localStorage).
 * Converts BookmarkArticle to Article for ArticleCard. Empty state with link to home.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ArticleCard from "@/components/ui/ArticleCard";
import PageHeader from "@/components/ui/PageHeader";
import Footer from "@/components/ui/Footer";
import NewsModal from "@/components/NewsModal";
import { useBookmarks } from "@/context/BookmarkContext";
import type { Article } from "@/types/news";
import type { BookmarkArticle } from "@/context/BookmarkContext";

/** Convert minimal bookmark data to full Article shape for ArticleCard */
function toArticle(b: BookmarkArticle): Article {
  return {
    title: b.title,
    url: b.url,
    image: b.image,
    publishedAt: b.publishedAt,
    source: b.source,
    content: "",
    description: "",
  };
}

export default function BookmarksPage() {
  const { bookmarkedArticles } = useBookmarks();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showModal, setShowModal] = useState(false);

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
          className="py-8 flex-1 px-2 sm:px-4"
        >
          <h1 className="font-playfair text-2xl sm:text-3xl text-white/80 tracking-wider mb-6">
            Bookmarks
          </h1>
          {bookmarkedArticles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <p className="font-outfit text-white/60 text-base sm:text-lg mb-2">
                No bookmarked articles yet
              </p>
              <p className="font-outfit text-white/50 text-sm mb-4">
                Save articles you want to read later by clicking the bookmark icon
              </p>
              <Link
                href="/"
                className="font-outfit text-[#b88efc] hover:text-white transition-colors underline"
              >
                Browse headlines to bookmark
              </Link>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {bookmarkedArticles.map((b, index) => (
                  <ArticleCard
                    key={b.url}
                    article={toArticle(b)}
                    onClick={() => handleArticleClick(toArticle(b))}
                    index={index}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
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
