# Public site style coverage

## Styled routes (19)

- Existing D desktop routes: `/`, `/magazine`, `/penpals`.
- Shared public windows: `/about`, `/resources`, `/projects`, `/research`, `/talks`, `/posts`, `/reminder`, `/learn`, `/learn/how-to-build-ai-wardrobe-digital-closet`, `/projects/rag-in-practice`, `/10apps`, `/10apps/pagez/updates`, `/day2tools`, `/resources/computer`, `/resources/computer/toolkit`, `/resources/computer/quests`.
- Shared 404 page uses a working home link.

## Excluded at Michelle’s request (7)

`/begin`, `/begin/cursor`, `/begin/linkedin-learning`, `/begin/mbamission`, `/begin/openai`, `/begin/OpenAIBeta`, `/openaibeta`.

No source diffs in `app/begin`, `app/openaibeta` or `app/globals.css`. Original root `dark` class retained. New theme variables are scoped to `.computer-desktop-page`; excluded routes bypass the layout. Cursor proposal visually checked with its original black/white chalk presentation and no computer chrome.

## Verification

- Production build: all 39 generated routes, including existing API/SEO routes; type checks pass.
- `node --experimental-strip-types --test tests/tally-embed.test.mjs`: 3 passing recovery/readiness tests.
- `node tests/routes-smoke.mjs http://127.0.0.1:3105`: 26 UI routes HTTP 200, unknown route 404; excluded route markup has no shared window.
- Browser widths: all 19 public routes checked at 390×844; no document or shared-content horizontal overflow.
- Representative visual review: About, Resources, Learn/library/article, Projects, Posts, Research, resource desktop, public challenge pages; desktop and phone views across this iteration.
- Interaction checks: Posts platform tabs retain selection when minimized/restored; resource folder search/reset; Learn light/dark toggle; shared window minimize/restore and desktop maximize bounds; both signup windows’ first field visibility, switching, minimize/restore and close/reopen without iframe replacement.
- Local phone signup geometry: top bar bottom 51px; signup window top 65px, bottom 770px in an 844px viewport. Both forms ready on attempt 1. Desktop bounds and hosted verification are recorded in task evidence.

## Preserved exceptions and limits

`/talks` retains its existing Under Construction content. `/begin` retains its existing placeholder. Existing article/social data is not rewritten. Optional Learn night mode remains available. Browser phone screenshot capture sometimes returns scaled/repeated images; layout measurements and field visibility checks are recorded independently. No form data or submissions, emails, API mutations, purchases, production deployments or DNS changes are used for testing.
