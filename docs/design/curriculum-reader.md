# Symbolic Systems curriculum reader

The Symbolic Systems article places its smaller existing illustration beside Michelle’s welcome. The eight numbered modules lead the reader as compact native disclosure rows, initially collapsed so the whole course is easy to scan. The story, background and reading list are grouped under “Before you start,” followed by the original progress and guide sections. Nothing is removed from the Sanity body; existing section and reading anchors stay intact.

The desktop index prioritizes the eight modules, then supporting sections and Michelle’s learning log. On phones and tablets, a sticky “Jump to a module” menu follows the reader, displays the current module, and closes after choosing a destination. The index and direct URL fragments open every enclosing disclosure before scrolling, including readings nested under “Before you start.” Expand/collapse controls affect reading sections only, not the mobile menu.

All content stays in Sanity as Portable Text, including links to future recaps. Only this curriculum uses the new layout and the simple magazine link.

`symbolicSystemsProgress` in `lib/curriculum.ts` records Michelle’s completed learning. It is author progress, not a visitor checklist. Match a completed title to its reading entry; optionally add `recapHref` after the recap has been published. The reader adds a green marker without changing the stored text, emphasis or links, and includes the item in Michelle’s learning log. Completing a book does not mark entire modules as completed.

Currently completed: Gödel, Escher, Bach. There is no recap URL yet. The three linked recommendations point to Melanie Mitchell’s official book page, the free Experimentology textbook and MIT’s Open Encyclopedia of Cognitive Science. The first of those is a book information page, not a promise of a free full text.
