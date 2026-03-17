/**
 * cn - Merge Tailwind classes with clsx + tailwind-merge.
 * Handles conditionals and deduplicates conflicting utilities.
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
