# ImageGen design and asset prompts

All three images were generated with the built-in ImageGen tool. Asset generations referenced the first design image. The source prompt prefix was:

> Generate an image with the following prompt, dont change it(DO NOT CHANGE THIS PROMPT, IT'S ALREADY AN IMPROVED PROMPT) -

## Homepage concept

Use case: ui-mockup. Asset type: high-fidelity desktop homepage design to implement as a responsive website for Michelle Lawson at michellescomputer.com. Aspect ratio: 3:2.

Redesign Michelle’s Computer with a strong, obvious user journey inspired by the original michellelawson.me. Preserve immediate navigation to Learn, My story, Projects, Research, Talks, Posts, Resources, and Reminder, plus a searchable command menu. Prioritize Learn and Resources and make Magazine and Pen pals easy to reach in one click. Include animation and interactivity in the implementation.

One polished desktop homepage screenshot, without a device frame or photography collage. An ivory top menu bar, small text wordmark, visible navigation, and search/command button. Below, a distinctive illustrated blue desktop and large ivory application window. Central copy: “Michelle Lawson” and “Turning my ideas, and yours, into reality.” Primary “Explore resources” button and quieter “My story” link. An expressive hand-drawn friendly retro computer character, floating paper notes, and folders beside the text. Four generous destination tiles: Learn, Resources, Magazine, Pen pals, illustrated with an open notebook, folder of tools, magazine, and stamped envelope. Magazine action “Join the waitlist”; pen pals action “Sign up”. Bottom toolbar: “Inspire. Educate. Create.”

Style: playful computer desktop crossed with a bright handmade magazine, strong hierarchy, readable text, refined spacing, tactile paper, navy ink outlines, subtle grain, cohesive custom illustration. Sky blue, ivory, navy, vivid orange; restrained blush/butter only if needed, avoid excessive yellow. Expressive irregular Soup du Jour-like display lettering, readable body type, small computer monospace labels. No generic SaaS layout, photo scrapbook, fabricated statistics, testimonials, dates, prices, or subscription promises. No tiny low-contrast text, watermarks, or unrelated logos.

Output: `generated_images/exec-9c7e1b21-87b6-45ae-8ebc-8caafc7af51b.png`. Review copy: `docs/design-direction.webp`.

## Computer-desk asset

Use case: illustration-story. Asset type: transparent website hero illustration. Aspect ratio: 3:2. Reference: homepage concept above. Transparent background requested.

Recreate only the friendly retro computer desk scene from the right side of the concept, preserving its cohesive illustration style. A cream CRT with smiling face and hands against its cheeks, leafy plant, orange cup, books, pencils, mouse, loose pages, and taped paper notes with a tiny landscape. Whole composition fully visible with clear margins. Notes use abstract ink lines without words. Hand-inked navy outlines, irregular brushwork, subtle paper grain, ivory, blue, orange, natural dark-green plant. No photorealism, glossy 3D, UI controls, labels, website elements, or unrelated objects. Genuine transparent alpha, no rectangular backdrop, no scenery; small contact shadows allowed. Avoid excessive yellow.

Output: `generated_images/exec-b8429b5d-8f53-4103-89e3-6474236c05b5.png`. Project asset: `public/homepage/computer-desk-v2.webp`.

## Navigation icon sprite

Use case: illustration-story. Asset type: one transparent 2×2 navigation sprite sheet. Aspect ratio: 1:1. Reference: homepage concept above. Transparent background requested.

Four equal square cells with isolated, centered objects and clear transparent margins. Upper-left: open cream notebook, abstract notes, orange bookmark, lightbulb sketch and navy pen. Upper-right: sky-blue folder holding documents, with navy wrench motif. Lower-left: stack of illustrated magazines, blue/orange landscape cover with abstract ink marks instead of a masthead. Lower-right: cream airmail envelope, sky-blue/orange striped edge, orange heart, postage stamp and navy postmark lines. Exact cohesive navy ink outlines, irregular brushwork, paper texture, equal visual weight. Ivory, sky blue, navy and bright orange. Genuine alpha, no cell borders, dividing lines, UI rectangles, words, button labels, watermarks, or connecting shadows. No excessive yellow. All objects fully in frame.

Output: `generated_images/exec-28565ba9-37da-45f1-8cea-792d26c52714.png`. Project asset: `public/homepage/navigation-sprite-v2.webp`.

## Implementation correction

Michelle’s later direction requires actual computer windows like pals.michellelawson.me. Therefore the concept’s illustrated window outlines are not used as interface chrome. The implementation uses real HTML/CSS windows and functional controls. Illustrations are content assets inside that interface; navigation and copy are live text/links.


## Individual Learn and Resources repair

Built-in ImageGen edited the original navigation sheet into individual transparent assets. Packaging to WebP preserves alpha; CSS uses `background-size: contain` with no clipping for these two icons.

- Learn: `public/homepage/learn-icon-v3.webp`; original `generated_images/exec-51d05071-4b42-47e0-811b-38441f423928.png`.
- Resources: `public/homepage/resources-icon-v3.webp`; original `generated_images/exec-4ab12ed2-8a28-4df3-975f-cce2a2b308d2.png`.

### Learn

```text
Generate an image with the following prompt, dont change it(DO NOT CHANGE THIS PROMPT, IT'S ALREADY AN IMPROVED PROMPT) -
Use case: background-extraction
Asset type: individual Learn navigation illustration for Michelle's website.
Input image: edit target, a four-icon illustration sheet.
Request: Extract ONLY the upper-left Learn illustration: the open cream notebook with orange cover, navy handwritten marks, lightbulb, and the COMPLETE blue pen below it. Preserve that exact illustration's drawing, colors, texture, and proportions. Restore any tiny pen edge needed so the whole pen is present.
Background: actual transparency.
Framing: one centered, complete illustration on a square canvas with generous transparent padding on every side. No part of the book, orange accent marks, or pen touches an edge. Keep the whole pen comfortably inside the same Learn icon.
Aspect ratio: 1:1.
Avoid: the blue Resources folder, magazine, envelope, fragments from neighboring icons, labels, text additions, white background, checkerboard background, excessive yellow.
```

### Resources

```text
Generate an image with the following prompt, dont change it(DO NOT CHANGE THIS PROMPT, IT'S ALREADY AN IMPROVED PROMPT) -
Use case: background-extraction
Asset type: individual Resources navigation illustration for Michelle's website.
Input image: edit target, a four-icon illustration sheet.
Request: Extract ONLY the upper-right Resources illustration: the sky blue file folder with a navy wrench, cream documents, blue tab, and orange/navy accent marks. Preserve that exact illustration's drawing, colors, texture, and proportions. Remove all pieces of the Learn notebook and blue pen; the Resources icon contains NO pen.
Background: actual transparency.
Framing: one centered, complete illustration on a square canvas with generous transparent padding on every side. No part of the folder, papers, or accent marks touches an edge.
Aspect ratio: 1:1.
Avoid: any pen, notebook, magazine, envelope, fragments from neighboring icons, labels, text additions, white background, checkerboard background, excessive yellow.
```
