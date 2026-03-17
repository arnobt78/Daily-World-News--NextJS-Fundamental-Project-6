/**
 * Image proxy helper - Use proxied URL for external images to avoid ad blocker blocking.
 * Internal/placeholder URLs are returned as-is.
 */
const NO_IMG = "/images/no-img.png";

export function getProxiedImageUrl(url: string | null | undefined): string {
  if (!url || !url.trim()) return NO_IMG;
  const trimmed = url.trim();
  /* Our own assets - use directly, no proxy needed */
  if (trimmed.startsWith("/") || trimmed.startsWith("data:")) return trimmed;
  /* External http/https - proxy through our API */
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return `/api/image?url=${encodeURIComponent(trimmed)}`;
  }
  return NO_IMG;
}
