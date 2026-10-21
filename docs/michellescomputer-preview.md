# Michelle’s Computer — review preview

The review is in `lawsonM525/personal-website`, branch `codex/michellescomputer-homepage`, based on main at `54dfac079b95c4110c1cf89339fb542845c85970`. Production and DNS have not been changed.

## Current design and journey

The revised implementation follows Michelle’s direct feedback: clear navigation from the existing `https://www.michellelawson.me/`, illustrated folder assets generated with ImageGen, and actual HTML/CSS computer windows modeled on `https://pals.michellelawson.me/`. The typo `pauls.michellelawson.me` did not resolve; the working pals reference had already been inspected.

- Main choices: Learn, Resources, Magazine, Pen pals. Each folder names its destination, explains the outcome, and links in one click.
- Primary hero action opens Resources. My story opens the original About page.
- Original copy reused: “Turning my ideas, and yours, into reality.”; “I love building things that inspire and educate.”; “Inspire. Educate. Create.” The learning and magazine descriptions are drawn from the existing site and published form.
- Window chrome is built in CSS: sharp edges, beveled borders, title bars, toolbar, status bars. Welcome can be minimized, maximized/restored, closed, and reopened.
- Search/command menu filters actual pages and the published AI Wardrobe guide. It supports Cmd/Ctrl+K, Escape, Tab, and Enter.
- Folder filters separate learning/building from the two opt-ins without changing their destinations.
- Subtle illustration and entrance motion, hover/pressed feedback, and reduced-motion media support.
- Mobile keeps all four main destinations in a visible quick-navigation row, plus an expandable menu.
- The same navigation header is used across the existing full-site routes. Duplicate page-level navigation was removed. Existing page content and proposal pages remain intact.
- The old Learn newsletter form was a nonfunctional preview. It is replaced with an explicit link to the existing magazine waitlist; it no longer pretends to accept an email address.

The generated initial visual direction is in [design-direction.webp](design-direction.webp). The implemented window chrome deliberately follows the real pals interface rather than the illustrated chrome in that concept.

## Existing signup destinations and storage

- Magazine: **https://tally.so/r/zxP9JM**. First name and email, for magazine updates as it comes together. Tally stores the responses; the form’s Integrations view showed no connected destinations.
- Pen pals: **https://tally.so/r/68alRY**. Full name and mailing address. Its existing Google Sheets integration is connected to `https://docs.google.com/spreadsheets/d/16uJQvd-Aic_BPHl5he6MZM9-K8X9hXz1MOtx79Cg27w`.
- Both exact folders were clicked in the revised website and the destination form and expected fields were verified in the browser. No input was entered and no form was submitted. Submission persistence and downstream automations were not exercised.
- Embedded Tally widgets rendered blank in this browser, including on the original pals site. Direct links avoid making signups depend on that widget.
- The optional `/magazine` and `/penpals` entry pages point to the same forms. This website retains no signup data and generates no success state.
- No new email automation, confirmation email, paid service, credential, account permission, checkout, price, date, or subscription promise was added.

## Assets and type

Built-in ImageGen generated the reference concept, the isolated transparent computer-desk illustration, and the four-icon transparent navigation sprite. They were copied/converted into the repository:

- `public/homepage/computer-desk-v2.webp`
- `public/homepage/navigation-sprite-v2.webp`
- `docs/design-direction.webp`

The full prompt set and source output names are documented in [design-prompts.md](design-prompts.md). The original generated PNGs remain in the task workspace’s `generated_images` folder.

`public/homepage/michelle-lawson-v2.png` is a complete static title graphic rendered locally using Michelle’s installed, purchased Soup du Jour desktop font. Its bundled desktop agreement permits static graphic materials. The font software is not embedded, converted, or distributed. Other handwritten text uses the existing Caveat font.

## Verification

- Next.js production build with TypeScript checking and all existing routes.
- `git diff --check`.
- Desktop visual inspection, window minimize/reopen and maximize/restore, folder filtering, command search and its exact pen-pal result.
- Real navigation from both signup folders to the expected published Tally forms, without submission.
- Phone layout at 390×844 and tablet layout at 768×900: main content and windows fit their viewports. Mobile menu opens/closes, and four primary destinations remain visible above the welcome window.
- Browser screenshots are in the task’s separate `evidence` folder: revised desktop, mobile full page, search, and both blank signup forms.

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
