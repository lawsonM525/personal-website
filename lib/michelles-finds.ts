import type { LearnArticleCard } from "@/sanity/lib/types"

export const findsPath = "/learn/you-wont-believe-this-was-made-with-ai"

// Add Michelle's picks here after checking the project and its original source.
// Model and process details describe the creator's account of their own work.
export const michellesFinds = [
  {
    id: "random-eyes",
    name: "Random-eyes",
    headline: "An entire human eye, made from code.",
    creator: "Gianluca Lomarco",
    handle: "@__rockbiter",
    projectUrl: "https://random-eyes.vercel.app/",
    sourceUrl: "https://x.com/__rockbiter/status/2114728296034226583",
    processUrl: "https://x.com/__rockbiter/status/2114728309661851962",
    image: "/finds/random-eyes.png",
    imageAlt: "Random-eyes: a detailed golden iris, eyelashes, and skin rendered in an interactive browser experiment",
    tools: [
      { name: "Three.js", url: "https://threejs.org/" },
      { name: "Claude Opus 5.5", url: "https://claude.ai/" },
    ],
    process: "7 days · 161 commits",
    reaction: [
      "The first thing I noticed about this is that it’s naturally beautiful. And I don’t mean in the generic sense, like, ‘Oh, this is a beautiful thing.’ It has so well replicated nature’s way of making beauty in the human body, and here, in the eye.",
      "It reminds me of Leonardo da Vinci’s ability to draw a human or animal body really well after studying it for days and days.",
      "If there were any such thing as AI art, this is what I would call it. I would give this that stamp. It feels like the eye is actually looking at me, with the blinking and the eye movements. It’s just wow.",
      "He says he took 7 days to make it, which, in the world of AI tools, is like 2 to 3 years maybe. LOL. All I can say for this is beautiful.",
    ],
  },
]

export const findsArticle: LearnArticleCard = {
  _id: "local-michelles-finds",
  slug: findsPath.split("/").pop()!,
  title: "You won’t believe this was made with AI",
  dek: "The projects that made me stop scrolling and go ‘whoa.’ A growing collection of Michelle’s favorite AI builds, with links to try them yourself.",
  category: "finds",
  topics: ["AI projects", "Michelle’s favorites", "tweets", "creative coding", "inspiration", ...michellesFinds.flatMap(find => [find.name, find.creator, find.handle, ...find.tools.map(tool => tool.name)])],
  publishedAt: "2026-10-27T00:00:00Z",
  author: { name: "Michelle Lawson" },
  coverImageUrl: michellesFinds[0].image,
  coverImageAlt: michellesFinds[0].imageAlt,
  estimatedWords: 300,
}
