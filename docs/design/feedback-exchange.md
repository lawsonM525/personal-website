# Feedback exchange reference layout

Matches Michelle's supplied reference: a pixel-font blue window title bar, the exact single headline **Good projects need fresh eyes.**, subtitle **Try something new. Help someone make it better.**, pixel eyes, yellow project submission button, live review-credit meter, folder tabs, a two-column set of project windows, and a right-hand closer-look panel. Uses the bundled Windows 93 `sserife` font for window chrome and Georgia bold for the main heading.

On smaller screens the project windows stack. Selecting **Take a look** opens a focused detail view with **Back to projects**, instead of hiding the detail below a long page. Forms, sign-in, credits, moderation, and database permissions keep their existing behavior.

When there are no real public submissions, four explicitly fictional examples demonstrate the layout. They are not inserted into Supabase, have no external project links, and cannot earn credits, receive public replies, be reported, or be featured by a moderator. Once real submissions exist, those replace the example board. Real projects without preview artwork show their actual title, description, and domain rather than an invented screenshot.

The built-in image generation tool produced the transparent eyes and four fictional interface previews. Optimized WebP files live in `public/feedback/`; the full prompt set is in [feedback-image-prompts.json](./feedback-image-prompts.json). The handshake extends the site's original pixel artwork as an SVG. Existing homepage artwork and shared fonts are preserved.

Moderation gives new submissions the benefit of the doubt: they publish immediately. Signed-in members can report projects, reviews, and replies; moderators can remove or restore them afterward. The visual design and review-credit rules are unchanged.
