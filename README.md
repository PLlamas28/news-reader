# News Reader

A small, fast news-reading web app built with Next.js, TypeScript, and GraphQL.

## Goal
Practice building a production-style frontend: a typed GraphQL API layer, a responsive React UI, and a deployed app. Scope is deliberately small so it gets finished.

## Tech stack
- **Frontend:** Next.js, React, TypeScript
- **Styling:** Sass (CSS modules)
- **API layer:** GraphQL server (GraphQL Yoga or Apollo Server) in a Next.js route handler, wrapping a free news API
- **Client:** Apollo Client or urql
- **Data source:** one free news API (e.g. The Guardian Open Platform or Hacker News). Check its terms and key requirements first.
- **Deploy:** Vercel

## Features

### MVP
- Home page: list of top stories (headline, image, source, time)
- Category filter (e.g. world, tech, sports)
- Article detail page
- Search by keyword
- Loading, empty, and error states
- Responsive layout (mobile first)

### Stretch
- Save articles to read later (local storage)
- Dark mode
- Infinite scroll or pagination
- Basic tests (Vitest or Jest + React Testing Library)

## GraphQL schema (sketch)
```graphql
type Article {
  id: ID!
  title: String!
  summary: String
  imageUrl: String
  source: String!
  publishedAt: String!
  url: String!
}

type Query {
  topStories(category: String, page: Int): [Article!]!
  article(id: ID!): Article
  search(query: String!, page: Int): [Article!]!
}
```

## Architecture
Browser (React UI) -> GraphQL endpoint (`/api/graphql`) -> resolvers -> external news API. API keys stay server-side in environment variables.

## Milestones
1. **Setup:** Next.js + TypeScript project, Sass, GraphQL endpoint returning mock data
2. **Real data:** resolvers call the news API; home page renders live stories
3. **Features:** category filter, article page, search, loading/error states
4. **Polish:** responsive design, accessibility pass (semantic HTML, keyboard navigation, alt text)
5. **Ship:** deploy to Vercel, add screenshots and setup instructions to this README

## Done when
- Deployed and working at a public URL
- Code is on GitHub with a clear README (setup steps, screenshots, what I learned)
- No API keys committed to the repo

## Notes
_Add decisions, tradeoffs, and things I learned here as I build._
