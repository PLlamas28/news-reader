import Link from "next/link";
import styles from "./Header.module.scss";

export function Header() {
  return (
    <>
      <a className={styles.skip} href="#main">
        Skip to main content
      </a>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link href="/" className={styles.brand}>
            News Reader
          </Link>
          {/* CategoryNav and SearchBar get added here in later steps */}
        </div>
      </header>
    </>
  );
}
