# Page-by-page feedback revision

Scope: review branch only. Pitch/proposal routes, production, DNS, nameservers and mail records stay unchanged.

## Delivered behavior

- Homepage keeps the approved D layout, blank envelope, serif welcome, original illustration assets, clean dock and native smooth cursor. The archived Resources shortcut now opens Projects using the same original folder artwork.
- First homepage visit shows a functional computer power button, followed by a brief startup animation. Skip is available. Local browser storage remembers completion; direct article/project/signup URLs go straight to content. Reduced motion shortens startup. Homepage content remains in server HTML, with a no-JavaScript fallback.
- Title bars support mouse dragging on desktop and keyboard arrow movement when focused. Home resets position; maximize and resize reset offsets. Fitting windows are constrained between the header and dock. Phones keep the stable scrolling layout.
- A small blue/orange butterfly replaces the plain top-left text as a provisional personal mark. Accessible home labeling remains. No final logo choice or new brand identity is assumed.
- Header email icon and Keep in touch use the existing public address `michelle@michellelawson.me`. The mailto draft has subject “Hello from Michelle’s Computer” and body “Hi Michelle,”. Testing inspects the destination; it does not open an email client or send anything.
- Learn uses a compact publication-style article feed with real cover art, metadata, search, and category filters when more than one published category exists. The duplicate internal navigation/masthead is removed. Existing Sanity data and article copy remain. The reading-page headline is smaller. No Substack account, subscription integration, or fake articles are introduced.
- Resources and all `/resources/*` paths are archived behind temporary redirects to Learn. Their source content is retained for later article conversion. Resources is removed from homepage shortcuts, primary/quick navigation, search, and sitemap.
- Projects retains the existing overview layout with light file-number accents. Nested projects return to `/projects`; challenge update pages return to `/10apps`. RAG’s scrolly presentation and Future U destination are preserved.
- ChatGPT robot project links to Michelle’s supplied post: https://www.instagram.com/p/DdWIPPFvV0X/ . Post author and destination were inspected in the browser. No longer project narrative is invented.
- Delta stock pitch now has `/projects/delta-stock-pitch`: all 19 original PDF pages can be read and enlarged in the site; Open PDF and Download PDF offer the original file. Source: the existing Drive link `1OW6sDup_4zfj5I3gpOxsL7V2M3F3iuuG`, verified application/pdf, 1,875,879 bytes, 19 pages, April 2023. No PDF contents were rewritten. WebP previews are rendered from the PDF at 1600px.
- Magazine and Pen pals links navigate to their own dedicated invitation pages with original illustrations. Explicit invitation clicks reveal the existing in-window Tally form. No automatic signup windows or page-covering modal is used. Existing guarded recovery, minimize/restore, reload and direct-link fallbacks remain.
- About remains in the approved computer styling without a new copy or content rewrite.

## Existing forms and verification boundary

Magazine: https://tally.so/r/zxP9JM . Pen pals: https://tally.so/r/68alRY . No form destinations, storage integrations, emails or automations are changed. Checks wait for visible real form fields without entering or submitting data. Existing downstream persistence is not exercised.

## Validation

Production build/type checks, route smoke checks, and existing Tally recovery tests. Browser checks cover desktop Learn layout/search, real mouse window movement, Home reset, first/return homepage visits, email target, dedicated signup navigation/fields, PDF page navigation/enlargement, project back links, and phone widths on Learn/article/Projects/RAG/Delta/About/Magazine/Pen pals. Hosted preview verification and screenshots are recorded in task evidence after deployment.

The browser’s phone screenshot capture can return a scaled image with black padding; responsive geometry and field visibility are checked independently. This is a capture limitation, not a claimed visual screenshot pass.
