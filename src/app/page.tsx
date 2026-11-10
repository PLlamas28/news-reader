"use client";

import { useQuery } from "urql";
import { ArticleList } from "@/components/ArticleList/ArticleList";
import { TOP_STORIES_QUERY } from "@/graphql/queries";
import type { Article } from "@/types/article";
import styles from "./page.module.scss";

export default function HomePage() {
  const [{ data, fetching, error }] = useQuery<{ topStories: Article[] }>({
    query: TOP_STORIES_QUERY,
  });

  return (
    <>
      <h1 className={styles.heading}>Top stories</h1>

      {/* Basic placeholders. Step 3 replaces these with the Loading/Empty/Error components. */}
      {fetching && <p role="status" className={styles.status}>Loading stories…</p>}
      {error && (
        <p role="alert" className={styles.status}>
          Couldn’t load stories. Refresh the page to try again.
        </p>
      )}
      {data && data.topStories.length === 0 && (
        <p className={styles.status}>No stories found.</p>
      )}
      {data && data.topStories.length > 0 && <ArticleList articles={data.topStories} />}
    </>
  );
}
