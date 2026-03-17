/**
 * GNews API category values for top-headlines endpoint.
 * Must match GNews docs: general, world, business, technology, etc.
 */
export const categories = [
  "general",
  "world",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
  "nation",
] as const;

/** Union type of valid category strings */
export type NewsCategory = (typeof categories)[number];
