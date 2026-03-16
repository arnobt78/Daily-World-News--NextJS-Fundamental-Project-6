import type { Metadata } from "next";
import { Kanit, Bebas_Neue, Comfortaa, Syne, Geist } from "next/font/google";
import "./globals.css";
import { NewsProvider } from "@/context/NewsContext";
import { BookmarkProvider } from "@/context/BookmarkContext";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { InvalidationProvider } from "@/components/providers/InvalidationProvider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "News App",
  description: "World news headlines",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(kanit.variable, bebasNeue.variable, comfortaa.variable, syne.variable, "font-sans", geist.variable)}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </head>
      <body className="font-kanit antialiased" suppressHydrationWarning>
        <QueryProvider>
          <InvalidationProvider>
            <BookmarkProvider>
              <NewsProvider>{children}</NewsProvider>
            </BookmarkProvider>
          </InvalidationProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
