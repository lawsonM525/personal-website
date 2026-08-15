import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { stegaClean } from "@sanity/client/stega";
import { ArticleCard } from "@/components/learn/article-card";
import { LearnMasthead } from "@/components/learn/learn-masthead";
import { NewsletterSignup } from "@/components/learn/newsletter-signup";
import { buildPageMetadata } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";
import { ARTICLES_QUERY } from "@/sanity/lib/queries";
import {
  categoryLabels,
  type LearnArticleCard,
  readingTime,
} from "@/sanity/lib/types";

export const metadata: Metadata = buildPageMetadata({
  title: "Learn",
  description:
    "Practical guides from Michelle Lawson about AI, building, college, careers, and using the internet well.",
  path: "/learn",
  keywords: [
    "practical AI guides",
    "AI for students",
    "Gen Z career advice",
    "college career guides",
  ],
});

export default async function LearnPage() {
  const { data } = await sanityFetch({ query: ARTICLES_QUERY });
  const articles = data as LearnArticleCard[];
  const [featured, ...rest] = articles;
  const featuredSlug = featured ? stegaClean(featured.slug) : undefined;
  const featuredCategory = featured ? stegaClean(featured.category) : undefined;
  const featuredPublishedAt = featured
    ? stegaClean(featured.publishedAt)
    : undefined;

  return (
    <main className="learn-bg min-h-screen pb-24">
      <LearnMasthead />

      <header className="learn-border border-b-2 px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[.2em]">Learn</p>
          <h1 className="mt-5 max-w-5xl font-serif text-[clamp(3.25rem,7vw,6.7rem)] leading-[.9] tracking-[-.055em]">
            Build interesting things. Find better opportunities. Stop feeling
            behind.
          </h1>
          <p className="learn-muted mt-7 max-w-3xl text-lg font-semibold leading-8 sm:text-xl">
            Practical guides for using AI, building projects, and navigating
            college and your career—with the exact steps, prompts, and resources
            included.
          </p>
        </div>
      </header>

      {featured ? (
        <>
          <section className="learn-border border-b-2 px-5 py-12 sm:px-8 sm:py-16">
            <article className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end">
              <div>
                <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[.17em]">
                  <span className="learn-contrast px-3 py-1.5">
                    {categoryLabels[featuredCategory!] || featured.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4" />{" "}
                    {readingTime(featured.estimatedWords)} min read
                  </span>
                  <span>Latest</span>
                </div>
                <h2 className="max-w-5xl font-serif text-[clamp(3rem,7vw,6.6rem)] leading-[.9] tracking-[-.055em]">
                  <Link
                    href={`/learn/${featuredSlug}`}
                    className="decoration-4 underline-offset-8 hover:underline"
                  >
                    {featured.title}
                  </Link>
                </h2>
                <p className="learn-muted mt-7 max-w-3xl text-lg font-semibold leading-8 sm:text-xl">
                  {featured.dek}
                </p>
              </div>
              <div className="learn-border border-t-2 pt-5 lg:border-l-2 lg:border-t-0 lg:pl-7 lg:pt-0">
                <p className="text-sm font-black">
                  {featured.author?.name || "Michelle Lawson"}
                </p>
                <time
                  dateTime={featuredPublishedAt}
                  className="learn-muted mt-1 block text-sm"
                >
                  {new Intl.DateTimeFormat("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(featuredPublishedAt!))}
                </time>
                <Link
                  href={`/learn/${featuredSlug}`}
                  className="mt-6 inline-flex items-center gap-2 font-black underline decoration-2 underline-offset-4"
                >
                  Read it <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </section>

          {rest.length > 0 && (
            <section className="px-5 py-14 sm:px-8 sm:py-18">
              <div className="mx-auto max-w-6xl">
                <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">
                  More to read
                </h2>
                <div className="learn-border mt-7 border-t-2">
                  {rest.map((article) => (
                    <ArticleCard key={article._id} article={article} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="px-5 py-16 sm:px-8">
          <div className="learn-surface learn-border learn-shadow-md mx-auto max-w-6xl border-2 p-8 sm:p-12">
            <h2 className="font-serif text-4xl sm:text-5xl">
              The first guide is almost ready.
            </h2>
          </div>
        </section>
      )}

      <section className="px-5 pt-14 sm:px-8">
        <NewsletterSignup />
      </section>
    </main>
  );
}
