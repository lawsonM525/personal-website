# Michelle’s Computer — review preview

The review is in `lawsonM525/personal-website`, branch `codex/michellescomputer-homepage`, based on main at `54dfac079b95c4110c1cf89339fb542845c85970`. Production and DNS have not been changed.

## Current design and journey

The current review implements Michelle’s selected **D — Deep Denim Bright Windows** (Library `libfile_815b1ecd5c388191873bbbc63aeef446`), inspected visually before implementation. Her later clarification keeps D’s **blue** main title bar. The earlier circular portrait and sky-blue hero are superseded.

- Deep denim desktop, slim cream navigation, sharp cream computer windows, royal-blue welcome title bar, cyan Keep in touch window, large system-serif welcome heading, and a new tactile envelope illustration derived from D. Asset prompts and provenance are in [selected-d-assets.md](selected-d-assets.md).
- Exact existing Learn notebook/blue pen, Resources wrench folder, coastal Magazine stack, and Pen pals heart-envelope illustrations are retained. The four destinations sit in the desktop rail and across the top on phones. Labels explain each action. Icons enlarge on hover/focus with no border or background; keyboard focus underlines the label.
- The welcome heading reads “Welcome to Michelle’s Computer.” Original copy remains: “Turning my ideas, and yours, into reality.” The primary action opens Learn; My story opens the original About page. Real links retain the full existing site: Resources, Projects, Research, Talks, Posts, and the published learning guide.
- The smaller window contains real magazine and pen-pal signup links, rather than a pretend email composer. Clicking or keyboard-focusing a window brings it forward. Welcome minimizes, maximizes/restores, closes, and reopens from the taskbar. Keep in touch minimizes/closes and reopens from its taskbar button. The taskbar contains window controls, search, and the actual clock, with no footer slogan.
- Magazine and Pen pals retain their in-page computer-window flow, real existing Tally destinations, direct-entry routes, close/minimize/maximize controls, and reload fallback. No signup data is collected by the website itself.
- Search filters actual site pages and supports Cmd/Ctrl+K, Escape, Tab, and Enter. Mobile keeps the four main destinations visible and provides an expanded navigation menu. Reduced-motion preferences disable entrance and hover animation.
- The confirmed smooth native retro cursor fix is retained: preloaded PNGs with one silhouette and shared (3,2) hotspot; no JavaScript cursor follower. Text fields retain a native text cursor.
- System Times/Georgia provide the selected serif direction. No new webfont license is assumed or embedded. Existing full-site content and proposal routes remain intact.

## Artwork and copy audit

The D reference is visual direction, not approved brand copy. The envelope asset was edited to remove every word, slogan, handwritten line, underline, and stamp numeral. Its paper, outline, blue botanical stamp, orange airmail label and composition remain. Its alt text now describes the blank artwork. The small window heading is the functional “Magazine & pen pals.”

The exact existing Learn, Resources, Magazine and Pen pals icons were visually inspected at full resolution. They contain notebook squiggles, document lines, an abstract magazine masthead and envelope marks, but no readable feel-good slogans; they remain unchanged. The magazine banner contains only the brand and “the magazine.” No “good days” wording was found in the current shipped homepage illustrations or copy. Historical mockup text is not reused as a mission statement. The original verified “Turning my ideas, and yours, into reality.” remains.

Both forms loaded on first open in the hosted D desktop preview. The hosted phone pen-pal form initially displayed a blank iframe; Reload restored all fields in the same362px window. No data was entered or submitted.

## Existing signup destinations and storage

- Magazine: **https://tally.so/r/zxP9JM**. First name and email, for magazine updates as it comes together. Tally stores the responses; the form’s Integrations view showed no connected destinations.
- Pen pals: **https://tally.so/r/68alRY**. Full name and mailing address. Its existing Google Sheets integration is connected to `https://docs.google.com/spreadsheets/d/16uJQvd-Aic_BPHl5he6MZM9-K8X9hXz1MOtx79Cg27w`.
- Every primary Magazine and Pen pals link opens its signup window inside the current page. The anchors retain `/magazine` and `/penpals` as accessible direct-entry routes, which use the original pals invitation → in-window form pattern. Each window embeds its verified existing form using Tally’s standard iframe embed and dynamic-height widget. The iframe loads immediately rather than waiting for the widget’s lazy-loading path, so the form itself does not depend on that script. A secondary direct-form link remains as a fallback.
- The reference pals embed was rechecked and now loads correctly in the browser. Earlier blank-embed observations are superseded for that reference. Automatic iframe loading on page navigation was inconsistent in this browser. The final flow mounts the form when the visitor explicitly opens the window, matching the working pals interaction. Direct-entry pages mount the form after their invitation button is clicked. A reload-in-place control and secondary direct-form link are available. Current verification is recorded separately in the task evidence.
- The published forms and their expected fields were verified without submission. No input was entered and no form was submitted. Submission persistence and downstream automations were not exercised. This website retains no signup data and generates no success state.
- No new email automation, confirmation email, paid service, credential, account permission, checkout, price, date, or subscription promise was added.

## Assets and type

Built-in ImageGen generated the reference concept, the isolated transparent computer-desk illustration, and the four-icon transparent navigation sprite. They were copied/converted into the repository:

- `public/homepage/computer-desk-v2.webp`
- `public/homepage/navigation-sprite-v2.webp`
- `docs/design-direction.webp`

The full prompt set and source output names are documented in [design-prompts.md](design-prompts.md). The original generated PNGs remain in the task workspace’s `generated_images` folder.

`public/homepage/welcome-title-v3.png` is the current complete static title graphic rendered locally using Michelle’s installed, purchased Soup du Jour desktop font. Its bundled desktop agreement permits static graphic materials. The font software is not embedded, converted, or distributed. Other handwritten text uses the existing Caveat font. The previous title and computer illustration remain as unused design assets.

The profile photo is an unchanged copy of the existing `assets/michelle-pink.jpeg`, displayed circularly with CSS. ImageGen extracted individual Learn and Resources illustrations into `public/homepage/learn-icon-v3.webp` and `public/homepage/resources-icon-v3.webp`; the generated PNG originals are preserved in the task workspace. The exact repair prompts are in [design-prompts.md](design-prompts.md).

## Verification

- Final selected-D production build and TypeScript checks pass for all 39 routes; `git diff --check` passes.
- Desktop at 1306×866 and phone at 390×844 were visually inspected. The phone page has no horizontal overflow, all four icon destinations are visible above Welcome, and the smaller signup-choice window follows the hero in the phone reading order. The earlier circular portrait is absent.
- Welcome maximizes/restores, both signup choices open in dialogs while the current page URL stays unchanged, and switching retains both existing Tally iframes. The final local production build rendered both real forms and their expected fields on first open. No data was entered and neither final submission action was activated.
- An intermittent initially blank Tally embed was reproduced in prior hosted desktop and phone checks. The explicit in-window Reload restored the fields. The successful latest local loads do not prove this intermittent issue is eliminated; keep it under review before production replacement.
- The confirmed smooth cursor implementation and existing four illustration files are unchanged. Icon anchors retain transparent backgrounds and zero-width borders; their artwork enlarges, and keyboard focus underlines their label.
- Search, real navigation, taskbar reopen behavior, the cyan window’s foreground behavior, final hosted desktop/mobile screenshots, and hosted form loading are recorded in the task’s separate `evidence` folder.
- The existing `/talks` route retains its original “Under Construction” content; no speaking history was invented.

Local run: `npm run build`, then `npm run start -- --hostname 127.0.0.1 -p 3100`.

## Hosting and domain

GitHub’s existing Vercel integration is used for branch previews. The verified project is `lawsonm525s-projects/v0-michelle-lawson-portfolio-70lcoktcskr`. No migration or replacement service was created. The CLI’s saved Vercel authentication is invalid, and a browser URL policy blocked acquiring the Vercel dashboard; neither path was used to change hosting or domains. Preview URLs can be verified from GitHub’s deployment status records.

Public DNS read on 2026-10-21, unchanged:

| Record | Current value | Cutover handling |
| --- | --- | --- |
| NS | ns09.domaincontrol.com; ns10.domaincontrol.com | Preserve |
| Apex A | 15.197.148.33; 3.33.130.190 | Change only after design/cutover approval, using Vercel’s exact required targets |
| www CNAME | michellescomputer.com | Change only if required by Vercel’s project domain screen |
| MX | Priority 1, smtp.google.com | Preserve |
| SPF TXT | v=spf1 include:_spf.google.com ~all | Preserve |
| Google verification TXT | Present | Preserve |
| DKIM | Preserve every existing selector/value; no selector was guessed | Inspect before any approved cutover; never delete |

The exact Vercel project-specific apex and www targets must be obtained from its domain screen during the approved cutover. Do not guess them, change nameservers, or remove mail/verification records. If the Vercel environment sets `NEXT_PUBLIC_SITE_URL`, align it to `https://michellescomputer.com` during that approved cutover; the source default now uses the new domain.
