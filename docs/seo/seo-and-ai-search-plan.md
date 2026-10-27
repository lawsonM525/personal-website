# SEO and AI search plan

## Current position

The site has a working foundation, not a completed search program. The current visual/mobile/book release was published through PR #3 (production merge `ab62b79954908bc3f73083d596f8a97b1e087ced`). The live audit returned HTTP 200 for the main pages, robots file and sitemap, and confirmed 230 original book figures. The baseline report is generated locally with `node scripts/audit-site-seo.mjs https://michellescomputer.com output/seo-launch-baseline.json`.

Existing strengths: server-rendered page content, canonical tags on primary pages, an XML sitemap, permissive crawling, article/FAQ markup, author bylines, descriptive article content, and original illustrations. All 20 release tests, TypeScript, the production build, and the 30-route production smoke test passed.

## First technical pass

| Finding in the live audit | First-pass correction |
| --- | --- |
| RAG and Delta project pages canonicalized to `/projects` | Give each project its own canonical, title and description; include both in the sitemap. |
| Most sharing previews used `/placeholder.jpg` | Generate a branded 1200×630 PNG; use the actual book cover for the guide. |
| Several titles repeated Michelle Lawson twice | Use the site brand in the shared title template. |
| Global markup used `Website` and stale/inconsistent profile links | Use the correct `WebSite` type and stable Person/WebSite identifiers with profile links already visible on the site. |
| The illustrated guide had no Book entity | Add author, canonical URL, cover, format, language, and page count. Do not invent an ISBN, price, or publication date. |
| Sitemap timestamps changed on every generation | Omit unverified static dates; retain real CMS update dates when valid. |
| Submission/proposal utilities were eligible for indexing | Add noindex to those pages and keep them out of the sitemap. |
| `ai.txt` advertised the archived resources route as preferred | Point to current canonical content and explain the intentionally scrambled book preview. |
| Crawler policy was implicit | Explicitly allow OAI-SearchBot while preserving the existing general policy. |

Acceptance: production metadata matches each tested route; sharing images load; Person/WebSite/Book JSON-LD parses; utility pages are noindex; sitemap URLs are canonical and indexable; the release features remain intact. `tests/seo.test.mjs`, `tests/seo-smoke.mjs`, the route suite, and the reusable audit script cover this pass.

Local verification passed: 24 unit tests, TypeScript/build checks, 30 route responses, and a 13-page SEO crawl. The crawl also checked the 1200×630 sharing PNG, all 230 original book figures, proposal/form noindex rules, and the production-only lock on the author proof. Search Console ownership and actual indexing remain unverified.

## Next priorities

### 1. Verify discovery and measurement

Check existing ownership in Google Search Console and Bing Webmaster Tools, submit the canonical sitemap, inspect important URLs, and record baseline queries, clicks, impressions, CTR, indexed pages, and crawl problems. Owner access has not been verified. No new account or DNS verification has been created.

Verify the existing GA4 and DataFast properties before relying on their reports. The DataFast tag now uses `michellescomputer.com` and Michelle's supplied website ID; confirm incoming pageviews in the DataFast dashboard. Measure organic landing pages and outbound guide/signup clicks, then confirm completed conversions only where the destination supplies reliable data. Separate human referrals from crawler requests.

### 2. Improve indexable content and the book preview

The large, scrambled reader needs a deliberate indexing boundary. `data-nosnippet` limits snippets; it does not establish a clean content index. Evaluate a clean, indexable book landing/sample page with the long scrambled reader on a separate noindex route. Preserve the original cover, illustrations, readable opening, buyer links, and desktop window experience.

Check the startup overlay with JavaScript disabled and URL Inspection. Content already exists in the server HTML, but the welcome window is temporarily hidden during startup. Keep the animation while ensuring reliable progressive rendering. Test redirects and content parity across `/?desktop=1`, app queries, archived URLs, and custom-domain variants.

Review article authorship and update dates, complete truthful entity links, and keep schema synchronized with visible content. Guest authors must not inherit Michelle's author URL. Keep readable summaries, clear headings, citations, original screenshots, and useful image alternatives. Do not add invisible FAQ content for markup.

Review About's older student wording, follower counts, and future-tense 2025 internship copy against Michelle's current biography before changing those claims. The first pass keeps the search description evergreen without inventing a graduation or employment status.

### 3. Build search demand around useful original work

Validate seed themes against Search Console and actual audience questions: beginner AI, creative AI projects, building without a CS background, and AI for students. Choose a small number of topics with evidence, not invented keyword volumes. Expand the existing wardrobe project, book sample, RAG explanation, and research pages with original demonstrations and internal links before creating many thin pages.

### 4. Measure performance and iterate

Run mobile and desktop lab checks on home, Learn, an article, the book and Explorer, then compare with field Core Web Vitals when enough data exists. Inspect font cost, image dimensions, lazy loading, and the long reader's DOM/payload. Record the actual results rather than claiming a perfect score.

Track organic conversions and AI referral/citation samples against a repeatable set of real questions. Review failures in context; one sample response is not an AI ranking. Indexing and citations cannot be guaranteed.

## Evidence and boundaries

Google says its AI search features use the usual SEO fundamentals; there is no required special AI text file or special schema. Crawl access, important text, internal links, useful media, and accurate visible structured data matter. [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)

OpenAI separates search access through OAI-SearchBot from training access through GPTBot. This pass explicitly permits search and does not change the existing training policy. [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots)

Google does not use the keywords meta tag for web ranking. Removing a large repeated keyword list is cleanup, not a ranking claim. [Google on meta keywords](https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag)

Sitemap modification dates must reflect meaningful content changes; omitted dates are preferable to fabricated freshness. [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
