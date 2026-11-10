import type { Article } from "@/types/article";
import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import styles from "./ArticleList.module.scss";

interface ArticleListProps {
  articles: Article[];
  /** Show the first article as a larger lead story. Turn off for search results. */
  featureFirst?: boolean;
}

export function ArticleList({ articles, featureFirst = true }: ArticleListProps) {
  return (
    <ul className={styles.list}>
      {articles.map((article, index) => {
        const isLead = featureFirst && index === 0;
        return (
          <li key={article.id} className={isLead ? styles.lead : undefined}>
            <ArticleCard article={article} variant={isLead ? "lead" : "standard"} />
          </li>
        );
      })}
    </ul>
  );
}
