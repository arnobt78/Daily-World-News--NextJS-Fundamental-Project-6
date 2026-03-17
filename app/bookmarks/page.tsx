/**
 * Bookmarks page route - Server component wrapper.
 * Renders BookmarksPage (client) which reads from BookmarkContext/localStorage.
 */
import type { Metadata } from "next";
import BookmarksPage from "@/components/pages/BookmarksPage";

export const metadata: Metadata = {
  title: "Bookmarks",
  description:
    "Your saved news articles. Access your bookmarked headlines and read later.",
};

export default function Page() {
  return <BookmarksPage />;
}
