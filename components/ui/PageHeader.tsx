"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RefreshCw, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useRefreshNews } from "@/hooks/useRefreshNews";
import { useBookmarks } from "@/context/BookmarkContext";

export default function PageHeader() {
  const { refresh, isRefreshing } = useRefreshNews();
  const { bookmarkedArticles } = useBookmarks();
  const hasBookmarks = bookmarkedArticles.length > 0;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full min-h-[4rem] flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4"
    >
      <Link
        href="/"
        className="font-bebas text-2xl sm:text-3xl text-white tracking-wider hover:text-[#b88efc] transition-colors"
      >
        News App
      </Link>
      <nav className="flex items-center gap-2 sm:gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => refresh()}
          disabled={isRefreshing}
          aria-label="Refresh news"
          className="text-white/80 hover:text-white hover:bg-white/10"
        >
          <RefreshCw
            className={`size-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
        </Button>
        <ThemeToggle />
        {hasBookmarks && (
          <Link
            href="/bookmarks"
            className="flex items-center gap-1.5 font-comfortaa text-sm text-white/80 hover:text-white transition-colors"
          >
            <Bookmark className="size-4" />
            Bookmarks
          </Link>
        )}
        <Link
          href="/"
          className="font-comfortaa text-sm text-white/80 hover:text-white transition-colors hidden sm:inline"
        >
          Home
        </Link>
        <Link
          href="/search"
          className="font-comfortaa text-sm text-white/80 hover:text-white transition-colors"
        >
          Search
        </Link>
        <Link
          href="/about"
          className="font-comfortaa text-sm text-white/80 hover:text-white transition-colors"
        >
          About
        </Link>
      </nav>
    </motion.header>
  );
}
