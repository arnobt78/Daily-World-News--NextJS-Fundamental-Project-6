/**
 * Search page route - Server component wrapper.
 * Renders SearchPage (client) which handles search input and results.
 */
import type { Metadata } from "next";
import SearchPage from "@/components/pages/SearchPage";

export const metadata: Metadata = {
  title: "Search News",
  description:
    "Search for news articles across thousands of sources. Find headlines by keyword, topic, or interest.",
};

export default function Page() {
  return <SearchPage />;
}
