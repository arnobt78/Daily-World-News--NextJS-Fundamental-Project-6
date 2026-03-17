# Daily World News - Next.js, React, TypeScript, GNews API, TailwindCSS, Framer Motion, TanStack React Query, Context API Fundamental Project 6

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC)](https://tailwindcss.com/)
[![GNews API](https://img.shields.io/badge/GNews-API-green)](https://gnews.io/)

A modern, full-featured news application that delivers live world headlines from thousands of sources. Built with Next.js 16, React 19, TypeScript, and the GNews API, it demonstrates server-side rendering (SSR), client-side data fetching, React Query, Context API, bookmarks with localStorage, and responsive design—ideal for learning and teaching modern web development.

- **Live Demo:** [https://daily-world-news.vercel.app/](https://daily-world-news.vercel.app/)

---

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Installation & Setup](#installation--setup)
6. [Environment Variables](#environment-variables)
7. [How to Run](#how-to-run)
8. [Routes & Pages](#routes--pages)
9. [API Endpoints](#api-endpoints)
10. [Components & Architecture](#components--architecture)
11. [Hooks & Data Fetching](#hooks--data-fetching)
12. [Context & State Management](#context--state-management)
13. [Libraries & Dependencies](#libraries--dependencies)
14. [Reusing Components](#reusing-components)
15. [Keywords](#keywords)
16. [Conclusion](#conclusion)
17. [License](#license)
18. [Happy Coding!](#happy-coding-)

---

## Introduction

News World is an educational news application that fetches real-time headlines from the GNews API. It combines server-side rendering for fast initial load with client-side interactivity for category switching, keyword search, and bookmarking. The project showcases Next.js App Router, React Server Components, API routes as a backend proxy, TanStack React Query for caching, and a clean component-based architecture—making it a practical reference for beginners and intermediate developers learning full-stack React development.

---

## Features

| Feature                        | Description                                                                                                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| **Category Headlines**         | Browse news by category: General, World, Business, Technology, Entertainment, Sports, Science, Health, Nation |
| **Keyword Search**             | Search across 80,000+ news sources with filters for country and language                                      |
| **Bookmarks**                  | Save articles to read later; persisted in `localStorage`                                                      |
| **Country & Language Filters** | Filter headlines and search results by 20+ countries and 15+ languages                                        |
| **Article Modal**              | Click any article card to view full details in a modal overlay                                                |
| **Refresh**                    | Manually refresh headlines with a loading indicator                                                           |
| **Theme Toggle**               | Switch between light and dark themes                                                                          |
| **Responsive Design**          | Mobile-first layout with Tailwind CSS                                                                         |
| **Skeleton Loading**           | Animated skeletons while data loads                                                                           |
| **SEO Metadata**               | Title, description, Open Graph, and Twitter cards for sharing                                                 |
| **Image Proxy**                | External images served via `/api/image` to avoid ad blocker blocking (ERR_BLOCKED_BY_CLIENT)                 |

---

## Technology Stack

| Technology               | Purpose                                          |
| ------------------------ | ------------------------------------------------ |
| **Next.js 16**           | React framework with App Router, API routes, SSR |
| **React 19**             | UI library with hooks and server components      |
| **TypeScript**           | Type safety and better DX                        |
| **Tailwind CSS 4**       | Utility-first styling                            |
| **TanStack React Query** | Server state, caching, and invalidation          |
| **Framer Motion**        | Animations and transitions                       |
| **Lucide React**         | Icons                                            |
| **GNews API**            | News data provider (headlines + search)          |
| **ESLint**               | Code quality and linting                         |

---

## Project Structure

```bash
news-world/
├── app/
│   ├── api/
│   │   ├── headlines/route.ts   # GET /api/headlines - Top headlines proxy
│   │   ├── image/route.ts       # GET /api/image - Image proxy (avoids ad blocker blocking)
│   │   └── search/route.ts      # GET /api/search - Search proxy
│   ├── about/page.tsx           # About page
│   ├── bookmarks/page.tsx       # Bookmarks page
│   ├── search/page.tsx          # Search page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout, metadata, providers
│   └── page.tsx                 # Home page (SSR initial fetch)
├── components/
│   ├── pages/
│   │   ├── HomePage.tsx         # Home page content
│   │   ├── SearchPage.tsx       # Search page content
│   │   ├── BookmarksPage.tsx    # Bookmarks page content
│   │   └── AboutPage.tsx        # About page content
│   ├── ui/
│   │   ├── ArticleCard.tsx      # Article card with bookmark button
│   │   ├── ArticleCardSkeleton.tsx
│   │   ├── PageHeader.tsx        # Navbar with filters and links
│   │   ├── Footer.tsx           # Reusable footer
│   │   ├── SearchBar.tsx        # Search input
│   │   ├── SearchResultsSkeleton.tsx
│   │   ├── NewsGridSkeleton.tsx
│   │   └── ...                  # Button, Badge, Skeleton, etc.
│   ├── NewsSection.tsx          # Main home layout (header, sidebar, grid)
│   ├── NewsNavbar.tsx          # Category sidebar
│   ├── NewsGrid.tsx            # Article grid layout
│   ├── NewsModal.tsx           # Article detail modal
│   ├── ThemeToggle.tsx         # Light/dark theme
│   └── providers/
│       ├── QueryProvider.tsx   # React Query client
│       └── InvalidationProvider.tsx
├── context/
│   ├── NewsContext.tsx         # Country/lang filters, query invalidation
│   └── BookmarkContext.tsx     # Bookmark state, localStorage sync
├── hooks/
│   ├── useNews.ts              # Headlines query
│   ├── useSearch.ts            # Search query
│   ├── useRefreshNews.ts       # Manual refresh
│   └── useBookmarks.ts         # (optional) bookmark helpers
├── lib/
│   ├── gnews.ts                # GNews API fetchers (server-side)
│   ├── api.ts                  # Client-side fetch wrappers
│   ├── imageProxy.ts           # getProxiedImageUrl() - proxy external images
│   ├── queryKeys.ts            # React Query key factory
│   ├── queryClient.ts          # Query client config
│   ├── invalidateNews.ts       # Invalidation helpers
│   └── utils.ts                # cn(), etc.
├── data/
│   ├── categories.ts            # GNews category list
│   ├── countries.ts            # Country codes for filters
│   └── languages.ts            # Language codes for filters
├── types/
│   └── news.ts                 # Article, GNewsResponse, params
├── public/
│   ├── favicon.ico
│   └── images/                 # Placeholder images
├── .env.example                # Environment variable template
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Installation & Setup

### Prerequisites

- **Node.js** 20.x or later ([nodejs.org](https://nodejs.org/))
- **npm** (comes with Node.js)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/arnobt78/News--ReactVite.git
   cd news-world
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables** (see [Environment Variables](#environment-variables))

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

You **do not need** any environment variables to run the app locally. The app will start and render, but news data will not load without a GNews API key.

To enable live news:

| Variable        | Required            | Description                                                                 |
| --------------- | ------------------- | --------------------------------------------------------------------------- |
| `GNEWS_API_KEY` | Optional (for data) | Your GNews API key from [gnews.io](https://gnews.io/docs/v4#authentication) |

### How to get `GNEWS_API_KEY`

1. Go to [gnews.io](https://gnews.io/)
2. Sign up for a free account
3. Copy your API key from the dashboard
4. Create a `.env.local` file in the project root:

   ```env
   GNEWS_API_KEY=your_api_key_here
   ```

5. Restart the dev server (`npm run dev`)

**Note:** The free tier allows ~100 requests per day. For production (e.g. Vercel), add `GNEWS_API_KEY` in your project's Environment Variables.

### `.env.example`

The project includes `.env.example` as a template:

```env
# Get your GNews API key from https://gnews.io/docs/v4#authentication
GNEWS_API_KEY=your_gnews_api_key_here
```

Copy to `.env.local` and replace with your key.

---

## How to Run

| Command            | Description                                                                            |
| ------------------ | -------------------------------------------------------------------------------------- |
| `npm run dev`      | Start development server (Turbopack) at [http://localhost:3000](http://localhost:3000) |
| `npm run build`    | Create production build                                                                |
| `npm run start`    | Run production server (after `npm run build`)                                          |
| `npm run lint`     | Run ESLint                                                                             |
| `npm run lint:fix` | Run ESLint with auto-fix                                                               |

---

## Routes & Pages

| Route        | Page      | Description                               |
| ------------ | --------- | ----------------------------------------- |
| `/`          | Home      | Category headlines, sidebar, article grid |
| `/search`    | Search    | Keyword search with filters               |
| `/bookmarks` | Bookmarks | Saved articles from localStorage          |
| `/about`     | About     | Project info, tech stack, features        |

All pages share the same header (navbar), footer, and layout structure. The home page uses a sidebar for categories; Search, Bookmarks, and About use a single-column layout.

---

## API Endpoints

The app uses **Next.js API routes** as a backend proxy to the GNews API. This keeps the API key server-side and avoids CORS when fetching from the client.

### GET `/api/headlines`

Fetches top headlines from GNews.

**Query parameters:**

| Param      | Type   | Default   | Description                                                                                  |
| ---------- | ------ | --------- | -------------------------------------------------------------------------------------------- |
| `category` | string | `general` | One of: general, world, business, technology, entertainment, sports, science, health, nation |
| `country`  | string | -         | Country code (e.g. `us`, `gb`, `in`)                                                         |
| `lang`     | string | `en`      | Language code (e.g. `en`, `es`, `fr`)                                                        |
| `max`      | number | 10        | Max articles to return                                                                       |
| `page`     | number | 1         | Page number                                                                                  |

**Example:**

```bash
GET /api/headlines?category=technology&country=us&max=10
```

### GET `/api/search`

Searches news articles by keyword.

**Query parameters:**

| Param     | Type   | Required | Description                  |
| --------- | ------ | -------- | ---------------------------- |
| `q`       | string | Yes      | Search query                 |
| `country` | string | No       | Country filter               |
| `lang`    | string | No       | Language filter              |
| `max`     | number | No       | Max results                  |
| `page`    | number | No       | Page number                  |
| `sortby`  | string | No       | `publishedAt` or `relevance` |

**Example:**

```bash
GET /api/search?q=technology&lang=en&page=1
```

### GET `/api/image`

Proxies external images through our domain. Avoids `ERR_BLOCKED_BY_CLIENT` when ad blockers block third-party media (e.g. CNN, BBC CDNs). Uses `getProxiedImageUrl()` in ArticleCard and NewsModal. Fallback to placeholder on error.

**Query parameters:**

| Param | Type   | Required | Description                    |
| ----- | ------ | -------- | ------------------------------ |
| `url` | string | Yes      | Full URL of the image to fetch |

**Example:**

```bash
GET /api/image?url=https://media.cnn.com/.../image.jpg
```

---

## Components & Architecture

### Page Components (`components/pages/`)

- **HomePage** – Renders `NewsSection` with SSR initial articles
- **SearchPage** – Search bar, results grid, empty/no-results states
- **BookmarksPage** – Grid of bookmarked articles
- **AboutPage** – Static content about the project

### Layout Components

- **NewsSection** – Main home layout: header, sidebar, scrollable content, footer
- **PageHeader** – Navbar with logo, country/lang filters, refresh, theme toggle, nav links
- **NewsNavbar** – Category sidebar (General, World, Business, etc.)
- **Footer** – Copyright and links

### UI Components

- **ArticleCard** – Single article with image, title, source, bookmark button
- **NewsGrid** – Grid of `ArticleCard`s (2 columns on home)
- **NewsModal** – Full article view in a modal
- **SearchBar** – Search input with debouncing
- **ThemeToggle** – Light/dark theme switch

### Data Flow

1. **Home:** `app/page.tsx` (server) fetches initial headlines → passes to `HomePage` → `NewsSection` uses `useNews` for category switching
2. **Search:** `SearchPage` uses `useSearch(query)` → fetches `/api/search?q=...`
3. **Bookmarks:** `BookmarkContext` reads/writes `localStorage`; `BookmarksPage` renders saved articles

---

## Hooks & Data Fetching

### `useNews(category, initialArticles?, params?)`

Fetches headlines for a category. Uses React Query with optional SSR initial data for "general".

```tsx
const { headline, news, loading, error, refetch } = useNews(
  "technology",
  undefined,
  { country: "us", lang: "en", max: 10 },
);
```

### `useSearch(query, params?)`

Fetches search results. Enabled only when `query` is non-empty.

```tsx
const { articles, totalArticles, loading, error, page, setPage } = useSearch(
  "climate change",
  { country: "us", lang: "en" },
);
```

### `useRefreshNews()`

Returns `{ refresh, isRefreshing }` to manually refetch headlines and invalidate queries.

### `useNewsContext()`

Returns `{ filters, setCountry, setLang }` for country and language filters.

### `useBookmarks()`

Returns `{ bookmarkedArticles, toggleBookmark, isBookmarked }` for bookmark state.

---

## Context & State Management

### NewsContext

- **Purpose:** Global country and language filters
- **Values:** `filters`, `setCountry`, `setLang`
- **Behavior:** Changing filters invalidates React Query cache for headlines and search

### BookmarkContext

- **Purpose:** Persist bookmarked articles in `localStorage`
- **Values:** `bookmarkedArticles`, `toggleBookmark`, `isBookmarked`
- **Storage key:** `news-world-bookmarks`

---

## Libraries & Dependencies

### Core

- **next** – React framework with App Router, API routes, SSR
- **react** / **react-dom** – UI library
- **typescript** – Type checking

### Data & State

- **@tanstack/react-query** – Server state, caching, background refetch
- **Context API** – Filters and bookmarks

### Styling & UI

- **tailwindcss** – Utility CSS
- **framer-motion** – Animations
- **lucide-react** – Icons
- **class-variance-authority**, **clsx**, **tailwind-merge** – Conditional styling

### Utilities

- **lib/utils.ts** – `cn()` for merging class names

---

## Reusing Components

### ArticleCard

Use in any grid to display an article:

```tsx
import ArticleCard from "@/components/ui/ArticleCard";

<ArticleCard
  article={article}
  onClick={() => handleClick(article)}
  index={0}
/>;
```

### PageHeader

Drop-in navbar for any page:

```tsx
import PageHeader from "@/components/ui/PageHeader";

<header>
  <PageHeader />
</header>;
```

### Footer

Reusable footer:

```tsx
import Footer from "@/components/ui/Footer";

<Footer />;
```

### useNews / useSearch

Use in other projects by copying the hooks and ensuring `/api/headlines` and `/api/search` exist or are replaced with your own API.

---

## Keywords

Next.js 16, React 19, TypeScript, Tailwind CSS, GNews API, News App, SSR, API Routes, Image Proxy, React Query, TanStack Query, Context API, localStorage, Bookmarks, Responsive Design, Framer Motion, Components, Frontend, Web Development, Educational Project

---

## Conclusion

News World is a practical example of a modern full-stack React application. It combines:

- **Server-side rendering** for fast initial load
- **Client-side fetching** for category switching and search
- **API routes** as a secure backend proxy (headlines, search, image proxy)
- **React Query** for caching and invalidation
- **Context** for filters and bookmarks
- **localStorage** for persistence

The codebase is structured for clarity and reuse. You can extend it with more categories, pagination, or different news APIs. Contributions and feedback are welcome.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

---

## Happy Coding! 🎉

This is an **open-source project** - feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊

---
