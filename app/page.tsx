import { fetchHeadlines } from "@/lib/gnews";
import NewsSection from "@/components/NewsSection";

/** Force server-side rendering on every request (no static caching) */
export const dynamic = "force-dynamic";

/** Home page: SSR fetches initial news, passes to client components for CSR */
export default async function HomePage() {
  let initialArticles: Awaited<ReturnType<typeof fetchHeadlines>>["articles"] = [];
  try {
    const data = await fetchHeadlines("general", { lang: "en", max: 10 });
    initialArticles = data.articles ?? [];
  } catch {
    // GNEWS_API_KEY not set or API error - will use empty state
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#b88efc] to-[#6877f4]">
      <div className="max-w-9xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <NewsSection initialArticles={initialArticles} />
      </div>
    </div>
  );
}
