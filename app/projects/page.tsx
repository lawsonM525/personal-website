import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { EditorialArt } from "@/components/editorial-art"
import { featureWork } from "@/data/editorial-content"

const publicBuilds = [
  {
    title: "Scholarly Mobile",
    subtitle: "Companion build",
    description:
      "A mobile extension of Scholarly that brings the product onto phones while the main platform keeps evolving across applications, learning flows, and student support.",
    link: "https://github.com/The-Scholarly-Company/scholarly-mobile",
  },
  {
    title: "Future You Mobile",
    subtitle: "Companion build",
    description:
      "An Expo app for Future You with the strategy dashboard, goals, daily quests, and account flows designed for mobile use.",
    link: "https://github.com/lawsonM525/future-u-mobile",
  },
  {
    title: "10,000 Hours Mobile",
    subtitle: "Companion build",
    description:
      "The mobile companion for 10,000 Hours, scoped around timers, timelines, categories, mastery tracking, and sync with the broader web product.",
    link: "https://github.com/lawsonM525/tenthousand-mobile",
  },
  {
    title: "Computer Science Girlies",
    subtitle: "Community + media",
    description:
      "A community and media platform built to support women in computer science through education, visibility, and real opportunities.",
    link: "https://www.csgirlies.com",
  },
]

const relevantExperience = [
  {
    title: "MongoDB",
    role: "Forward Deployed AI Product Management Intern",
    date: "May 2025 — August 2025",
    description:
      "Worked on Facto Agent, an AI-assisted deterministic refactoring agent. What mattered to me here was learning how to move from ambiguous internal pain to something concrete: write the proposal, define the principles, interview 20+ stakeholders across functions, make the build-vs-buy call, then prove the idea with a full-stack demo where Gemini acted as an AI planner over a deterministic tool through a Model Context Protocol server and client.",
    },
  {
    title: "MIT Breakthrough Tech x Salesforce",
    role: "Machine Learning Fellow",
    date: "May 2024 — May 2025",
    description:
      "Built and fine-tuned three ML models, including sentiment analysis and predictive time-series systems, with 98% and 93% accuracy using Python, TF-IDF, Random Forest, Jupyter, and scikit-learn. Then turned that work into a Dockerized SaaS customer sentiment analysis product because I cared less about training models for their own sake and more about how a model becomes something a team can actually use.",
    },
  {
    title: "Future You",
    role: "Founder + AI product builder",
    date: "2024 — Present",
    description:
      "Built a full-stack AI career guidance product with RAG, TypeScript, Pinecone, Supabase, and MongoDB, then onboarded 1,000+ early users and kept iterating from feedback. The bigger lesson here was that good AI product work is not just model orchestration. it is understanding the emotional and informational gap a user is stuck in, then designing retrieval, UI, feedback loops, onboarding, and trust from the start.",
  },
  {
    title: "CompSciLib",
    role: "Business Data Analyst",
    date: "Jan 2024 — May 2024",
    description:
      "Used DataDog usage data to identify engagement patterns, push a content and UI strategy overhaul, and help increase daily active users by 30%. I keep this close because it reinforced a product truth i use everywhere now: if you cannot read behavior clearly, you will build on vibes.",
  },
  {
    title: "@michellescomputer + Computer Science Girlies",
    role: "Content creator, AI educator, community builder",
    date: "2023 — Present",
    description:
      "Built a large technical audience and community through analytics-led education, partnerships with AI companies, and product-minded content. This work shaped how I think as much as any internship did: if I cannot explain a system clearly, understand what confuses people, and redesign the framing until it lands, I probably do not understand it well enough yet.",
  },
]

const experiments = [
  {
    title: "Code Nav",
    status: "recent experiment",
    description:
      "A codebase visualization tool I started to make large repos easier to understand, map, and explain.",
    link: "https://github.com/lawsonM525/code-nav",
  },
  {
    title: "Pagez",
    status: "recent experiment",
    description:
      "An exploratory build around extracting structure from documents and turning it into something more navigable and visual.",
  },
  {
    title: "Video Learning",
    status: "recent collaborative build",
    description:
      "A collaborative AI learning product centered on video summarization, Q&A, transcripts, and notes. the kind of project i like because it forces both product clarity and contributor coordination.",
  },
  {
    title: "SaaS Customer Sentiment Analysis",
    status: "earlier build",
    description:
      "A machine learning and product analysis project focused on extracting signal from customer feedback and making it useful for product decisions.",
    link: "https://customer-sentiment-analysis-3w5v.vercel.app",
  },
]

export default function Projects() {
  return (
    <main className="editorial-shell">
      {/* Page header */}
      <section className="page-frame">
        <div className="grid gap-0 border-b border-[rgba(41,47,54,0.72)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border-r border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
            <p className="section-kicker" style={{ color: "rgb(78,205,196)" }}>Work</p>
            <h1 className="section-heading mt-3 text-[4rem] leading-[0.93] text-foreground sm:text-[5rem] lg:text-[5.5rem]">
              things i've built, shipped, and let out into the world.
            </h1>
            <p className="mt-6 max-w-[34rem] text-[1.06rem] leading-9 text-[rgba(41,47,54,0.74)]">
              right now the center of gravity is Scholarly, Future You, and 10,000 Hours. around that, the work that best explains me for AI engineering and forward deployed roles is product strategy, applied ML, full-stack prototyping, and turning ambiguous user pain into working systems. but i also want this page to show how i think: what problem i thought was worth solving, why i solved it that way, and what each build taught me.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="archive-chip">Products</span>
              <span className="archive-chip">Case studies</span>
              <span className="archive-chip">Experiments</span>
              <span className="archive-chip">Research</span>
            </div>
          </div>
          <div className="relative min-h-[28rem] overflow-hidden border-t border-[rgba(41,47,54,0.72)] lg:border-l lg:border-t-0">
            <Image
              src="/praying hands journal.jpeg"
              alt="Hands drawing on journal postcards"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-[rgba(255,248,241,0.08)]" />
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="page-frame">
        <div className="border-b border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker" style={{ color: "rgb(78,205,196)" }}>Start here</p>
              <h2 className="section-heading mt-3 text-5xl text-foreground">
                the ones i'd open first.
              </h2>
            </div>
          </div>

          <div className="mt-10 space-y-0">
            {featureWork.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="grid gap-0 border-t border-[rgba(41,47,54,0.72)] bg-white/75 hover:bg-white lg:grid-cols-[0.9fr_1.1fr]"
              >
                <div className="relative min-h-[18rem] border-r border-[rgba(41,47,54,0.72)]">
                  {item.imageSrc ? (
                    <Image
                      src={item.imageSrc}
                      alt={item.artTitle || item.title}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                  ) : (
                    <EditorialArt
                      title={item.artTitle || item.title}
                      credit="Art coming soon"
                      variant="blueprint"
                      className="absolute inset-0 border-0"
                    />
                  )}
                </div>
                <div className="space-y-5 p-8 lg:p-10">
                  <p className="meta-text text-[rgba(41,47,54,0.52)]">{item.label}</p>
                  <h3 className="font-serif text-4xl leading-tight text-foreground">{item.title}</h3>
                  <p className="max-w-[30rem] leading-8 text-[rgba(41,47,54,0.76)]">{item.summary}</p>
                  <span className="archive-chip inline-block">view →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="page-frame">
        <div className="border-b border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker" style={{ color: "rgb(78,205,196)" }}>Relevant experience</p>
              <h2 className="section-heading mt-3 text-5xl text-foreground">
                the experience behind the products.
              </h2>
              <p className="mt-5 max-w-[40rem] leading-9 text-[rgba(41,47,54,0.74)]">
                this is the recruiter-readable version, but also the real one. i do not think of experience as a list of logos or tools. i think of it as a trail of questions: what was the actual problem, what did users need, what constraints were real, what system would help, and what changed in my thinking once i built it.
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-0">
            {relevantExperience.map((item) => (
              <div
                key={`${item.title}-${item.role}`}
                className="grid gap-0 border-t border-[rgba(41,47,54,0.72)] bg-white/75 lg:grid-cols-[17rem_1fr]"
              >
                <div className="border-b border-[rgba(41,47,54,0.72)] p-8 lg:border-b-0 lg:border-r">
                  <p className="meta-text text-[rgba(41,47,54,0.52)]">{item.date}</p>
                  <h3 className="mt-3 font-serif text-2xl text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[rgba(41,47,54,0.62)]">{item.role}</p>
                </div>
                <div className="p-8">
                  <p className="leading-9 text-[rgba(41,47,54,0.76)]">{item.description}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-[rgba(41,47,54,0.72)]" />
          </div>
        </div>
      </section>

      {/* Selected + experiments */}
      <section className="page-frame">
        <div className="grid gap-0 border-b border-[rgba(41,47,54,0.72)] lg:grid-cols-[1fr_1fr]">
          <div className="border-r border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
            <p className="section-kicker" style={{ color: "rgb(78,205,196)" }}>Public builds</p>
            <h2 className="section-heading mt-3 text-5xl text-foreground">the adjacent work.</h2>
            <p className="mt-5 max-w-[34rem] leading-9 text-[rgba(41,47,54,0.74)]">
              these are the projects around the core products that show range: companion apps, technical writeups, community infrastructure, and the kinds of side builds that usually teach me something i bring back into the main work.
            </p>
            <div className="mt-8 space-y-0">
              {publicBuilds.map((project) => (
                <div
                  key={project.title}
                  className="border-t border-[rgba(41,47,54,0.72)] bg-white/75 px-6 py-8"
                >
                  <p className="meta-text text-[rgba(41,47,54,0.52)]">{project.subtitle}</p>
                  <h3 className="mt-3 font-serif text-3xl text-foreground">{project.title}</h3>
                  <p className="mt-3 leading-8 text-[rgba(41,47,54,0.76)]">{project.description}</p>
                  {project.link ? (
                    <Link
                      href={project.link}
                      className="mt-5 inline-flex items-center gap-1 text-sm text-foreground underline-offset-4 hover:underline"
                    >
                      View project <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="p-10 sm:p-12 lg:p-16">
            <p className="section-kicker" style={{ color: "rgb(255,107,107)" }}>Archive + experiments</p>
            <h2 className="section-heading mt-3 text-5xl text-foreground">experiments and earlier work.</h2>
            <p className="mt-5 max-w-[34rem] leading-9 text-[rgba(41,47,54,0.74)]">
              i keep these visible on purpose. some are rougher, earlier, or narrower, but they make the thinking legible. you can usually see the pattern before the polished version arrives.
            </p>
            <div className="mt-8 space-y-0">
              {experiments.map((project) => (
                <div
                  key={project.title}
                  className="border-t border-[rgba(41,47,54,0.72)] bg-white/75 px-6 py-8"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-3xl text-foreground">{project.title}</h3>
                    <span className="archive-chip shrink-0">{project.status}</span>
                  </div>
                  <p className="mt-3 leading-8 text-[rgba(41,47,54,0.76)]">{project.description}</p>
                  {"link" in project && project.link ? (
                    <Link
                      href={project.link}
                      className="mt-5 inline-flex items-center gap-1 text-sm text-foreground underline-offset-4 hover:underline"
                    >
                      Open <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
