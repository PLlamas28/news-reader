// Internal shape: matches the GraphQL Article, plus a category used only for filtering.
// Milestone 2 replaces this file with server/newsClient.ts + server/normalize.ts.
export interface MockArticle {
  id: string;
  title: string;
  summary: string | null;
  imageUrl: string | null;
  source: string;
  publishedAt: string; // ISO 8601
  url: string;
  category: string;
}

const hoursAgo = (h: number) =>
  new Date(Date.now() - h * 60 * 60 * 1000).toISOString();

export const mockArticles: MockArticle[] = [
  {
    id: "world-1",
    title: "Leaders gather for climate summit",
    summary: "Delegates from over 100 countries meet to negotiate new emissions targets.",
    imageUrl: "https://picsum.photos/seed/world1/800/450",
    source: "Mock News",
    publishedAt: hoursAgo(1),
    url: "https://example.com/world-1",
    category: "world",
  },
  {
    id: "world-2",
    title: "Trade talks resume after months of delay",
    summary: "Negotiators say a framework agreement could be reached by next quarter.",
    imageUrl: "https://picsum.photos/seed/world2/800/450",
    source: "Mock News",
    publishedAt: hoursAgo(3),
    url: "https://example.com/world-2",
    category: "world",
  },
  {
    id: "tech-1",
    title: "New open-source browser engine hits 1.0",
    summary: "The project promises faster rendering and a smaller memory footprint.",
    imageUrl: "https://picsum.photos/seed/tech1/800/450",
    source: "Mock Tech",
    publishedAt: hoursAgo(2),
    url: "https://example.com/tech-1",
    category: "tech",
  },
  {
    id: "tech-2",
    title: "Chipmakers report record demand for AI hardware",
    summary: null, // exercises the nullable summary
    imageUrl: null, // exercises the nullable image
    source: "Mock Tech",
    publishedAt: hoursAgo(5),
    url: "https://example.com/tech-2",
    category: "tech",
  },
  {
    id: "tech-3",
    title: "Developers weigh in on the future of server components",
    summary: "A survey shows growing adoption but lingering confusion about caching.",
    imageUrl: "https://picsum.photos/seed/tech3/800/450",
    source: "Mock Tech",
    publishedAt: hoursAgo(8),
    url: "https://example.com/tech-3",
    category: "tech",
  },
  {
    id: "sports-1",
    title: "Underdogs advance to the final in dramatic shootout",
    summary: "A last-minute save sent the crowd into a frenzy.",
    imageUrl: "https://picsum.photos/seed/sports1/800/450",
    source: "Mock Sports",
    publishedAt: hoursAgo(4),
    url: "https://example.com/sports-1",
    category: "sports",
  },
  {
    id: "sports-2",
    title: "Marathon record falls on a cool autumn morning",
    summary: "The new mark beats the previous best by 14 seconds.",
    imageUrl: "https://picsum.photos/seed/sports2/800/450",
    source: "Mock Sports",
    publishedAt: hoursAgo(10),
    url: "https://example.com/sports-2",
    category: "sports",
  },
];
