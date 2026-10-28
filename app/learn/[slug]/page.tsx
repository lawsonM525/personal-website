import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@/components/retro-icons";
import { stegaClean } from "@sanity/client/stega";
import { PortableArticle } from "@/components/learn/portable-article";
import { ArticleDiscussion } from "@/components/learn/article-discussion";
import { LearnThemeToggle } from "@/components/learn/learn-theme";
import { NewsletterSignup } from "@/components/learn/newsletter-signup";
import { RetroWindow } from "@/components/learn/retro-window";
import { ArticleHeader } from "@/components/learn/article-header";
import { absoluteUrl, personId, serializeStructuredData } from "@/lib/seo";
import { authorPath, articleSearchTitle } from "@/lib/editorial";
import { sanityClient, sanityFetchOptions } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import {
  ARTICLE_METADATA_QUERY,
  ARTICLE_QUERY,
  ARTICLE_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import {
  categoryLabels,
  type LearnArticle,
  readingTime,
} from "@/sanity/lib/types";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await sanityClient
    .withConfig({ useCdn: false })
    .fetch<{ slug: string }[]>(ARTICLE_SLUGS_QUERY);
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await sanityClient.fetch<{
    title: string;
    dek: string;
    seoTitle?: string;
    seoDescription?: string;
    coverImageUrl?: string;
    noIndex?: boolean;
    authorName?: string;
    publishedAt?: string;
    _updatedAt?: string;
  } | null>(ARTICLE_METADATA_QUERY, { slug }, { ...sanityFetchOptions, stega: false });

  if (!article) return {};
  const title = articleSearchTitle(slug, article.title, article.seoTitle);
  const description = article.seoDescription || article.dek;
  const path = `/learn/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: article.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      url: absoluteUrl(path),
      title,
      description,
      authors: [article.authorName || "Michelle Lawson"],
      publishedTime: article.publishedAt,
      modifiedTime: article._updatedAt || article.publishedAt,
      images: article.coverImageUrl ? [article.coverImageUrl] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: article.coverImageUrl ? [article.coverImageUrl] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: ARTICLE_QUERY,
    params: { slug },
  });
  const article = data as LearnArticle | null;
  if (!article) notFound();

  const category = stegaClean(article.category);
  const publishedAt = stegaClean(article.publishedAt);
  const updatedAt = article.updatedAt ? stegaClean(article.updatedAt) : publishedAt;
  const authorHref = authorPath(article.author ? { name: stegaClean(article.author.name), slug: article.author.slug ? stegaClean(article.author.slug) : undefined } : undefined);
  const coverImageUrl = article.coverImageUrl
    ? stegaClean(article.coverImageUrl)
    : undefined;
  const sourceUrl = article.sourceUrl
    ? stegaClean(article.sourceUrl)
    : undefined;

  const hasEmbeddedVideo = article.body?.some(
    (block) => (block as { _type?: string })._type === "videoEmbed",
  );

  const canonical = absoluteUrl(`/learn/${slug}`);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonical}#article`,
    headline: article.title,
    description: article.seo?.description || article.dek,
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: {
      "@type": "Person",
      name: article.author?.name || "Michelle Lawson",
      "@id": authorHref ? (authorHref === "/about" ? personId : `${absoluteUrl(authorHref)}#person`) : undefined,
      url: authorHref ? absoluteUrl(authorHref) : undefined,
    },
    publisher: { "@id": personId },
    mainEntityOfPage: canonical,
    image: coverImageUrl,
  };
  const faqJsonLd = article.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: article.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <main className="learn-bg min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeStructuredData(faqJsonLd) }}
        />
      )}


      <article>
        <ArticleHeader category={categoryLabels[category] || article.category} title={article.title} description={article.dek} authorName={article.author?.name || "Michelle Lawson"} authorHref={authorHref} publishedAt={publishedAt} updatedAt={updatedAt} readingMinutes={readingTime(article.estimatedWords)} />

        {coverImageUrl && (
          <div className="px-5 pt-10 sm:px-8 sm:pt-14">
            <RetroWindow
              title="MICHELLE'S COMPUTER"
              className="mx-auto max-w-6xl"
              contentClassName="relative aspect-[16/9] bg-[#d9d2ff]"
            >
              <Image
                src={coverImageUrl}
                alt={article.coverImageAlt || ""}
                fill
                priority
                fetchPriority="high"
                unoptimized={false}
                sizes="(min-width: 1280px) 1152px, 100vw"
                className="object-cover"
              />
            </RetroWindow>
          </div>
        )}

        <div className="mx-auto grid grid-cols-1 max-w-6xl gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,760px)_240px]">
          <div className="min-w-0">
            {sourceUrl && !hasEmbeddedVideo && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="learn-border learn-shadow-sm mb-9 inline-flex items-center gap-2 border-2 bg-[#d7ff45] px-4 py-2 text-sm font-black text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                Watch the original short version{" "}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {article.summary && (
              <aside className="learn-surface learn-border learn-shadow-sm mb-10 border-2 p-6 sm:p-7">
                <p className="text-xs font-black uppercase tracking-[.2em]">
                  The quick answer
                </p>
                <p className="mt-3 text-lg font-semibold leading-8">
                  {article.summary}
                </p>
              </aside>
            )}
            {article.body?.length ? (
              <PortableArticle value={article.body} />
            ) : null}

            {!!article.resources?.length && (
              <section className="learn-border mt-16 border-t-4 pt-8">
                <p className="text-xs font-black uppercase tracking-[.2em]">
                  Take these with you
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-tight">
                  Resources
                </h2>
                <div className="mt-7 grid gap-4">
                  {article.resources.map((resource) => (
                    <a
                      key={resource._key}
                      href={stegaClean(resource.url)}
                      target="_blank"
                      rel="noreferrer"
                      className="learn-surface learn-border learn-shadow-sm group border-2 p-5 hover:bg-[#d7ff45] hover:text-black"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-black">{resource.title}</h3>
                        <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                      {resource.description && (
                        <p className="learn-muted mt-2 leading-7 group-hover:text-black/70">
                          {resource.description}
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              </section>
            )}

            {!!article.faq?.length && (
              <section className="learn-border mt-16 border-t-4 pt-8">
                <p className="text-xs font-black uppercase tracking-[.2em]">
                  No mysterious leftovers
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-tight">
                  Questions you might still have
                </h2>
                <div className="learn-border mt-7 divide-y-2 border-y-2 [border-color:var(--learn-ink)] [--tw-divide-opacity:1]">
                  {article.faq.map((item) => (
                    <details key={item._key} className="group py-5">
                      <summary className="cursor-pointer list-none pr-8 text-lg font-black">
                        {item.question}
                      </summary>
                      <p className="learn-muted max-w-2xl pt-3 leading-7">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <ArticleDiscussion
              articleId={article._id}
              initialComments={article.comments || []}
              initialLikeCount={article.likeCount || 0}
            />
          </div>

          <aside className="learn-surface learn-border learn-shadow-sm h-fit border-2 p-5 lg:sticky lg:top-28">
            <p className="text-xs font-black uppercase tracking-[.18em]">
              Michelle&apos;s Computer
            </p>
            <p className="learn-muted mt-3 leading-7">
              Practical ideas for building with AI, figuring out your career,
              and making college work for you.
            </p>
            <div className="article-reading-tools"><LearnThemeToggle /></div>
            <Link
              href="/learn"
              className="mt-5 inline-flex items-center gap-2 font-black decoration-2 underline underline-offset-4"
            >
              Keep learning <ArrowUpRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </article>
      <section className="px-5 pt-4 sm:px-8">
        <NewsletterSignup />
      </section>
    </main>
  );
}
