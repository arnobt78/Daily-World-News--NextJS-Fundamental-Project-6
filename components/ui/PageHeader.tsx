"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PageHeader() {
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
      <nav className="flex items-center gap-4 sm:gap-6">
        <Link
          href="/"
          className="font-comfortaa text-sm text-white/80 hover:text-white transition-colors"
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
