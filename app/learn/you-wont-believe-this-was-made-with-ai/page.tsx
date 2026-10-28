import { Fragment } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Bookmark, Sparkles } from "@/components/retro-icons"
import { ArticleHeader } from "@/components/learn/article-header"
import { RetroWindow } from "@/components/learn/retro-window"
import { findsArticle, findsPath, michellesFinds } from "@/lib/michelles-finds"
import { absoluteUrl, buildPageMetadata, personId, serializeStructuredData } from "@/lib/seo"
import { readingTime } from "@/sanity/lib/types"
import styles from "./finds.module.css"

export const metadata = buildPageMetadata({
  title: findsArticle.title,
  description: findsArticle.dek,
  path: findsPath,
  images: [michellesFinds[0].image],
  keywords: ["AI projects", "creative AI projects", "AI building inspiration", "Random-eyes"],
})

export default function MichellesFindsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: findsArticle.title,
    description: findsArticle.dek,
    url: absoluteUrl(findsPath),
    author: { "@id": personId },
    datePublished: findsArticle.publishedAt,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: michellesFinds.length,
      itemListElement: michellesFinds.map((find, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@type": "CreativeWork", name: find.name, url: find.projectUrl, image: absoluteUrl(find.image), creator: { "@type": "Person", name: find.creator }, citation: find.sourceUrl },
      })),
    },
  }

  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }} />
    <ArticleHeader category="Michelle’s finds" title={findsArticle.title} description={findsArticle.dek} authorName="Michelle Lawson" authorHref="/about" publishedAt={findsArticle.publishedAt} readingMinutes={readingTime(findsArticle.estimatedWords)} />

    <div className={styles.finds}>{michellesFinds.map((find, index) => <article className={styles.find} key={find.id} id={find.id}>
      <div className={styles.findHeading}><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span><div><p className={styles.eyebrow}>An internet find · Interactive project</p><h2>{find.headline}</h2><p className={styles.credit}>{find.name} by <a href={find.sourceUrl} target="_blank" rel="noopener noreferrer">{find.creator} <span>{find.handle}</span></a></p></div></div>
      <figure className={styles.preview}>
        <RetroWindow title={find.name.toUpperCase()}><a href={find.projectUrl} target="_blank" rel="noopener noreferrer" aria-label={`Try ${find.name} in a new tab`}><Image src={find.image} alt={find.imageAlt} width={1280} height={720} unoptimized={false} sizes="(max-width: 760px) 100vw, 1100px" priority={index === 0} /><span>Try it yourself <ArrowUpRight size={16} aria-hidden="true" /></span></a></RetroWindow>
        <figcaption>A look inside {find.name}. Project and visuals by {find.creator}.</figcaption>
      </figure>
      <div className={styles.story}>
        <div className={styles.commentary}><p className={styles.eyebrow}><Sparkles size={14} aria-hidden="true" />My thoughts</p>{find.reaction.map((paragraph, paragraphIndex) => <p className={styles.reaction} key={paragraphIndex}>{paragraph}</p>)}</div>
        <aside className={styles.details} aria-label={`${find.name} build details`}><p className={styles.eyebrow}>Behind the build</p><dl><div><dt>Made with</dt><dd>{find.tools.map((tool, toolIndex) => <Fragment key={tool.url}>{toolIndex > 0 && " + "}<a href={tool.url} target="_blank" rel="noopener noreferrer">{tool.name}</a></Fragment>)}</dd></div><div><dt>The process</dt><dd>{find.process}</dd></div></dl><p>Tools and process as described by the creator.</p><a href={find.processUrl} target="_blank" rel="noopener noreferrer">Read the build notes <ArrowUpRight size={13} aria-hidden="true" /></a></aside>
      </div>
      <div className={styles.links}><a href={find.projectUrl} target="_blank" rel="noopener noreferrer">Play with {find.name} <ArrowUpRight size={16} aria-hidden="true" /></a><a href={find.sourceUrl} target="_blank" rel="noopener noreferrer">See the original post <ArrowUpRight size={15} aria-hidden="true" /></a></div>
    </article>)}</div>
    <footer className={styles.footer}><Bookmark size={20} aria-hidden="true" /><h2>Keeping the good stuff.</h2><p>This collection grows whenever I find another project that makes me go “whoa.” Every pick links back to its creator, so you can explore the work and the story behind it.</p><Link href="/learn">Find something to build next <ArrowUpRight size={15} aria-hidden="true" /></Link></footer>
  </main>
}
