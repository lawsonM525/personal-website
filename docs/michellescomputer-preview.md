# Michelle’s Computer — review preview

Source: `lawsonM525/personal-website`, branch `codex/michellescomputer-homepage`. Existing Vercel project: `lawsonm525s-projects/v0-michelle-lawson-portfolio-70lcoktcskr`. Production, DNS, nameservers and mail records are unchanged.

## Approved design

Michelle’s selected D — Deep Denim Bright Windows (Library `libfile_815b1ecd5c388191873bbbc63aeef446`) supplies the denim desktop, cream panels, blue title bars, serif headings and orange/cyan accents. The original four loved illustrations and confirmed smooth native bitmap cursor remain unchanged. The welcome envelope is blank; no mockup slogans are reused. Asset provenance is in [selected-d-assets.md](selected-d-assets.md).

The homepage retains “Welcome to Michelle’s Computer” and “Turning my ideas, and yours, into reality.” Its four main destinations explain what each click opens. The taskbar contains working controls and a clock. The secondary contact window starts closed and opens from its taskbar button.

## Public pages and exclusions

Public content now uses shared computer windows and navigation. Page content, media, destinations and existing interactions remain in their routes. Resources, the app challenge and updates share reusable catalog components; Learn keeps its reading tools and optional dark theme. Footer links belong within page content rather than the dock.

**Pitch and proposal pages are explicitly excluded:** `/begin`, `/begin/cursor`, `/begin/linkedin-learning`, `/begin/mbamission`, `/begin/openai`, `/begin/OpenAIBeta`, `/openaibeta`. Their source files and original dark root theme are unchanged. The shared layout bypasses these routes, and new theme rules are scoped to public computer surfaces.

Full route coverage and verification limits are in [site-style-coverage.md](site-style-coverage.md).

## Signup destinations and storage

- Magazine: **https://tally.so/r/zxP9JM** — existing first-name/email form. Tally stores responses; its inspected Integrations view had no connected destination.
- Pen pals: **https://tally.so/r/68alRY** — existing name/mailing-address interest form. Its inspected Google Sheets integration points to `https://docs.google.com/spreadsheets/d/16uJQvd-Aic_BPHl5he6MZM9-K8X9hXz1MOtx79Cg27w`.

Primary signup links open only on explicit click. They are nonmodal windows below the persistent top bar and above the dock, with no full-page backdrop. Maximize stays within desktop bounds. Close, minimize, restore and switching preserve mounted forms. `/magazine` and `/penpals` retain direct-entry invitation windows; their forms open after the visitor’s invitation button click.

The intermittent initial blank embed was traced to a stalled iframe startup. Loading now waits for visible committed layout and widget readiness, with a fallback if the widget is blocked. A bounded recovery replaces only a never-ready, untouched iframe; loaded or engaged forms are protected. Trusted matching `Tally.FormLoaded` messages determine readiness. Reload and accessible direct-form links remain above the iframe so they are reachable even if the external form fails.

Verification reads the real published forms and waits for visible fields. No personal data is entered, no submission is made, and downstream persistence/automations are not exercised. The site does not fake a success state. No new confirmation email, checkout, price, launch date, subscription promise, paid service, credentials or account permissions were added.

## Validation and deployment

The production build and type checks pass. Three recovery tests cover bounded retries, preservation of ready/engaged forms, and origin/frame/form validation. All 26 UI routes return HTTP 200 and an unknown route returns 404. All 19 public routes fit a 390px phone viewport without page or shared-content overflow. Proposal routes are checked for absence of the new layout.

Local desktop/mobile checks cover form loading, retained iframe identity across minimize/close/reopen, page-window controls, Posts tabs, resource search and Learn theme controls. Separate task evidence records the hosted preview URL and screenshots. External Tally uptime is not guaranteed; direct-form/reload fallbacks remain available. Final submissions are intentionally untested.

Only a branch preview is deployed. Public replacement and any domain-record changes remain separate work requiring approval. No domain or mail configuration changes are part of this iteration.
