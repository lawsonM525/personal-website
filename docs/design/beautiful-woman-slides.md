# The Beautiful Woman — AI, ideas & faith

Public route: `/slides/the-beautiful-woman`. Listed on `/talks` and in the sitemap.

The nineteen slides condense Michelle's session outline into possibilities, cautions, and faith/judgment, ending with next week's hands-on preview. Audience names are excluded. The deck does not invent specific tools, installations, dates, or logistics for next week.

Edit content and stable slide IDs in `lib/beautiful-woman-slides.ts`. Individual slides share canonical links such as `/slides/the-beautiful-woman#privacy-and-permissions`. Keep IDs stable when changing wording so shared links continue to work.

The viewer uses the site's existing denim, paper, royal blue, Georgia headlines, Windows 93 `sserife` chrome, retro icons/cursors, and Girly Guide illustrations. No new illustration package, generated portrait, tracking integration, or dependency is added.

Controls include previous/next, an accessible modal index, read-all view, copyable slide links with a manual fallback, and a presentation mode that fills the browser viewport. Arrow keys/Page Up/Page Down navigate; Home/End jump; F enters/exits presentation; Escape exits presentation or closes the index. Reading areas can scroll on unusually short screens while controls stay reachable. Reduced-motion settings disable progress animation; print CSS includes every slide.

Risk slides link directly to primary sources from NIST, the FTC, and the American Psychological Association. Faith language and personal examples are Michelle's supplied perspective. Source copy is summarized, not reproduced as long quotations.

Validation: Node permalink/content checks, a production Next.js build, and browser QA for all nineteen slides at desktop 1280×800, phone 390×844, and presentation 1280×800. Check unique slide IDs after navigation, overflow, controls, index jump/escape, direct-link reload, sharing, and read-all behavior. QA screenshots and structured results are kept in the ignored `output/beautiful-woman-deck/` directory.

The release is prepared in a separate worktree. Analytics source/configuration files must match the main branch; the pending PostHog/Gumroad work is outside this change.
