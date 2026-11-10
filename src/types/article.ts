// Client-side shape of the GraphQL Article type (mirrors src/graphql/schema.ts).
export interface Article {
  id: string;
  title: string;
  summary: string | null;
  imageUrl: string | null;
  source: string;
  publishedAt: string;
  url: string;
}
