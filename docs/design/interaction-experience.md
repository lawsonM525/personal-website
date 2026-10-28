# Desktop interaction experience

The existing hero, artwork, cover, fonts, icons and window frames stay in place. This pass improves controls and feedback around the existing content.

- Active taskbar buttons minimize and restore their window. Desktop title bars also maximize on double-click. Close and minimize return keyboard focus to reachable controls.
- Windows reveal from the icon or task that opened them in 180 ms. Moved windows retain their position. Long documents animate only their title bar.
- Explorer programs have a visible Back to Explorer control. Program URLs, browser Back/Forward, and search selection follow the active program. Paint remains mounted when minimized or behind Explorer.
- Buttons visibly press. Slower internal navigation gets delayed feedback and an actionable retry link if unresolved. Connectivity messages use real browser offline/online events.
- The public book preview remembers the physical page and chapter in browser storage after reading begins. The cover offers Continue reading and a separate start-over link. Invalid or unavailable storage never blocks reading. Full-text proof reading is excluded.
- Paint shows preparing feedback while creating its PNG, followed by a receipt showing the actual exported drawing. Keep painting and Explore something else provide two immediate next choices. The message describes a started browser download, rather than claiming a file has been saved to disk.
- Search includes a saved Less motion setting. It skips startup and window reveals and removes CSS motion and smooth scrolling. Device reduced-motion settings take priority. Sound stays optional through the existing controls.
- Nonblank boot lines have a quiet, locally synthesized keyboard tick after audio has been unlocked by a user interaction. Restart uses that existing sound context; tapping the initial boot can unlock it without adding another intro screen. A first untouched page load stays silent under browser autoplay rules. Supported touch devices get 5ms vibration pulses, at least 240ms apart. Sound off and Less motion suppress boot feedback; hiding, skipping, finishing or leaving startup cancels it. No haptics are simulated on devices without the Vibration API, including iPhone Safari and desktop trackpads.

Desktop and phone browser checks covered minimize/restore, title bar maximize, search opening Terminal, browser Back restoring Paint, a real 720×480 PNG export, and resuming Computer Vision at physical page 113. The settled 1280×720 homepage hero bounds match the prior release. At 390×844 the new return control has a 44px target and neither Paint nor the book introduces horizontal overflow. A 667×375 landscape check covered the export receipt.

Future U's internal report flow and the separately developed Minesweeper and Terminal changes are outside this release.
