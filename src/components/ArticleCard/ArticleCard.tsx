import Link from "next/link";
import type { Article } from "@/types/article";
import { formatFullDate, formatRelativeTime } from "@/lib/formatDate";
import styles from "./ArticleCard.module.scss";

interface ArticleCardProps {
  article: Article;
  variant?: "lead" | "standard";
}

export function ArticleCard({ article, variant = "standard" }: ArticleCardProps) {
  const { id, title, summary, imageUrl, source, publishedAt } = article;
  const isLead = variant === "lead";

  return (
    <article className={`${styles.card} ${isLead ? styles.lead : ""}`}>
      {imageUrl && (
        <div className={styles.media}>
          {/* Decorative: the headline already describes the story, so alt is empty. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="" loading={isLead ? "eager" : "lazy"} />
        </div>
      )}
      <div className={styles.body}>
        <h2 className={styles.title}>
          {/* Guardian IDs contain slashes; the route is /article/[...id] */}
          <Link href={`/article/${id}`} className={styles.link}>
            {title}
          </Link>
        </h2>
        {summary && <p className={styles.summary}>{summary}</p>}
        <p className={styles.meta}>
          <span className={styles.source}>{source}</span>
          <time dateTime={publishedAt} title={formatFullDate(publishedAt)}>
            {formatRelativeTime(publishedAt)}
          </time>
        </p>
      </div>
    </article>
  );
}
