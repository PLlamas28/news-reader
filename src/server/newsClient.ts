// The only file that knows about the Guardian API's URLs, params, and error behavior.
import { GraphQLError } from "graphql";
import { getConfig } from "./config";
import { normalizeArticle, type Article, type GuardianItem } from "./normalize";

const PAGE_SIZE = 10;
const REVALIDATE_SECONDS = 60; // cache responses to stay well inside rate limits

// Friendly category names (used in our UI) -> Guardian section IDs.
// Unknown categories are passed through as-is.
const CATEGORY_TO_SECTION: Record<string, string> = {
  world: "world",
  tech: "technology",
  technology: "technology",
  sports: "sport",
  sport: "sport",
  business: "business",
  science: "science",
  politics: "politics",
};

type Params = Record<string, string | number | undefined>;

// Returns the parsed `response` object, or null on 404.
async function guardianGet<T>(path: string, params: Params): Promise<T | null> {
  const { apiKey, baseUrl } = getConfig();
  const url = new URL(path, baseUrl);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }
  url.searchParams.set("api-key", apiKey);

  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });

  if (res.status === 404) return null;
  if (res.status === 429) {
    throw new GraphQLError("The news service is rate-limiting requests. Please try again shortly.");
  }
  if (!res.ok) {
    // Log details server-side; give the client a generic message.
    console.error(`Guardian API error: ${res.status} for ${url.pathname}`);
    throw new GraphQLError("Failed to load news from the upstream service.");
  }

  const json = (await res.json()) as { response: T };
  return json.response;
}

interface SearchResponse {
  results: GuardianItem[];
}

const LIST_FIELDS = "trailText,thumbnail";

function pageParam(page?: number | null) {
  return Math.max(1, page ?? 1);
}

export async function fetchTopStories(args: {
  category?: string | null;
  page?: number | null;
}): Promise<Article[]> {
  const key = args.category?.trim().toLowerCase();
  const section = key ? CATEGORY_TO_SECTION[key] ?? key : undefined;

  const data = await guardianGet<SearchResponse>("/search", {
    section,
    page: pageParam(args.page),
    "page-size": PAGE_SIZE,
    "order-by": "newest",
    "show-fields": LIST_FIELDS,
  });
  return (data?.results ?? []).map(normalizeArticle);
}

export async function searchArticles(args: {
  query: string;
  page?: number | null;
}): Promise<Article[]> {
  const q = args.query.trim();
  if (!q) return [];

  const data = await guardianGet<SearchResponse>("/search", {
    q,
    page: pageParam(args.page),
    "page-size": PAGE_SIZE,
    "order-by": "relevance",
    "show-fields": LIST_FIELDS,
  });
  return (data?.results ?? []).map(normalizeArticle);
}

export async function fetchArticle(id: string): Promise<Article | null> {
  // The id becomes part of the request path, so only allow path-like IDs.
  if (!/^[A-Za-z0-9\-_./]+$/.test(id) || id.includes("..")) return null;

  const path = "/" + id.split("/").map(encodeURIComponent).join("/");
  const data = await guardianGet<{ content?: GuardianItem }>(path, {
    "show-fields": LIST_FIELDS,
  });
  return data?.content ? normalizeArticle(data.content) : null;
}
