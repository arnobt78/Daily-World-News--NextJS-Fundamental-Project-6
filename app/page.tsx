import type { Metadata } from "next";
import { fetchHeadlines } from "@/lib/gnews";
import HomePage from "@/components/pages/HomePage";

/** Force server-side rendering on every request (no static caching) */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Browse the latest world news headlines by category. General, World, Business, Technology, Sports, Science, Health, and more.",
};

/**
 * Home page: SSR fetches initial news, passes to client components for CSR.
 * This runs on the server on every request (force-dynamic). Initial data is
 * passed to HomePage to avoid loading spinner on first paint for "general" category.
 */
export default async function Page() {
  let initialArticles: Awaited<ReturnType<typeof fetchHeadlines>>["articles"] =
    [];
  try {
    const data = await fetchHeadlines("general", { lang: "en", max: 10 });
    initialArticles = data.articles ?? [];
  } catch {
    // GNEWS_API_KEY not set or API error - will use empty state
  }

  return <HomePage initialArticles={initialArticles} />;
}
