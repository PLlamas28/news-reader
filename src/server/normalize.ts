// Maps raw Guardian API items into our GraphQL Article shape.
// If you ever switch data sources, this and newsClient.ts are the only files that change.

export interface Article {
  id: string;
  title: string;
  summary: string | null;
  imageUrl: string | null;
  source: string;
  publishedAt: string;
  url: string;
}

// The subset of the Guardian response we rely on.
export interface GuardianItem {
  id: string; // path-style, e.g. "world/2026/nov/09/some-story"
  webTitle: string;
  webUrl: string;
  webPublicationDate: string; // ISO 8601
  fields?: {
    trailText?: string; // may contain HTML
    thumbnail?: string;
  };
}

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

function htmlToText(html: string | undefined): string | null {
  if (!html) return null;
  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (m) => ENTITIES[m] ?? m)
    .trim();
  return text.length > 0 ? text : null;
}

export function normalizeArticle(item: GuardianItem): Article {
  return {
    id: item.id,
    title: item.webTitle,
    summary: htmlToText(item.fields?.trailText),
    imageUrl: item.fields?.thumbnail ?? null,
    source: "The Guardian",
    publishedAt: item.webPublicationDate,
    url: item.webUrl,
  };
}
