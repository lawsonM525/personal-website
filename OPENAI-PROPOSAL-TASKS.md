# OpenAI Proposal — Working Task List

Last reviewed: July 20, 2026

Use this file as the source of truth for the `/begin/openai` proposal. Add notes directly beneath a task when a decision or asset is still needed.

- ✅ Michelle has reviewed or confirmed the completed task.
- 🟠 Codex completed the task, but Michelle has not checked it yet.
- No emoji means the task is still outstanding.

## Do first — business proposal and timeline

- [x] Lock the offer as a three-year Gen Z product-education program. ✅
  - [x] Change “A 3 year program” to “A three-year program.” ✅
  - [x] Make 100 practical ChatGPT use cases per year a firm deliverable. ✅
  - Negotiation fallback: 50 use cases per year if OpenAI wants a smaller scope.

- [x] Resolve the three-year timeline framing without publishing unnecessary calendar math. ✅
  - Discussion: 2 weeks.
  - Discovery: 3 months.
  - Planning reset after Discovery: 1 week.
  - Delivery: six-month blocks through Year 3, with two-week check-ins between blocks.

- [x] Replace “We’ll begin with a 90-day pilot” with a section titled “How will this work?” ✅
  - Discussion — 2 weeks: lock KPIs, points of contact, deliverables, launch dates, video styles and frequency.
  - Discovery — 3 months: test videos, carousels, stories, formats and use cases to learn what lands with Gen Z.
  - Delivery — six-month cycles: scale what worked, review performance, pivot when needed and integrate new launches.
  - [x] Add uneven chalk timeline marks and chalk-circle bullets. ✅

- [x] Position Discussion and Discovery as the opening phases of the three-year program instead of pitching a standalone pilot. ✅

- [x] Keep operating logistics high-level and finalize the details during Discussion. ✅
  - [x] Use three KPI categories: qualified reach and attention, useful engagement, and intent to try. ✅
  - The public proposal only needs to name these KPI categories.
  - Final targets, deliverable dates, approvals, reporting and review processes will be agreed with OpenAI during Discussion.

- [ ] Add a projections block with conservative, expected and ambitious scenarios.
  - Marketing: projected views, reach, feature discovery and audience access.
  - Product: interest in priority features, use-case demand and recurring confusion.
  - Finance: quarterly and annual program structure. Keep actual pricing out if Patrick is handling it.
  - Legal: three-year contract framing, review periods, approvals and content-usage expectations.
  - Define what “conversion” means before adding a conversion projection.

- [x] Update every piece of the old offer language. 🟠
  - “90-day pilot”
  - “Renewable year-long program”
  - “100 videos”
  - “Want the remaining 88?”
  - Navigator label
  - Email button’s prewritten message
  - Page metadata, if necessary

- [x] Fix visible proposal copy errors. 🟠
  - [x] “3 year” → “three-year” ✅
  - [x] “OpneAI” → “OpenAI” 🟠

## Strengthen the argument

- [ ] Reframe the opening opportunity around the real problem.
  - Every few weeks, OpenAI releases something that blows Michelle’s mind.
  - Most people do not know about the releases or what they can do with them.
  - One or two launch videos cannot teach dozens of relevant use cases.
  - Ongoing education solves that problem.

- [x] Bring three OpenAI/Codex reels into the introduction beneath the partnership statement. 🟠
  - Reuse the existing reel cards at a smaller size while keeping the full OpenAI proof section below.

- [x] Make the introduction portrait stay in place while the proof scrolls beside it. 🟠
  - Keep the normal stacked layout on smaller screens.

- [x] Type the five Why Educate questions onto the page as the section enters view. 🟠
  - Play the sequence once and respect reduced-motion preferences.

- [x] Turn “I want to help change that” into an interactive link. 🟠
  - Hover text: “Here’s how.”
  - Click action: scroll to the proposal.

- [ ] Add a tooltip to “Gen Z will understand, try, and come to love.”
  - Tooltip: “I have no doubt they’ll come to love it, the way I love your tools.”

- [ ] Add a small proposal tooltip showing current product awareness.
  - Explain that Codex, Work and the broader product experience now live within ChatGPT.

- [ ] Complete the teaching and memory argument.
  - Keep the existing line about connecting new concepts to familiar ideas.
  - Add Michelle’s years of tutoring before teaching online.
  - Find and cite one credible source about prior knowledge helping people understand and remember new information.

## Why Michelle?

- [x] Make the Codex pet turn around and walk back after reaching the right edge. 🟠

- [x] Turn the four Why Michelle proofs into a sticky numbered scrollytelling sequence. 🟠
  - Keep the “Why Michelle?” title, Codex pet, and labeled 1–4 markers fixed on the left.
  - Let the proof chapters move naturally down the page, softly fading and sharpening as each one enters and exits.
  - Release the fixed story panel after point four, before the chalkboard transition.

- [x] Replace point four’s number with a yellow chalk light-bulb bonus marker. 🟠
  - Keep it to one simple proximity advantage: Michelle is five minutes from OpenAI’s Mission Bay office and can come in to chat, record, and attend events.

- [x] Rewrite the Gen Z engagement copy in Michelle’s voice. 🟠
  - “My audience loves the variety in my content, whether it’s my challenge videos, inspiring stories, or tech news.”
  - “Because I speak fluent Gen Z, I keep them captivated with memes, jokes, and nostalgic references.”
  - “Basically, we’re always joking together while we learn.”

- [ ] Compare the 11% engagement rate with a properly sourced industry benchmark.
  - Clearly state if the approximately 2% benchmark is for non-AI creators.

- [ ] Add “thanks to our partnership” as a small chalk annotation near the OpenAI performance proof.

- [ ] Rewrite point four, “I can sustain the program.”
  - Start with an impactful sentence.
  - Demonstrate publishing consistency and quick launch response.
  - Explain what that reliability gives OpenAI.
  - Keep the Mission Bay detail as the memorable bonus.

- [x] Add the photo with Jason and Romaine at the OpenAI office to point four. 🟠

- [x] Move the chalkboard-walking image below the complete Why Michelle proof. 🟠

- [ ] Convert the chalkboard-walking image into a slightly translucent scrollytelling transition.
  - Film or source a short locked-camera walking clip.
  - Tie the walking motion to scroll progress.
  - Use the current photograph as the fallback image.

## Metrics, videos and visual proof

- [x] Rename the use-case section. 🟠
  - Final: “100 ChatGPT Use Cases I Could Teach in the Next Year.”

- [x] Add a chalk graphic to the use-case section. 🟠
  - “?? new feature?” → “I’m great at coming up with practical use cases for new features.”

- [ ] Add three Michelle-style sample thumbnails to the use-case section.

- [x] Generate poster images automatically from `0:00` of every MP4. 🟠
  - There are nine MP4 video cards and one static ChatGPT Futures card.
  - Extracted the first decodable frame from every MP4 as a lightweight JPEG.
  - Exception: “Does Vibe Coding Really Work?” uses the frame at `0:00.5`.
  - Added each image to the existing `posterSrc` field.
  - Kept `preload="metadata"`; the poster supplies the visible frame before playback.
  - Regenerate all posters after replacing a video with `npm run posters:openai`.

- [x] Simplify video cards to clean thumbnails with hover-to-play controls. 🟠
  - Keep titles and metrics hidden until hover; keep native controls hidden until playback begins.
  - Use a hand-drawn white chalk play button on hover.
  - Keep a small Instagram link and center the OpenAI reel row.
  - Optimize MP4s for streaming and reduce the OpenClaw reel from 9.7 MB to 3.7 MB.

- [x] Restore audio for the eight older MP4 files. 🟠
  - Recovered the audio-enabled originals from Git commit `f29b9f2`.
  - Recompressed them with AAC audio preserved and fast-start streaming enabled.
  - Verified that all nine reels contain audible audio signals.

- [ ] Standardize the Codex comment screenshots.
  - Remove the profile picture and heart from “I didn’t know Codex had automations.”
  - Keep all three Codex comments in the same visual format.

## Branding and personality

- [ ] Remove the top-left logo from the OpenAI proposal page.

- [ ] Choose and introduce one secondary color.
  - Current recommendation: pink.
  - Keep major headers bold white.
  - Use the accent selectively for problem/solution statements, tooltips, timeline highlights and key numbers.

- [ ] Decide which Codex pet belongs on the page.
  - Default Codex pet: immediately recognizable to OpenAI.
  - Michelle pet: more personal and distinctive.
  - Add hover text: “Say hi to my Codex pet.”
  - Keep the pet secondary to repeated images of Michelle.

- [ ] Plan and complete a separate business photoshoot.
  - Clear close-up portrait
  - Coding at a desk
  - Working in an office
  - Teaching at a chalkboard
  - Conversational meeting shots
  - Horizontal compositions with room for copy
  - Vertical shots for video thumbnails

## Already completed or partially completed

- [x] Add “That’s where I come in.” ✅
- [x] Add the dedicated-educator language. ✅
- [x] Remove “simple” from the “relevant lessons” promise. ✅
- [x] Change the philosophy line to “The philosophy that led me here is simple.” ✅
- [x] Add the first sentence about connecting new concepts to familiar ideas. ✅
- [x] Introduce the three-year headline. ✅
- [x] Turn “What this gives you” into four chalk-framed benefit cards. ✅
- [x] Add the section navigator and connect “The Proposal” to the correct anchor. ✅

## Decisions and inputs needed from Michelle

- [x] Confirm the correct timeline structure and keep the public explanation high-level. ✅
- [x] Confirm that “100 use cases per year” is a firm deliverable. ✅
- [x] Leave pricing and budget-allocation language to Patrick. ✅
- [x] Do not include conversion or product-adoption KPIs until OpenAI confirms what can be tracked. ✅
- [ ] Choose pink or sky blue as the secondary color.
- [ ] Supply the Jason and Romaine photo.
- [ ] Supply the walking video after it is filmed.
- [ ] Choose the default Codex pet or Michelle’s custom pet.

## Working order

1. Three-year offer and timeline
2. Logistics and projections
3. Remove all outdated pilot/year-long/100-video language
4. Opening argument and OpenAI proof
5. Why Michelle copy and supporting evidence
6. Video posters, sample thumbnails and use-case graphic
7. Branding, tooltips, pet and photoshoot polish
