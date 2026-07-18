export type ComputerCategory = {
  slug: string
  title: string
  count: string
  image: string
  description: string
  tools: string[]
}

export type ComputerQuest = {
  slug: string
  title: string
  image: string
  prompt: string
  steps: string[]
}

export const computerCategories: ComputerCategory[] = [
  {
    slug: "building",
    title: "Building",
    count: "ship faster",
    image: "/michelles-computer/cat-building.png",
    description: "Tools for turning a vague idea into a live project.",
    tools: ["Lovable", "Vercel", "Windsurf", "GitHub", "Canva"],
  },
  {
    slug: "career",
    title: "Career",
    count: "level up",
    image: "/michelles-computer/cat-career.png",
    description: "Resources for resumes, internships, visibility, and interviews.",
    tools: ["LinkedIn", "Simplify", "ChatGPT", "Pramp", "Teal"],
  },
  {
    slug: "network",
    title: "Network",
    count: "find people",
    image: "/michelles-computer/cat-network.png",
    description: "Ways to meet collaborators, mentors, and internet friends.",
    tools: ["Twitter", "LinkedIn", "Lunchclub", "Discord", "Substack"],
  },
  {
    slug: "money",
    title: "Money",
    count: "get paid",
    image: "/michelles-computer/cat-money.png",
    description: "Helpful starting points for pricing, budgeting, and side quests.",
    tools: ["Stripe", "Gumroad", "Notion", "Datafast", "Mercury"],
  },
  {
    slug: "identity",
    title: "Identity",
    count: "become her",
    image: "/michelles-computer/cat-identity.png",
    description: "Prompts and systems for taste, confidence, and personal operating systems.",
    tools: ["Obsidian", "NotebookLM", "Pinterest", "Readwise", "Claude"],
  },
  {
    slug: "other",
    title: "Other",
    count: "misc gems",
    image: "/michelles-computer/cat-other.png",
    description: "Useful things that do not fit neatly into a folder.",
    tools: ["Gamma", "Suno", "Shortwave", "Perplexity", "Arc"],
  },
]

export const computerQuests: ComputerQuest[] = [
  {
    slug: "ship-something",
    title: "Ship Something This Week",
    image: "/michelles-computer/quest-ship.png",
    prompt: "Stop thinking about it and build the smallest live version.",
    steps: ["Write a one-paragraph spec", "Build the first screen", "Deploy on day one"],
  },
  {
    slug: "inbox-zero",
    title: "Get Your Inbox Out of Your Head",
    image: "/michelles-computer/quest-inbox.png",
    prompt: "Turn scary unread chaos into a clean reply queue.",
    steps: ["Archive old noise", "Draft the scary replies", "Create two daily email sprints"],
  },
  {
    slug: "second-brain",
    title: "Build a Second Brain",
    image: "/michelles-computer/quest-brain.png",
    prompt: "Your brain is not a storage device. Give your ideas a home.",
    steps: ["Pick one capture place", "Make five starter notes", "Review every Sunday"],
  },
  {
    slug: "learn-to-code",
    title: "Learn to Code, For Real This Time",
    image: "/michelles-computer/quest-code.png",
    prompt: "Build one tiny project instead of collecting another curriculum.",
    steps: ["Choose a tiny project", "Code for 15 minutes daily", "Ask AI to explain errors"],
  },
  {
    slug: "presentation",
    title: "Make Your Presentation Memorable",
    image: "/michelles-computer/quest-presentation.png",
    prompt: "Fine is forgettable. Make the audience remember one thing.",
    steps: ["Find the story", "Cut the words", "Rehearse out loud three times"],
  },
]
