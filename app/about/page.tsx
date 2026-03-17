/**
 * About page route - Server component.
 * Static content about the project, tech stack, and features.
 */
import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "News World is an educational news app built with Next.js, React, and the GNews API. Learn about features, tech stack, and how it works.",
};

export default function Page() {
  return <AboutPage />;
}
