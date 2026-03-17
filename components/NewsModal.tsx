"use client";

/**
 * NewsModal - Full article view overlay. Share (Web Share API or clipboard),
 * Bookmark, Read More link. AnimatePresence for enter/exit animations.
 * Click backdrop to close; stopPropagation on content.
 */
import { AnimatePresence, motion } from "framer-motion";
import { Share2, Bookmark, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/context/BookmarkContext";
import type { Article } from "@/types/news";
import Image from "next/image";

const NO_IMG = "/images/no-img.png";

interface NewsModalProps {
  show: boolean;
  article: Article | null;
  onClose: () => void;
}

async function handleShare(article: Article) {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({
        title: article.title,
        url: article.url,
        text: article.description ?? article.title,
      });
    } catch {
      await navigator.clipboard.writeText(article.url);
    }
  } else {
    await navigator.clipboard.writeText(article.url);
  }
}

export default function NewsModal({ show, article, onClose }: NewsModalProps) {
  const { toggleBookmark, isBookmarked } = useBookmarks();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[1000] p-4"
          role="dialog"
          aria-modal="true"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-7xl max-h-[90vh] bg-[#111214] rounded-xl shadow-2xl relative overflow-y-auto scrollbar-custom"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-4 right-4 z-20 p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="size-6 cursor-pointer" />
            </button>
            {article && (
              <Card className="border-0 bg-transparent shadow-none">
                <Image
                  src={article.image ?? NO_IMG}
                  alt={article.title}
                  width={1000}
                  height={1000}
                  unoptimized /* External URLs may not be in next.config images.domains */
                  onError={(e) => {
                    e.currentTarget.src = NO_IMG;
                  }}
                  className="w-full h-auto max-h-[30rem] object-cover rounded-t-xl opacity-80"
                />
                <div className="px-6 py-6">
                  <h2 className="font-playfair text-2xl sm:text-3xl text-white tracking-wider">
                    {article.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-3 items-center font-outfit text-sm text-[#bbb]">
                    <span className="font-medium">{article.source.name}</span>
                    <span>
                      {new Date(article.publishedAt).toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="mt-4 text-base text-[#ddd] leading-relaxed font-outfit">
                    {article.content || article.description || ""}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-6 items-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-[#222] text-[#bbb] hover:bg-[#333] hover:text-white"
                      onClick={() => handleShare(article)}
                    >
                      <Share2 className="size-4 mr-1" />
                      Share
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className={`bg-[#222] text-[#bbb] hover:bg-[#333] hover:text-white ${isBookmarked(article.url) ? "text-[#b88efc]" : ""}`}
                      onClick={() => toggleBookmark(article.url, article)}
                    >
                      <Bookmark
                        className={`size-4 mr-1 ${isBookmarked(article.url) ? "fill-current" : ""}`}
                      />
                      {isBookmarked(article.url) ? "Saved" : "Bookmark"}
                    </Button>
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 py-4 px-8 bg-gradient-to-r from-[#b88efc] to-[#6877f4] text-white text-center text-base uppercase rounded-[5rem] font-outfit hover:opacity-90 active:translate-y-0.5 transition-all"
                  >
                    Read More
                  </a>
                </div>
              </Card>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
