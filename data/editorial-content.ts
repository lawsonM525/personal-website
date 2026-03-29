import type { StaticImageData } from "next/image"
import tenThousandHoursImg from "@/assets/ten-thousand-hours.png"

export type FeaturedItem = {
  title: string
  summary: string
  href: string
  label: string
  artTitle?: string
  artCredit?: string
  imageSrc?: string | StaticImageData
}

export type NetworkItem = {
  name: string
  link: string
  type: string
  whyItMatters: string
  tags: string[]
  noteOnInteraction?: string
}

export type TopicHub = {
  title: string
  intro: string
  links: Array<{ label: string; href: string; note: string }>
}

export type WritingTrack = {
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
}

export const heroArtwork = {
  src: "/neo.webp",
  title: "neo",
  credit: "",
}

export const missionStatement =
  "you can do absolutely anything that you can imagine... and i'm here to give you the resources to do so."

export const featureWork: FeaturedItem[] = [
  {
    title: "Scholarly",
    summary:
      "CTO + co-founder. Building an AI-native college admissions platform because too much of this process still depends on private access, hidden playbooks, and proximity to the right adults. the product keeps expanding across applications, curriculum, and more personalized student support.",
    href: "/projects/scholarly",
    label: "CTO + co-founder",
    imageSrc: "/scholarly-home.png",
    artTitle: "Scholarly",
  },
  {
    title: "Future You",
    summary:
      "An AI-powered career planning product built around assessments, AI insights, report generation, and five-year roadmaps for people who do not need more vague motivation. they need a clearer model of themselves, a better map, and next steps they can actually use.",
    href: "https://future-u.app/",
    label: "Founder + product",
    imageSrc: "/future-u-cover.png",
    artTitle: "Future You",
  },
  {
    title: "10,000 Hours",
    summary:
      "A 24-hour time tracking and reflection product with logging, notes, analytics, and mastery pacing. it starts from a simple belief: most people do not need more productivity theater, they need a more honest relationship with where their time goes.",
    href: "https://github.com/lawsonM525/tenthousandhours",
    label: "Product in progress",
    imageSrc: tenThousandHoursImg,
    artTitle: "10,000 Hours",
  },
]

export const topicHubs: TopicHub[] = [
  {
    title: "AI alignment",
    intro: "Notes, links, and explainers for when we want to think seriously about how AI systems should behave... not just how fast we can ship them.",
    links: [
      { label: "Starter readings", href: "/resources", note: "A first-pass reading trail for newcomers." },
      { label: "Interpretation notes", href: "/resources", note: "Where personal commentary will live." },
    ],
  },
  {
    title: "AI engineering",
    intro: "Practical notes on building AI systems for real... tools, workflows, product decisions, and the stuff that actually matters once we leave demo land.",
    links: [
      { label: "Tool stack", href: "/resources", note: "Editors, model hubs, and workflow references." },
      { label: "Implementation examples", href: "/projects", note: "Projects that show the practice, not just the theory." },
    ],
  },
  {
    title: "Jobs + internships",
    intro: "Advice, links, and actual tactics for getting into the rooms that can change your next chapter.",
    links: [
      { label: "Opportunity map", href: "/resources", note: "A practical list of where to start looking." },
      { label: "Community context", href: "/community", note: "People, labs, and networks worth knowing." },
    ],
  },
  {
    title: "Getting into college",
    intro: "The real stuff — not the generic advice you've already heard. Application strategy, essays, positioning, and what actually moves the needle.",
    links: [
      { label: "Application strategy", href: "/resources", note: "How to approach the process with intention." },
      { label: "Scholarly", href: "/projects/scholarly", note: "The platform built to make this easier." },
    ],
  },
  {
    title: "The 15",
    intro: "15 resources, tools, and concepts i'd tell every curious person to get into. the shortlist. no fluff.",
    links: [
      { label: "View the list", href: "/resources", note: "Coming soon — the full curated 15." },
    ],
  },
  {
    title: "Coding",
    intro: "Where to start, what to build, how to get better. resources for people who want to actually learn to code — not just watch tutorials forever.",
    links: [
      { label: "Learning paths", href: "/resources", note: "Structured starting points for real beginners." },
      { label: "Projects to try", href: "/projects", note: "Build something you care about from day one." },
    ],
  },
]

export const writingTracks: WritingTrack[] = [
  {
    title: "今天怎么样？",
    description: "我在学中文，所以我每天用中文写日记。来看看一下，有很多意思。而且如果你有feedback，请发给我发短信帮我学习 🥹",
    imageSrc: "/jintian-cover.jpeg",
    imageAlt: "Blue girl painting — quiet, still, looking inward",
  },
  {
    title: "Learning Live",
    description: "Exploratory theory with my own twist — AI alignment, where the world is going, what i'm actually getting from college. less diary, more thinking out loud.",
    imageSrc: "/break-the-cycle-today-or-the-loop-repeats.jpeg",
    imageAlt: "Break the cycle",
  },
  {
    title: "Poems",
    description: "Poems live here too because i am not putting the soft stuff in a separate hidden corner.",
    imageSrc: "/muchness.jpeg",
    imageAlt: "Muchness",
  },
  {
    title: "A few of my favorite things",
    description: "AI tools i love, music i can't stop playing, things i find beautiful, stuff that just makes life better. an ongoing list.",
    imageSrc: "/create-create-creat.jpeg",
    imageAlt: "Create create create — the soul's medicine",
  },
]

export const networkItems: NetworkItem[] = [
  {
    name: "Audrey Chen",
    link: "https://www.audreychen.xyz",
    type: "creator site",
    whyItMatters: "Her site has taste. It feels authored, intentional, and like someone actually cared about the internet being interesting again.",
    tags: ["creator", "portfolio", "internet neighbor"],
  },
  {
    name: "Molly Liu",
    link: "https://mollyliu.dev",
    type: "terminal portfolio",
    whyItMatters: "The interaction is the point. You do not just look at the portfolio... the terminal becomes part of the story.",
    tags: ["builder", "portfolio", "interaction"],
    noteOnInteraction: "yes, this is the cool terminal / ssh one 👀",
  },
  {
    name: "Katz GPT Lab",
    link: "https://katzgpt.com",
    type: "lab",
    whyItMatters: "If you're serious about building, experimenting, and being around sharp people... this is worth looking at.",
    tags: ["lab", "community", "opportunity"],
  },
]

export const aboutHighlights = [
  "cto + co-founder at scholarly... building tools that help students move smarter.",
  "mongodb forward deployed ai product management intern... translating messy technical pain into product direction and working demos.",
  "i build across ai, education, product, and internet systems that actually help people.",
]

export const nowItems = [
  {
    label: "Building",
    value: "a site and body of work that can hold projects, writing, resources, and all the internet chaos without turning into one giant dump.",
  },
  {
    label: "Learning",
    value: "how to make ai education sharper, warmer, and actually useful for ambitious people who want details, not fluff.",
  },
  {
    label: "Thinking about",
    value: "ai engineering, public pedagogy, cultural interpretation, and what kinds of internet spaces still feel alive rn.",
  },
  {
    label: "Keeping close",
    value: "poetry, research, hand-drawn artifacts, and tools that turn ideas into systems we can actually use.",
  },
]
