# Michelle’s Computer website preview

This change is prepared for review in the existing `lawsonM525/personal-website` repository. It does not replace production, configure a domain, or change DNS.

## Source and hosting

- Base: `main` at `54dfac079b95c4110c1cf89339fb542845c85970`.
- Working branch: `codex/michellescomputer-homepage`.
- Existing Vercel integration verified from the base commit’s successful Vercel status. Its project URL identifies `lawsonm525s-projects/v0-michelle-lawson-portfolio-70lcoktcskr`.
- The separate `lawsonM525/letters-from-michelle` project and live `https://pals.michellelawson.me/` were inspected as the visual and signup reference.
- Existing full-site routes remain available. Only the homepage and the new `/magazine` and `/penpals` pages bypass the old portfolio navigation.

## Signup paths

The main buttons link directly to the existing published Tally forms. Both forms were opened and inspected without entering or submitting responses. Embedded forms rendered blank in the connected browser on both the original site and the local preview, so direct links avoid making signups depend on the widget.

- Magazine: `https://tally.so/r/zxP9JM`. First name and email; separate opt-in for updates while the magazine comes together.
- Pen pals: `https://tally.so/r/68alRY`. Full name and mailing address; interest signup, without a checkout or a guaranteed letter or ongoing replies.
- Tally stores responses. The pen pal form’s existing Google Sheets integration was verified as enabled in the form’s Integrations view. No response rows were downloaded or added.
- No new email automation, confirmation email, integration, credential, paid service, or account permission was created.
- `/magazine` and `/penpals` are optional branded entry pages that point to the same forms. The site itself does not handle or retain signup data and does not manufacture a success state.

## Design and assets

- Sky blue and ivory, navy type, orange accents, retro computer windows, paper, and handwritten details.
- Reused Michelle’s existing magazine and envelope art from the reference repo, converted to compact WebP assets, plus her existing public portrait.
- `public/homepage/wordmark.png` is a complete static graphic rendered locally using Michelle’s installed, purchased Soup du Jour desktop font. The bundled desktop agreement permits static graphics. The font software is not distributed, embedded, converted, or committed.
- Other handwritten text uses the full site’s existing Caveat font. The text wordmark remains provisional until Michelle chooses a logo.
- No prices, launch date, recurring payment, free/paid copy promise, or subscription commitment is stated.

## Review and verification

- Production Next.js build, including TypeScript checks and all existing routes.
- Desktop and mobile browser inspection and screenshots.
- Actual CTA navigation to each published Tally form, without submission.
- `git diff --check`.

Review screenshots are delivered separately in the task’s `evidence` folder. Local preview runs with `npm run build` then `npm run start -- --hostname 127.0.0.1 -p 3100`.

## Domain cutover — separate approval required

Public DNS was read on 2026-10-21. No DNS records were changed.

- Nameservers: `ns09.domaincontrol.com`, `ns10.domaincontrol.com` — preserve.
- Apex A records: `15.197.148.33`, `3.33.130.190`.
- `www` CNAME: `michellescomputer.com`.
- MX: priority 1, `smtp.google.com` — preserve.
- SPF TXT: `v=spf1 include:_spf.google.com ~all` — preserve.
- Google verification TXT is present — preserve.
- Preserve all existing DKIM records. Their selector/value must be checked in GoDaddy before a cutover; no selector was guessed or changed.

After the design is approved, inspect the existing Vercel project’s domain screen and record its exact required apex and `www` targets. Replace only conflicting website A/CNAME records as appropriate. Do not guess the project-specific values, change nameservers, or remove any mail/verification TXT or MX records. If the existing Vercel environment sets `NEXT_PUBLIC_SITE_URL`, align it to `https://michellescomputer.com` during the approved cutover; the source default now uses the new domain.

The CLI’s saved Vercel authentication was invalid. The browser URL policy blocked acquiring the Vercel dashboard, so neither route was used to change hosting or domains. GitHub’s existing Vercel integration is the supported preview path if it builds the branch.
