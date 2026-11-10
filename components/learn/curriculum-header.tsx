import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "@/components/retro-icons";
import { articleDate } from "@/lib/editorial";
import { LearnThemeToggle } from "./learn-theme";
import styles from "./curriculum-reader.module.css";

export function CurriculumHeader({ title, welcome, authorName, authorHref, publishedAt, coverImageUrl, coverImageAlt, startId }: {
  title: string;
  welcome: string;
  authorName: string;
  authorHref?: string;
  publishedAt: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  startId?: string;
}) {
  return <header className={styles.header}>
    <div className={styles.headerTools}>
      <Link href="/learn"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Learn</Link>
      <LearnThemeToggle />
    </div>
    <h1>{title}</h1>
    <div className={styles.welcomeRow}>
      <div>
        <p className={styles.welcome}>{welcome}</p>
        <div className={styles.byline}>
          <span>By {authorHref ? <Link href={authorHref}>{authorName}</Link> : authorName}</span>
          <time dateTime={publishedAt}>{articleDate(publishedAt)}</time>
        </div>
        {startId && <a className={styles.startLink} href={`#${startId}`} data-curriculum-start>Explore the eight modules <span aria-hidden="true">↓</span></a>}
      </div>
      {coverImageUrl && <Image src={coverImageUrl} alt={coverImageAlt || ""} width={480} height={270} priority fetchPriority="high" sizes="(max-width: 640px) 240px, (max-width: 900px) 220px, 320px" className={styles.welcomeImage} />}
    </div>
  </header>;
}
