import { NextRequest, NextResponse } from "next/server";
import { fetchHeadlines } from "@/lib/gnews";

/** API route: proxies GNews to avoid CORS when fetching from client */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category") ?? "general";
  const lang = searchParams.get("lang") ?? undefined;
  const country = searchParams.get("country") ?? undefined;
  const maxParam = searchParams.get("max");
  const pageParam = searchParams.get("page");

  try {
    const data = await fetchHeadlines(category, {
      lang: lang || undefined,
      country: country || undefined,
      max: maxParam ? parseInt(maxParam, 10) : undefined,
      page: pageParam ? parseInt(pageParam, 10) : undefined,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Headlines API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch headlines" },
      { status: 500 }
    );
  }
}
