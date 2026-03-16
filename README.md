# Daily World News - Next.js 15, React 19, TypeScript, GNews API, Tailwind CSS

News App is a Next.js 15 project displaying live world news from the GNews API. Features server-side rendering for initial load, client-side category switching, modal article details, and Tailwind CSS styling. Deploy on Vercel.

- **Live Demo:** [https://daily-world-news.vercel.app/](https://daily-world-news.vercel.app/)

## Table of Contents

1. [Project Details](#project-details)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Technology Stack](#technology-stack)
5. [Installation & Setup](#installation--setup)
6. [API Integration](#api-integration)
7. [Usage Instructions](#usage-instructions)
8. [Key Concepts & Learning Points](#key-concepts--learning-points)
9. [Example Code Snippets](#example-code-snippets)
10. [Conclusion](#conclusion)

---

## Project Details

- **Purpose:** Deliver the latest world news in a fast, organized, and visually engaging way.
- **API Source:** [GNews API](https://gnews.io/docs/v4#authentication)
- **Frontend:** Next.js 15 with React 19, TypeScript, and Tailwind CSS.
- **Data Fetching:** Server-side for initial load; client-side via API route for category switching.

---

## Features

- Live news fetched from GNews API.
- Categorized news navigation via Navbar (e.g., World, Sports, Technology, etc.).
- Detailed news view for each article.
- Responsive design for desktop and mobile.
- Secure API key management using `GNEWS_API_KEY` in `.env`.
- Clean code structure and reusable components.
- Easily extensible for more features or categories.

---

## Project Structure

```bash
news-world/
├── app/
│   ├── api/headlines/route.ts   # GNews proxy API
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 # SSR initial news
├── components/
│   ├── NewsSection.tsx          # Client - category fetch
│   ├── NewsModal.tsx
│   ├── NewsNavbar.tsx
│   └── NewsGrid.tsx
├── data/categories.ts
├── hooks/useNews.ts
├── lib/gnews.ts
├── types/news.ts
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Technology Stack

- **Next.js 15**: React framework with App Router.
- **React 19**: Core UI library.
- **TypeScript**: Type safety.
- **Tailwind CSS**: Utility-first styling.
- **GNews API**: News data provider.
- **ESLint**: Linting and code quality.
- **Vercel**: Deployment.

---

## Installation & Setup

1. **Install Node.js**  
   Download and install Node.js from [nodejs.org](https://nodejs.org/en/).

2. **Clone the Repository**

   ```bash
   git clone https://github.com/arnobt78/News--ReactVite.git
   cd News--ReactVite
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Setup .env File**  
   Copy `.env.example` to `.env` and add your GNews API key:

   ```bash
   cp .env.example .env
   ```

   Edit `.env`:
   ```
   GNEWS_API_KEY=your_gnews_api_key_here
   ```

5. **Run the Application Locally**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000/](http://localhost:3000/) in your browser.

---

## API Integration

- **GNews API**:
  - Sign up at [gnews.io](https://gnews.io/docs/v4#authentication) to get your API key.
  - Store the API key in `.env` as `GNEWS_API_KEY`.
  - The `/api/headlines` route proxies requests to GNews (key stays server-side).

---

## Usage Instructions

1. **Start the app** (`npm run dev`)
2. **Browse categories** using the top navigation bar
3. **Click on articles** to view detailed news content
4. **Stay up to date** with the latest world news, refreshed live from the GNews API

---

## Key Concepts & Learning Points

- **Next.js App Router**: Server and client components, API routes.
- **State Management**: React Hooks and custom `useNews` hook.
- **Data Fetching**: Server-side for initial load; client-side via `/api/headlines` for categories.
- **Environment Variables**: `GNEWS_API_KEY` in `.env` (server-side only).
- **Component-Based Architecture**: Separation of concerns, reusability, and scalability.
- **Routing (if implemented)**: Page navigation and dynamic rendering.
- **Responsive Design**: Mobile-first, adaptive layout.

---

## Example Code Snippets

**Fetching News (lib/gnews.ts):**

```typescript
import { fetchHeadlines } from "@/lib/gnews";

const data = await fetchHeadlines("general");
// data.articles
```

---

**Sample Navbar Component:**

```tsx
"use client";

import { categories } from "@/data/categories";

export default function NewsNavbar({ onCategoryClick }) {
  return (
    <nav>
      {categories.map((cat) => (
        <button key={cat} onClick={() => onCategoryClick(cat)}>
          {cat}
        </button>
      ))}
    </nav>
  );
}
```

---

## Conclusion

This project is a practical example for learning full-stack JavaScript with React and Vite, API integration, and modern web development best practices. It is easily extendable for more features, categories, or different APIs.  
Contributions, suggestions, and feedback are welcome!

---

## Keywords

Next.js 15, React 19, TypeScript, Tailwind CSS, GNews API, News App, SSR, API Routes, Environment Variables, Responsive Design, Components, Frontend, Web Development

---

## Happy Coding! 🚀

Thank you for exploring and using News World.  
_Feel free to fork, star, and contribute!_

---
