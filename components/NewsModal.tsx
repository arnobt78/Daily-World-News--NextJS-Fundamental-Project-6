"use client";

/** Modal overlay for article detail; client-only for interactivity */
import { AnimatePresence, motion } from "framer-motion";
import type { Article } from "@/types/news";

const NO_IMG = "/images/no-img.png";

interface NewsModalProps {
  show: boolean;
  article: Article | null;
  onClose: () => void;
}

export default function NewsModal({ show, article, onClose }: NewsModalProps) {
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
            className="w-[90%] max-w-[60rem] max-h-[90%] bg-[#111214] p-8 sm:p-12 lg:p-16 rounded-xl shadow-2xl relative overflow-y-auto max-[500px]:w-[95%]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-6 text-2xl text-white cursor-pointer hover:text-[#b88efc] transition-colors"
              aria-label="Close modal"
            >
              <i className="fa-solid fa-xmark" />
            </button>
            {article && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image ?? NO_IMG}
                  alt={article.title}
                  className="w-full h-auto max-h-[30rem] object-cover rounded-xl opacity-80"
                />
                <h2 className="font-bebas text-2xl sm:text-3xl text-white tracking-wider mt-8">
                  {article.title}
                </h2>
                <p className="font-comfortaa text-sm text-[#bbb] mt-4">
                  Source: {article.source.name}
                </p>
                <p className="font-comfortaa text-sm text-[#bbb] mt-2">
                  {new Date(article.publishedAt).toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="text-base text-[#ddd] mt-8 leading-relaxed font-comfortaa">
                  {article.content}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-8 py-4 px-8 bg-gradient-to-r from-[#b88efc] to-[#6877f4] text-white text-center text-base uppercase rounded-[5rem] font-comfortaa hover:opacity-90 active:translate-y-0.5 transition-all"
                >
                  Read More
                </a>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
