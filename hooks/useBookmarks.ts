"use client";

import { useBookmarks } from "@/context/BookmarkContext";

/**
 * Re-exports useBookmarks from BookmarkContext for convenience.
 * Bookmarks are synced with localStorage via the context.
 */
export { useBookmarks };
