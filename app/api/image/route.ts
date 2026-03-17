/**
 * Image proxy - Fetches external images server-side and streams to client.
 * Avoids ERR_BLOCKED_BY_CLIENT (ad blockers) by serving images from our domain.
 * SSRF-safe: only allows http/https to external hosts.
 */
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_PROTOCOLS = ["http:", "https:"];
const BLOCKED_HOSTS = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "[::1]",
  "169.254.169.254", /* AWS metadata */
];

function isValidImageUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    if (!ALLOWED_PROTOCOLS.includes(url.protocol)) return false;
    const host = url.hostname.toLowerCase();
    if (BLOCKED_HOSTS.includes(host)) return false;
    if (host.endsWith(".local")) return false;
    if (/^10\.|^172\.(1[6-9]|2[0-9]|3[01])\.|^192\.168\./.test(host)) return false;
    return true;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url || !url.trim()) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  const decodedUrl = decodeURIComponent(url.trim());
  if (!isValidImageUrl(decodedUrl)) {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  try {
    const res = await fetch(decodedUrl, {
      headers: {
        "User-Agent": "NewsWorld/1.0 (Image Proxy)",
      },
      next: { revalidate: 3600 }, /* Cache 1 hour */
    });

    if (!res.ok) {
      return new NextResponse(null, { status: res.status });
    }

    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    const cacheControl = res.headers.get("cache-control") ?? "public, max-age=3600, s-maxage=3600";

    return new NextResponse(res.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": cacheControl,
      },
    });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}
