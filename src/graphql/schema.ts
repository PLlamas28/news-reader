export const typeDefs = /* GraphQL */ `
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
`;
