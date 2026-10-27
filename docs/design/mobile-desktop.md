# Michelle’s Computer on a phone

At 760px and below, apps use one focused window between the header and a bottom dock. The desktop remains a real set of icons. This is an interaction layout, not a scaled screenshot of the desktop.

- Dear Internet opens first. Close removes its running task and reveals its letter icon; minimize keeps its task. Desktop minimizes the welcome window and dismisses the contact window. `/?desktop=1` opens the launcher from other routes, with startup skipped on both server and client. Closing a document, signup, or Explorer window uses that route. Back links still navigate to the parent document. The initial `/` visit and explicit Restart retain the startup sequence.
- Window controls have 44px targets. Phones omit maximize and dragging. Desktop retains both.
- Explorer keeps its filters and window controls visible; the file list scrolls inside the window. Minimized programs remain mounted, including Paint’s canvas and undo history. Paint also keeps an in-memory draft and undo history across client navigation to the desktop and other pages; a full reload starts a new drawing session.
- Paint fits the canvas to the remaining space without changing its 720×480 export. Stickers, colors, paper, and settings open in dismissible trays. Picking a sticker returns to the canvas. Escape closes a tray. Landscape puts tools and trays beside the canvas and hides the global header while an app is focused.
- Articles and the book use normal document scrolling. The window bar and book toolbar remain sticky. The chapter drawer follows the toolbar’s actual position, and chapter anchors account for its measured height. Minimize stores the reading position for restore.
- Magazine and pen pal invitations keep their action above the fold on a 375×667 viewport. Embedded forms retain their own readiness and input protection logic.
- The viewport height follows VisualViewport when available. The dock includes the bottom safe-area inset. Search results shrink to the available height when the keyboard opens.

Local browser checks cover 320×568, 375×667, 390×844, 667×375, 768×1024, and 1280×900. These are responsive browser checks; physical iOS/Android testing remains useful before publishing.
