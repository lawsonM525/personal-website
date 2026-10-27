# Girly Guide to AI reader

## Source and edition

Source: Michelle's local `The Girly Guide to Artificial Intelligence - FULL BOOK.pdf` (267 pages, authored in Canva, first edition 2024). The source PDF is unchanged. The existing preview ZIP ends at section 1.3, so the readable web sample stops after PDF page 24.

The extracted reading body contains 40,815 words, all 12 chapters, the introduction, and glossary. Title pages, the original table of contents and part-divider pages are represented by the page cover, metadata and navigation. Printed page-number footers are removed. The cover is now the intact original PDF cover page, including its original lettering and artwork, rendered at 1600px high. There is no recreated web-title treatment. The reading body reflows for desktop and mobile, with the original illustrations interleaved at their source-page locations. The complete PDF remains available through the existing Gumroad listing.

## Original artwork

`data/books/girly-guide-ai.art.json` maps original figures to page and text-block positions. The extraction restores PDF soft masks, handles Canva's reflected image transforms, and groups overlapping image objects into their original compositions. Empty paper and speech-box backgrounds are excluded as standalone illustrations. The artwork retains its original colors and text. It is not regenerated.

The reader includes 247 source image placements, arranged as 230 figures across 178 pages, covering all twelve chapters. The assets are local WebP files, loaded lazily, with descriptive alternatives and links to their full-size versions. The initial cover loads eagerly. Figure placement follows matching text positions where available, with a proportional source-page fallback.

Michelle also supplied [the Canva v2 working copy](https://www.canva.com/design/DAHSij-emRg/hF3mj5PPu4EzEWN5unDeyw/edit). Canva metadata reports 127 pages; it is separate from the complete 267-page PDF edition used here. Design metadata and page previews were accessible through the connected Canva tools. Browser export required a Canva sign-in and was not performed. No Canva design was edited.

To rebuild the artwork after the private text source exists:

```sh
mkdir -p tmp/guide/art
pdfimages -png '/Users/michelle/Documents/The Girly Guide to Artificial Intelligence - FULL BOOK.pdf' tmp/guide/art/image
pdftohtml -q -xml -hidden -noroundcoord '/Users/michelle/Documents/The Girly Guide to Artificial Intelligence - FULL BOOK.pdf' tmp/guide/art/book.xml
pdftotext -bbox-layout -enc UTF-8 '/Users/michelle/Documents/The Girly Guide to Artificial Intelligence - FULL BOOK.pdf' tmp/guide/art/text.html
python3 scripts/extract-ai-guide-art.py
```

The separate original cover render uses `pdftoppm -f 1 -l 1 -singlefile -scale-to 1600`, followed by WebP encoding at quality 96.

## Public preview

Route: `/girly-guide-to-ai`. It is linked from Learn, Explorer and page search, and included in the sitemap.

`data/books/girly-guide-ai.preview.json` is the only book body imported for the public page. The preparation script applies a seeded character-level, order-two Markov generator to selected words, preserving punctuation, capitalization and word length. Replacement increases from 24% at PDF page 25 to 98% at the end. A locked paragraph cannot retain a run of more than seven original words. Headings remain readable for navigation. The result is stable across visits.

The model and clean later-chapter text are not sent to the public reader. This is a visual reading preview, not encryption. Original clear copy is retained locally in `_private/girly-guide-ai.full.json`, which is ignored by Git and never placed in `public/`.

The full local author proof is available at `/girly-guide-to-ai?preview=full` only when `NODE_ENV=development` and the ignored source exists. Production and test environments always ignore this parameter. The private source URL returns 404.

## Distribution and remaining buyer access

The existing product is [The Girly Guide to Artificial Intelligence](https://michellexcomputer.gumroad.com/l/girly-guide-to-ai), currently offered at $0+ / name your price when inspected. Full-copy CTAs use that product. The existing buyer recovery destination is [Gumroad's download lookup](https://gumroad.com/license-key-lookup), taken directly from the product listing.

There is no purchaser-only in-browser unlock yet. Whether buyers receive license keys is an unanswered configuration question; do not replace this with a client-side unlocked flag or expose the original text in page data. A production full web reader will need verified entitlements and a protected source deployment path. Existing Gumroad download delivery remains available.

## Rebuild locally

```sh
mkdir -p tmp/guide
pdftotext -layout '/Users/michelle/Documents/The Girly Guide to Artificial Intelligence - FULL BOOK.pdf' tmp/guide/full-book.txt
pdftohtml -q -xml -hidden -i -noroundcoord '/Users/michelle/Documents/The Girly Guide to Artificial Intelligence - FULL BOOK.pdf' tmp/guide/book.xml
python3 scripts/extract-ai-guide.py
node --experimental-strip-types scripts/prepare-ai-guide.mjs
node --experimental-strip-types --test tests/ai-guide-preview.test.mjs
```

Poppler's `pdftotext` extracts the body correctly. Its `pdftohtml` body-font output is incomplete, so the XML is used only for detecting display headings.

## Validation

- All seven reader/Markov/artwork tests pass, including stable output, increasing replacement, free-opening fidelity, production proof denial, and complete chapter coverage.
- 1,033 locked body blocks of 30 or more characters were checked; none remained unchanged.
- Public and local-full HTTP responses return 200. A unique original later-chapter prose probe is absent from the public response and present in the local full proof.
- Direct access to `/_private/girly-guide-ai.full.json` returns 404.
- Desktop and narrow layouts, chapter links, reading progress, and text-size controls were checked in the browser.

Reference: [readmake's progressively obfuscated reading preview](https://readmake.com/#5-2). No source content or code from that book is included.
