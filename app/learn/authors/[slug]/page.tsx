import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound, redirect } from "next/navigation"
import { stegaClean } from "@sanity/client/stega"
import { sanityClient, sanityFetchOptions } from "@/sanity/lib/client"
import { AUTHOR_QUERY, SITEMAP_AUTHORS_QUERY } from "@/sanity/lib/queries"
import type { LearnAuthor, LearnArticleCard } from "@/sanity/lib/types"
import { absoluteUrl, buildPageMetadata, serializeStructuredData } from "@/lib/seo"
import { articleDate } from "@/lib/editorial"
import styles from "./author.module.css"

type Author = LearnAuthor & { articles: LearnArticleCard[] }
type Props = { params: Promise<{ slug: string }> }
async function getAuthor(slug: string) { return sanityClient.fetch<Author | null>(AUTHOR_QUERY, { slug }, { ...sanityFetchOptions, stega: false }) }

export async function generateStaticParams() {
  const authors = await sanityClient.withConfig({ useCdn: false }).fetch<{ slug: string }[]>(SITEMAP_AUTHORS_QUERY)
  return authors.map(author => ({ slug: author.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthor(slug)
  if (!author?.articles.length) return {}
  return buildPageMetadata({ title: `${author.name} — Learn author`, description: author.bio || `Read ${author.name}’s articles on Michelle’s Computer.`, path: `/learn/authors/${slug}`, ...(author.imageUrl ? { images: [author.imageUrl] } : {}) })
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params
  if (slug === "michelle-lawson") redirect("/about")
  const author = await getAuthor(slug)
  if (!author?.articles.length) notFound()
  const url = absoluteUrl(`/learn/authors/${slug}`)
  const person = { "@type": "Person", "@id": `${url}#person`, name: author.name, url, ...(author.bio ? { description: author.bio } : {}), ...(author.imageUrl ? { image: author.imageUrl } : {}) }
  const data = { "@context": "https://schema.org", "@type": "ProfilePage", url, mainEntity: person }
  return <main className={`learn-bg ${styles.profile}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(data) }} />
    <Link href="/learn" className={styles.back}>← Back to Learn</Link>
    <header><p className={styles.eyebrow}>Contributors to Michelle’s Computer</p><h1>{author.name}</h1>{author.role && <p className={styles.role}>{author.role}</p>}{author.bio && <p>{author.bio}</p>}</header>
    <section aria-labelledby="author-articles"><h2 id="author-articles">Articles by {author.name}</h2>{author.articles.map(article => <article key={article._id} className={styles.article}>
      {article.coverImageUrl && <Link href={`/learn/${stegaClean(article.slug)}`} aria-label={`Read ${article.title}`}><Image src={article.coverImageUrl} alt={article.coverImageAlt || ""} width={480} height={270} unoptimized={false} sizes="(max-width: 760px) 90vw, 260px" /></Link>}
      <div><h3><Link href={`/learn/${stegaClean(article.slug)}`}>{article.title}</Link></h3><p>{article.dek}</p><time dateTime={article.publishedAt}>{articleDate(article.publishedAt,"short")}</time><Link className={styles.read} href={`/learn/${stegaClean(article.slug)}`}>Read article ↗</Link></div>
    </article>)}</section>
  </main>
}
