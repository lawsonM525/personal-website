# SEO and AI search plan

## Current position

The custom-domain site has a working technical foundation and is being improved through the October 2026 follow-through below. Before this pass, all 20 canonical sitemap URLs returned HTTP 200. Titles, descriptions, canonical tags, sharing images, Person/WebSite/Book/Article data, utility-page noindex rules, and the 230 original book figures were verified. The source audit is generated with `node scripts/audit-site-seo.mjs https://michellescomputer.com output/seo-audit-current.json`.

Search Console is now verified and the sitemap has been submitted. Google's current indexed homepage record still reflects the old Lovable deployment; a successful live test and fresh indexing request address discovery of the current custom-domain site. This is not yet a completed search program: actual indexing, query performance, and conversions need ongoing evidence.

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

Initial local verification passed: 24 unit tests, TypeScript/build checks, 30 route responses, and a 13-page SEO crawl. The crawl also checked the 1200×630 sharing PNG, all 230 original book figures, proposal/form noindex rules, and the production-only lock on the author proof. Search Console ownership was unverified at that stage; the follow-through below records its subsequent verification.

## October 2026 follow-through

Search Console ownership is verified for `michelle@michellescomputer.com` through the existing domain provider verification. The canonical sitemap was accepted with **Success** and 20 discovered pages on October 27. The homepage's previous indexed record still points to `michellescomputer.lovable.app`, based on a September 19 crawl. The current homepage declares the correct custom-domain canonical. Google's live test says **URL is available to Google**; a fresh homepage indexing request was accepted into its priority crawl queue. This is a crawl request, not confirmation of indexing or canonical selection. Performance, page-indexing, and field-experience reports are still processing.

### Search and reader changes

- `/girly-guide-to-ai` becomes a clean, indexable book introduction with the original cover, a genuine readable excerpt, an original illustration, chapter links, visible FAQs, the 2023 author note, and related articles. Book and FAQ markup match visible content.
- The continuous illustrated preview moves to `/girly-guide-to-ai/read`, with `noindex,follow` and a self-canonical. Old chapter/preview fragments redirect to the corresponding reader location. Chapters load as needed, with Contents, focus mode, text sizing, and retry controls. All 230 original figures remain available. The public chapter endpoint serves only prepared scrambled preview data, including when `?preview=full` is supplied.
- Initial local production HTML is about 77 KB for the book landing and 168 KB for the first reader chapters, compared with 1.42 MB for the previous all-at-once reader. The image pipeline serves responsive copies of Learn artwork and the cover without replacing source assets.
- Guest bylines link to truthful author profiles. Leesha Mogha's profile lists her two articles; it is included in the sitemap. Article schema and Open Graph carry real CMS publication/update timestamps, and visible update labels use the same dates. Dates render consistently in Michelle's Pacific time zone.
- Michelle confirmed her current role and biography: Forward Deployed AI Engineer at MongoDB since September 2026, completed summer 2025 internship, and a community of 250,000+ Gen Z builders and learners. About, its metadata, and Person/ProfilePage data use those facts.
- Reminder and Posts descriptions now describe their actual content. The Learn description includes guest writers. The two Leesha articles have concise search titles; their visible titles, prose, author credits, and original illustrations stay intact. The local Sanity client could not update CMS metadata (read-only permissions), so the frontend replaces only the two known legacy search titles and respects any subsequent Studio edit.

### Measurement

DataFast's `michellescomputer.com` property is accessible and was receiving human visits before this change (30 visitors in the dashboard's selected Today period). Keep this separate from AI crawler activity. A bot request does not prove an AI citation or a human referral.

The release instruments six production-domain-only goals:

| Goal | Meaning |
| --- | --- |
| `guide_preview_start` | A reader/sample start link was clicked. |
| `guide_purchase_click` | A Gumroad purchase link was clicked; this is not a completed purchase. |
| `magazine_waitlist_open` | A link to the magazine signup page was clicked. |
| `magazine_waitlist_submitted` | The matching embedded Tally form sent its submitted event. |
| `penpal_form_open` | A link to the pen-pal signup page was clicked. |
| `penpal_signup_submitted` | The matching embedded Tally form sent its submitted event. |

Tally submission events must match the origin, iframe window, form ID, and event type. Each form instance deduplicates submission events. No answers, email addresses, query strings, or fragments are added to goal properties. Standalone Tally submissions cannot be counted by this listener. Purchase completion needs a payment-provider integration and is not inferred from clicks.

The official DataFast AI crawler tracker runs in background middleware on Vercel production only. It filters human/API/static requests locally, excludes feedback and proposal routes, removes URL queries/fragments and unrelated request headers, and does not make a page wait for analytics. It can record requested public paths and crawler identity; real crawler verification/classification is performed by DataFast. No synthetic production crawler counts should be treated as real activity.

The installed GA4 tag is `G-JDSM0Q7X0G`. Access is confirmed under `michelle@michellelawson.me`: account **MichelleLawson** (`350055167`), property **michellelawson.mr** (`495715772`), web stream **Michelle Lawson** (`11446907667`). Its legacy stream URL is `https://michellelawson.me`, but the matching measurement ID and Realtime page titles confirm that Michelle's Computer is sending data here. Enhanced history-change page measurement was already enabled, so no duplicate manual pageview tracking was added.

Both `magazine_waitlist_submitted` and `penpal_signup_submitted` are registered as GA4 key events, counted once per event, with no invented default monetary value. They use the existing client events, not URL-derived duplicates. No fake form submissions were sent. One real internal QA click on the live Start reading link appeared as **`guide_preview_start: 1`** in both DataFast and GA4 Realtime. This verifies delivery of that click event, not submission or purchase completion. DataFast goals appear when events arrive; its Add goals panel supplies instrumentation instructions rather than a manual goal-creation form. Bot counts remain empty pending real verified requests.

Recommended DataFast funnels after events arrive: preview start → purchase-link click, magazine open → submitted, and pen-pal open → submitted. Select completed magazine signups as the primary KPI when reliable submissions appear. Segment organic/search and AI human referrals separately from bot requests. Avoid interpreting the current empty funnel as a zero conversion rate.

### Content map and next editorial work

These are audience-question hypotheses, not researched keyword-volume claims. Use the first Search Console query data and recurring audience questions to refine the order.

| Audience question | Existing destination | Next useful addition | Evidence to measure |
| --- | --- | --- | --- |
| What is AI, and where should I start? | Book landing + readable opening | Keep the 2023 context explicit; publish a separately dated guide update after fact-checking current tools. | Beginner queries, sample starts, guide-link clicks. |
| How do I build an AI wardrobe or digital closet? | Wardrobe tutorial | Re-test the workflow, add original step screenshots and one finished example, and state tested tool versions/dates. | Tutorial queries, engagement, relevant signup or guide clicks. |
| What can people actually make with AI? | Michelle's finds | Add only projects Michelle has tried, her own reaction, original creator credit, tools, and source links. | Project-specific queries and outbound demo clicks. |
| What are AI alignment and AI safety? | Leesha's alignment article | Keep the original argument and source citations; add an editorial update only for substantive changes. | Alignment/safety queries and engaged reads. |
| How can AI affect cybersecurity and digital dependence? | Leesha's digital-conquest article | Keep claims sourced; connect a future practical security explainer when one is written and reviewed. | Cybersecurity/dependence queries and engaged reads. |
| What is RAG, and what does a real implementation look like? | RAG project | Add a plain-language architecture explanation, original example, limitations, and dated evaluation results. | RAG queries, project engagement, qualified contact clicks. |

Link related explanations from relevant paragraphs and the Learn hub. Each substantial new article should answer one concrete question early, include original examples/media, name its author, cite primary sources, and show meaningful update dates. Preserve Michelle's voice. Do not mass-publish thin AI-generated pages, add hidden FAQs, or promise AI citations.

### Performance baseline and validation

The public PageSpeed UI supplied Lighthouse 13.5.0 lab reports. Field data was **No Data**, so these are not field Core Web Vitals results. The anonymous PageSpeed API hit its project quota; do not represent that API error as a site performance failure.

| Before this release | Mobile performance / LCP | Desktop performance / LCP |
| --- | --- | --- |
| Home | 65 / 6.9 s | 95 / 1.2 s |
| Book | 65 / 8.3 s | 87 / 1.5 s |
| Learn | 60 / 12.1 s | 91 / 1.8 s |
| Alignment article | 66 / 7.4 s | 96 / 1.4 s |
| Explorer | 78 / 6.1 s | 98 / 1.0 s |

Home intentionally includes the skippable 3.1-second startup animation, which contributes to first-visit lab timing. Preserve the animation and its no-JavaScript fallback; distinguish its presentation delay from slow downloads. Compare the book and Learn after deployment, then check an article and Explorer on mobile and desktop. Record actual reports, avoid a blanket perfect-score claim, and use Search Console field data when sufficient traffic exists.

The first follow-through release is live through [PR 27](https://github.com/lawsonM525/personal-website/pull/27), production commit `d07e25c1afa489c86798b7b436c5948d0b774897`. The public SEO/privacy/image smoke suite passed after deployment. PageSpeed reports captured October 27 at about 8:02 PM Pacific show:

| After PR 27 | Mobile performance / LCP | Desktop performance / LCP |
| --- | --- | --- |
| [Learn](https://pagespeed.web.dev/analysis/https-michellescomputer-com-learn/hkqfop7ooi?form_factor=mobile) | 65 / 8.5 s | 99 / 0.9 s |
| [Book landing](https://pagespeed.web.dev/analysis/https-michellescomputer-com-girly-guide-to-ai/4tior0pz73?form_factor=mobile) | 67 / 7.6 s | 96 / 1.1 s |

Both pages retained zero measured layout shift and a Lighthouse SEO score of 100. Mobile loading still needs work; these single lab runs are not ranking or field-experience guarantees. Learn's new author link triggered a mobile tap-target warning (accessibility 96), prompting a 28 px minimum linked-byline target. Follow-up delivery changes serve the same denim at 700 CSS pixels using optimized 750/1080 px variants (about 128/213 KB instead of 365 KB), resize the tiny profile portrait, optimize the landing illustration, and stop preloading two noncritical decorative fonts. Original source artwork and typography are preserved. The follow-up passed the production build, 22 focused tests, 35 route responses, the SEO/privacy/image smoke suite, and a 390 px phone check with no horizontal overflow. It is released separately from concurrent Explorer and feedback work.

The exact staged release passed 22 focused unit tests, production build/type checks, 35 route responses, and the SEO/privacy/image smoke suite. Browser checks verified author search/profile links, chapter jumps through the glossary with all 230 figures, focus mode, mobile chapter controls, old preview links, and responsive image delivery. Concurrent Explorer and feedback work is excluded from this release. Evidence reports live under ignored `output/`; retain the exact deployed commit and public verification results there.

### Remaining external follow-up

1. Let Search Console finish processing, then inspect the custom-domain canonical selection, indexed pages, organic queries, impressions, clicks, and CTR. The submitted sitemap will be fetched again as content changes; the new author profile adds another canonical URL.
2. GA4 access, existing enhanced history measurement, signup key-event registration, and delivery of the preview-start goal are verified. Confirm real signup events when audience submissions arrive; purchase completion still needs a payment-provider integration.
3. Bing is paused at its Google sign-in choice. Automatic approval review rejected that new OAuth connection because the user has not specifically authorized Bing access to the Google account. Obtain that authorization before sign-in, then inspect any subsequent Search Console import permissions at action time. No Bing submission has happened.
4. Connect Search Console to DataFast only after reviewing the requested Google permissions and obtaining any required consent. Native Search Console already provides the underlying reports.
5. Update this record with the actual production speed comparison and any account-specific blockers. No scheduled follow-up has been created; a future check needs an explicit scheduling request.

## Evidence and boundaries

Google says its AI search features use the usual SEO fundamentals; there is no required special AI text file or special schema. Crawl access, important text, internal links, useful media, and accurate visible structured data matter. [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)

OpenAI separates search access through OAI-SearchBot from training access through GPTBot. This pass explicitly permits search and does not change the existing training policy. [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots)

Google does not use the keywords meta tag for web ranking. Removing a large repeated keyword list is cleanup, not a ranking claim. [Google on meta keywords](https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag)

Sitemap modification dates must reflect meaningful content changes; omitted dates are preferable to fabricated freshness. [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
