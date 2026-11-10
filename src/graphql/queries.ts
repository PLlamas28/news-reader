// Client-side query documents.
import { gql } from "urql";

export const TOP_STORIES_QUERY = gql`
  query TopStories($category: String, $page: Int) {
    topStories(category: $category, page: $page) {
      id
      title
      summary
      imageUrl
      source
      publishedAt
    }
  }
`;
