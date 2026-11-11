export const beautifulWomanDeckPath = "/slides/the-beautiful-woman"
export const beautifulWomanDeckTitle = "AI, ideas & faith"

export type SessionSlide = {
  id: string
  section: "Welcome" | "Possibilities" | "Cautions" | "Faith & judgment" | "Next week"
  title: string
  lead?: string
  points?: { title: string; text: string }[]
  prompt?: string
  question?: string
  note?: string
  art?: "friends" | "learn" | "letter"
  tone?: "blue" | "pink" | "sky"
  source?: { label: string; href: string }
}

export const beautifulWomanSlides: SessionSlide[] = [
  {
    id: "hello", section: "Welcome", title: "Your ideas deserve a chance.",
    lead: "Hi, I’m Michelle. Let’s talk about what AI could make possible for our work, our ideas, and the things God has placed on our hearts.",
    note: "The Beautiful Woman · AI, ideas & faith · Questions welcome 🩵", art: "friends",
  },
  {
    id: "today", section: "Welcome", title: "Three things, together.", tone: "blue",
    points: [
      { title: "01  Possibilities", text: "Make your ideas real. Grow your skills for your career." },
      { title: "02  Cautions", text: "What to check before you trust a tool or an answer." },
      { title: "03  Faith & judgment", text: "Keep your values, creativity, and discernment at the center." },
    ],
    note: "Today, the bigger questions. Next week, hands-on practice.",
  },
  {
    id: "everyone-starts", section: "Possibilities", title: "You don’t need to be a tech expert.",
    lead: "I work in tech and make educational content. I especially want young women to see that they can get technical and build cool things too.",
    question: "What do you do, and what are you hoping AI could help you learn or make?",
    note: "Everyone was a beginner at some point.", art: "learn",
  },
  {
    id: "what-is-ai", section: "Possibilities", title: "AI learns patterns. You bring the purpose.",
    lead: "AI uses patterns learned from data to do things like work with language, recognize images, and generate content.",
    points: [
      { title: "Ask in normal language", text: "Explore a question, get an explanation, or try out an idea." },
      { title: "Treat the answer as a starting point", text: "A useful response still needs your judgment. It can be wrong." },
    ],
  },
  {
    id: "chatbots-and-agents", section: "Possibilities", title: "A chatbot answers. An agent can act.",
    points: [
      { title: "Chatbot", text: "You ask a question. It helps explain, brainstorm, or draft a response." },
      { title: "Agent", text: "With tools and permission, it can take actions: work on a website, help with email, or build something with you." },
    ],
    note: "I use ChatGPT, Dot, and Codex. There are other tools too, and they all have limits.",
  },
  {
    id: "make-it-real", section: "Possibilities", title: "Make your biggest ideas real.", tone: "sky",
    points: [
      { title: "My website & slides", text: "I’ve used AI to help build both. My creativity, taste, and direction still shape the result." },
      { title: "My first robotics project", text: "I hadn’t done robotics before. AI helped me start learning something entirely new." },
    ],
    question: "What have you been waiting to try?",
  },
  {
    id: "grow-your-skills", section: "Possibilities", title: "Use it to grow your skills.",
    lead: "Filmmaking, design, business, or something completely new: you can start practicing while you also find experienced people to learn from.",
    prompt: "I’m learning [skill] so I can [goal]. Explain the basics, then give me one small exercise. Let me try before you show a solution.",
    note: "You can ask for explanations, examples, hints, and feedback.",
  },
  {
    id: "career-help", section: "Possibilities", title: "Get a little help with the busywork.",
    points: [
      { title: "Find opportunities", text: "I use AI to look for jobs and opportunities I can apply for or share with my community. I still check the original listing and deadline." },
      { title: "Prepare a draft", text: "Partnership pitches, recruiter messages, applications, or content plans. Check every fact and keep your own voice." },
    ],
    note: "Review the answers and permissions before anything is submitted or sent.",
  },
  {
    id: "small-next-step", section: "Possibilities", title: "Your next step can be small.", tone: "pink",
    prompt: "I’m a [role] and I want to [career goal]. I have [time] to practice this week. Ask me three questions, then suggest one useful project I can start. Include sources I can check.",
    question: "Which idea would actually be useful in your life?",
    note: "Tasks and jobs are changing. Learning AI can help you adapt; it doesn’t guarantee a job.",
  },
  {
    id: "check-the-answer", section: "Cautions", title: "Confidence isn’t the same as truth.",
    lead: "AI can give a very confident answer that’s wrong. It can even invent a source. This is often called a hallucination.",
    points: [
      { title: "Open the original source", text: "Does it exist? Does it actually support the claim? Is it current?" },
      { title: "Give important decisions extra care", text: "Health, money, and legal questions need reliable sources and qualified advice." },
    ],
    source: { label: "NIST’s guide to generative AI risks", href: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf" },
  },
  {
    id: "privacy-and-permissions", section: "Cautions", title: "Access is a choice.", tone: "sky",
    points: [
      { title: "Keep private things private", text: "Passwords, banking details, and confidential work information don’t belong in a chat." },
      { title: "Read the permissions", text: "Before connecting an agent to an account, check what it can see and what it can do." },
      { title: "Stay in charge", text: "Give only the access a task needs. Review important actions before they happen." },
    ],
  },
  {
    id: "deepfakes", section: "Cautions", title: "A familiar voice can still be fake.",
    lead: "AI can generate voices, pictures, and videos. Looking or sounding like someone doesn’t prove it’s them.",
    question: "An urgent request for money or private information? Pause. Contact the person through a separate channel you already trust.",
    note: "Call a number you already know, not one supplied in the suspicious message.",
    source: { label: "FTC: voice-cloning scams", href: "https://consumer.ftc.gov/consumer-alerts/2023/03/scammers-use-ai-enhance-their-family-emergency-schemes" },
  },
  {
    id: "environment", section: "Cautions", title: "There’s a cost behind the screen.",
    lead: "AI runs on physical infrastructure. That takes electricity, water, and materials. The impact varies by system and how it’s used.",
    question: "We can be excited about AI and still ask what it costs, and what companies are doing about it.",
    note: "Use it intentionally. Keep asking thoughtful questions.",
    source: { label: "NIST: environmental impacts of generative AI", href: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf" },
  },
  {
    id: "human-support", section: "Cautions", title: "Keep people in the picture.", tone: "pink",
    lead: "Chatbots can reinforce false beliefs or unhealthy dependence. They shouldn’t be your only emotional support or how you check what’s real.",
    question: "If using one leaves you distressed, isolated, or confused about reality, step back and talk to someone you trust or a mental health professional.",
    note: "“AI psychosis” is a phrase you may have heard, not a formal diagnosis.",
    source: { label: "APA: navigating AI advice thoughtfully", href: "https://www.apa.org/topics/artificial-intelligence-machine-learning/guide-navigating-ai" },
  },
  {
    id: "creativity-and-faith", section: "Faith & judgment", title: "Our creativity comes from the Holy Spirit.", tone: "blue",
    lead: "New technology can give us productivity, speed, and space to create. I still want what I make to come from my own creativity, faith, and purpose.",
    note: "Let the tool support the work God has placed on your heart.",
  },
  {
    id: "discernment", section: "Faith & judgment", title: "Suggestions aren’t discernment.",
    lead: "AI can offer possibilities. It cannot replace prayer, faith, or personal judgment. We still decide what’s right for us.",
    question: "Does this use of technology fit my values? Does it help me serve others and be diligent in my work?",
    art: "letter",
  },
  {
    id: "keep-thinking", section: "Faith & judgment", title: "Let it stretch your thinking.", tone: "sky",
    points: [
      { title: "Ask for an explanation", text: "Try it yourself. Ask for a hint. Compare approaches. Practice what you’re learning." },
      { title: "Keep your own judgment active", text: "Notice when you’re handing over decisions instead of learning how to make them." },
    ],
    note: "Our relationships, character, faith, and purpose still matter most.",
  },
  {
    id: "your-boundaries", section: "Faith & judgment", title: "What will you keep close?", art: "letter",
    question: "What would you happily ask AI to help with? What would you want to keep between yourself, God, and the people you trust?",
    note: "There’s room for curiosity and boundaries at the same time.",
  },
  {
    id: "next-week", section: "Next week", title: "Next week, let’s try it.", tone: "blue",
    lead: "We’ll get hands-on with AI agents and useful tasks for your career. I’ll use your questions and ideas from today to shape what we work on.",
    points: [{ title: "Bring one real task", text: "A career move, a skill, or an idea you’d like help making real. And one question you want us to explore." }],
    note: "It’s not too late to start. Start simply, practice, and learn as you go. 🩵",
  },
]

export function slideIndexFromHash(hash: string): number {
  const index = beautifulWomanSlides.findIndex(slide => `#${slide.id}` === hash)
  return index < 0 ? 0 : index
}

export function deckShareUrl(index: number): string {
  const slide = beautifulWomanSlides[Math.max(0, Math.min(beautifulWomanSlides.length - 1, index))]
  return `https://michellescomputer.com${beautifulWomanDeckPath}#${slide.id}`
}
