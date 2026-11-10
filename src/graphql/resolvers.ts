import { useMockData } from "@/server/config";
import * as guardian from "@/server/newsClient";
import type { Article } from "@/server/normalize";
import { mockArticles, type MockArticle } from "./mockData";

// ---- Mock source (enabled with USE_MOCK_DATA=true) ----
const MOCK_PAGE_SIZE = 5;
const toArticle = ({ category: _category, ...a }: MockArticle): Article => a;
const byNewest = (a: MockArticle, b: MockArticle) =>
  Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
const paginate = <T,>(items: T[], page?: number | null) => {
  const start = (Math.max(1, page ?? 1) - 1) * MOCK_PAGE_SIZE;
  return items.slice(start, start + MOCK_PAGE_SIZE);
};

const mockSource = {
  async fetchTopStories(args: { category?: string | null; page?: number | null }) {
    const cat = args.category?.trim().toLowerCase();
    const list = cat ? mockArticles.filter((a) => a.category === cat) : mockArticles;
    return paginate([...list].sort(byNewest), args.page).map(toArticle);
  },
  async searchArticles(args: { query: string; page?: number | null }) {
    const q = args.query.trim().toLowerCase();
    if (!q) return [];
    const hits = mockArticles.filter(
      (a) => a.title.toLowerCase().includes(q) || a.summary?.toLowerCase().includes(q)
    );
    return paginate(hits.sort(byNewest), args.page).map(toArticle);
  },
  async fetchArticle(id: string) {
    const found = mockArticles.find((a) => a.id === id);
    return found ? toArticle(found) : null;
  },
};

// Same interface either way, so resolvers don't care which is active.
const source = () => (useMockData() ? mockSource : guardian);

// ---- Resolvers: validate args, delegate, return Articles ----
export const resolvers = {
  Query: {
    topStories: (_: unknown, args: { category?: string | null; page?: number | null }) =>
      source().fetchTopStories(args),

    article: (_: unknown, args: { id: string }) => source().fetchArticle(args.id),

    search: (_: unknown, args: { query: string; page?: number | null }) =>
      source().searchArticles(args),
  },
};
