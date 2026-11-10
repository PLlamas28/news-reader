import { mockArticles, type MockArticle } from "./mockData";

const PAGE_SIZE = 5;

// Strip internal-only fields so resolvers return exactly the Article shape.
const toArticle = ({ category: _category, ...article }: MockArticle) => article;

function paginate<T>(items: T[], page?: number | null): T[] {
  const p = Math.max(1, page ?? 1);
  const start = (p - 1) * PAGE_SIZE;
  return items.slice(start, start + PAGE_SIZE);
}

const byNewest = (a: MockArticle, b: MockArticle) =>
  Date.parse(b.publishedAt) - Date.parse(a.publishedAt);

export const resolvers = {
  Query: {
    topStories: (
      _: unknown,
      args: { category?: string | null; page?: number | null }
    ) => {
      const category = args.category?.trim().toLowerCase();
      const filtered = category
        ? mockArticles.filter((a) => a.category === category)
        : mockArticles;
      return paginate([...filtered].sort(byNewest), args.page).map(toArticle);
    },

    article: (_: unknown, args: { id: string }) => {
      const found = mockArticles.find((a) => a.id === args.id);
      return found ? toArticle(found) : null;
    },

    search: (_: unknown, args: { query: string; page?: number | null }) => {
      const q = args.query.trim().toLowerCase();
      if (!q) return [];
      const matches = mockArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary?.toLowerCase().includes(q)
      );
      return paginate(matches.sort(byNewest), args.page).map(toArticle);
    },
  },
};
