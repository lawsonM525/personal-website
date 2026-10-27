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
    tools: "Three.js + Claude Opus 5.5",
    process: "7 days · 161 commits",
    reaction: "The lashes. The tiny movements. The light moving through the iris. This is the kind of project that makes me stop scrolling and go: wait, you can build THAT?",
    description: "Random-eyes lets you explore a procedural human eye in your browser. Change the skin tone, zoom in, or generate another eye. Press Space to freeze it in photo mode and get a closer look.",
    takeaway: "Gianluca describes building it with Claude Code and Three.js over seven days, with 161 commits and thousands of lines of shader code. The eye is generated rather than assembled from photos or a premade 3D model. There’s a lot of creative direction and iteration behind that result.",
  },
]

export const findsArticle: LearnArticleCard = {
  _id: "local-michelles-finds",
  slug: findsPath.split("/").pop()!,
  title: "You won’t believe this was made with AI",
  dek: "The projects that made me stop scrolling and go ‘whoa.’ A growing collection of Michelle’s favorite AI builds, with links to try them yourself.",
  category: "finds",
  topics: ["AI projects", "Michelle’s favorites", "tweets", "creative coding", "inspiration", ...michellesFinds.flatMap(find => [find.name, find.creator, find.handle, find.tools])],
  publishedAt: "2026-10-27T00:00:00Z",
  author: { name: "Michelle Lawson" },
  coverImageUrl: michellesFinds[0].image,
  coverImageAlt: michellesFinds[0].imageAlt,
  estimatedWords: 300,
}
