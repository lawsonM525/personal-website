import type { Metadata } from "next"

const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://michellelawson.me"

export const siteConfig = {
  name: "Michelle Lawson",
  url: DEFAULT_SITE_URL,
  description:
    "AI educator and computer science student at Smith College. Founder of Computer Science Girlies. Projects, research, talks, resources, and posts for Gen Z learning AI and CS.",
  ogImage: "/placeholder.jpg",
  keywords: [
    // Branded
    "Michelle Lawson",
    "Michelle Lawson computer science",
    "Michelle Lawson AI",
    "Michelle Lawson Smith College",
    "Michelle Lawson projects",
    "Michelle Lawson research",
    "Michelle Lawson AI educator",
    "Michelle Lawson finance tech",
    "Michelle Lawson blog",
    "Michelle Lawson portfolio",
    "Michelle Lawson website",
    "Michelle Lawson Future U",
    "Michelle Lawson Computer Science Girlies",
    "Michelle Lawson content creator",
    "Michelle Lawson AI projects",

    // Community/Handle
    "michellescomputer",
    "@michellescomputer",
    "michellescomputer Instagram",
    "michellescomputer TikTok",
    "michellescomputer Discord",
    "michellescomputer community",
    "michellescomputer tutorials",
    "michellescomputer resources",
    "michellescomputer projects",
    "michellescomputer AI",
    "michellexcomputer",
    "@michellexcomputer",

    // AI & Gen Z
    "AI educator",
    "AI for Gen Z",
    "Gen Z and AI",
    "AI education platform",
    "AI tools for students",
    "Gen Z career tools",
    "AI for young people",
    "AI career guidance",
    "AI coding tutorials",
    "AI learning projects",
    "AI for beginners",
    "AI study tools",
    "AI coding educator",
    "machine learning for Gen Z",
    "AI resources for students",

    // CS Education
    "computer science girlies",
    "women in computer science",
    "CS education resources",
    "beginner coding tutorials",
    "intro to algorithms",
    "data structures for beginners",
    "coding resources for students",
    "Python tutorials for Gen Z",
    "R programming tutorials",
    "machine learning resources",
    "beginner-friendly coding guides",
    "computer science mentor",
    "computer science inspiration",
    "how to get into computer science",
    "computer science study tips",
    "college CS projects",
    "coding education platform",
    "computational thinking resources",
    "learn computer science online",
    "coding projects for beginners",

    // Projects/Portfolio
    "AI projects portfolio",
    "coding portfolio examples",
    "student research projects",
    "undergraduate research in CS",
    "machine learning projects",
    "database project ideas",
    "search engine project",
    "compiler project",
    "AI agent project",
    "neural network project",
    "stock pitch competition project",
    "educational content projects",
    "portfolio for computer science student",
    "GitHub projects showcase",
    "CS hackathon projects",
    "building AI from scratch",
    "coding side projects",
    "AI product management projects",
    "finance + CS projects",
    "personal CS portfolio site",

    // Career & Future U
    "career planning app",
    "Future U app",
    "Future U career quiz",
    "Future U goal tracking",
    "life planning for students",
    "Gen Z career roadmap",
    "how to plan your career in college",
    "dream life planning tool",
    "glow up tracker app",
    "accountability system for students",

    // Thought leadership / inspiration
    "women in tech educator",
    "inspiring Gen Z coders",
    "student entrepreneur AI",
    "building with AI as a student",
    "how to succeed in computer science",
    "motivational computer science educator",
    "confidence in coding",
    "how to get into AI",
    "CS + finance future careers",
    "empowering Gen Z through AI",
  ],
}

export function absoluteUrl(path = "/"): string {
  try {
    return new URL(path, siteConfig.url).toString()
  } catch {
    return `${siteConfig.url}${path}`
  }
}

export function buildPageMetadata(params: {
  title: string
  description: string
  path: string
  keywords?: string[]
  images?: string[]
}): Metadata {
  const images = params.images && params.images.length > 0 ? params.images : [siteConfig.ogImage]
  const keywords = Array.from(new Set([...(params.keywords || []), ...siteConfig.keywords]))

  return {
    title: params.title,
    description: params.description,
    keywords,
    alternates: {
      canonical: params.path,
    },
    openGraph: {
      type: "website",
      url: absoluteUrl(params.path),
      title: params.title,
      description: params.description,
      siteName: siteConfig.name,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: params.title,
      description: params.description,
      images,
      creator: "@michellextech",
    },
  }
}
