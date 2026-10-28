# Feedback exchange reference layout

Matches Michelle's supplied reference: a pixel-font blue window title bar, the exact single headline **Good projects need fresh eyes.**, subtitle **Make your ideas real. Get feedback & Help someone make their project better.**, pixel eyes, yellow project submission button, live review-credit meter, folder tabs, a two-column gallery with colorful project title bars, and a right-hand closer-look panel. Only the main page window has minimize/maximize/close controls; thumbnails and the closer-look pane have no imitation controls. Uses the bundled Windows 93 `sserife` font for window chrome and Georgia bold for the main heading.

On smaller screens the project windows stack. Selecting an entire project card (also with Enter or Space) opens a focused detail view with **Back to projects**, instead of hiding the detail below a long page. Forms, sign-in, credits, moderation, and database permissions keep their existing behavior.

When there are no real public submissions, four explicitly fictional examples demonstrate the layout. They are not inserted into Supabase, have no external project links, and cannot earn credits, receive public replies, be reported, or be featured by a moderator. Once real submissions exist, those replace the example board. Each card shows its title once in the colored bar, its description below the preview, and a small arrow. Real projects without preview artwork use a folder/category preview with the actual domain rather than an invented screenshot. The repeated Focus line and separate Take a look buttons are removed.

The built-in image generation tool produced the transparent eyes and four fictional interface previews. Optimized WebP files live in `public/feedback/`; the full prompt set is in [feedback-image-prompts.json](./feedback-image-prompts.json). The handshake extends the site's original pixel artwork as an SVG. Existing homepage artwork and shared fonts are preserved.

Moderation gives new submissions the benefit of the doubt: they publish immediately. Signed-in members can report projects, reviews, and replies; moderators can remove or restore them afterward. The visual design and review-credit rules are unchanged.

The filters use slimmer borders and shallow shadows, with strong blue reserved for the selected filter. Cards have wider gaps and more padding. The closer-look pane contains the maker’s task as a personal note, the requested focus as an unboxed paragraph, one Try it & leave feedback button, and a quiet credit note. The duplicated image and Focus/Your task table are removed from that pane. Mobile selection preserves the focused view and returns keyboard focus to the selected card when going back.

The large yellow **Submit your project** button remains the prominent primary action at the top, including on mobile. The hero artwork, headline, and subtitle are preserved.
