"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { EditorialArt } from "@/components/editorial-art"
import {
  featureWork,
  heroArtwork,
  missionStatement,
  networkItems,
  topicHubs,
  writingTracks,
} from "@/data/editorial-content"

const directoryItems = [
  {
    title: "Work",
    href: "/projects",
    summary: "case studies, products, experiments, and the builds i'd tell you to open first.",
  },
  {
    title: "Garden",
    href: "/resources",
    summary: "topic hubs, links, notes, and the rabbit holes that are actually worth your time.",
  },
  {
    title: "Writing",
    href: "/posts",
    summary: "words and thoughts and stories and stuff.",
  },
  {
    title: "Community",
    href: "/community",
    summary: "internet neighbors, guestbook plans, and people i genuinely think you should know.",
  },
  {
    title: "About",
    href: "/about",
    summary: "the longer story... who i am, how i got here, and what i'm building toward.",
  },
  {
    title: "Now",
    href: "/now",
    summary: "what i'm building, learning, and a little obsessed with rn.",
  },
]

const scrollySections = [
  {
    label: "start here",
    title: "the point is not to impress you... it's to help you move.",
    body: "i want this site to feel like the friend who actually sends the links, breaks things down properly, and gives you enough detail to go do something with it.",
  },
  {
    label: "the map",
    title: "you should not have to dig to find the good stuff.",
    body: "so everything here is organized like an actual map... work if you want the builds, garden if you want the resources, writing if you want the deeper thoughts, community if you want the people.",
  },
  {
    label: "the vibe",
    title: "and yes... we are going to make it beautiful too.",
    body: "art, collage covers, handwritten details, and blueprint circuits belong here. not as filler... as part of the world we are building.",
  },
]

export default function Home() {
  const [heroDate, setHeroDate] = useState("")

  useEffect(() => {
    const update = () => {
      const d = new Date()
      setHeroDate(
        d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
          "  ·  " +
          d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
      )
    }
    update()
    const id = setInterval(update, 1000 * 30)
    return () => clearInterval(id)
  }, [])

  return (
    <main className="editorial-shell">
      <section className="page-frame">
        <div className="editorial-grid border-b border-[rgba(41,47,54,0.72)]">
          <div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
            {/* Hero left — teal gradient, timestamp, headline, byline */}
            <div
              className="flex flex-col border-r border-[rgba(41,47,54,0.72)] px-12 py-12 sm:px-16 sm:py-14 lg:px-24 lg:py-16"
              style={{
                background:
                  "linear-gradient(180deg, rgba(78,205,196,0.58) 0%, rgba(78,205,196,0.32) 35%, rgba(78,205,196,0.12) 62%, rgba(255,248,241,0) 88%)",
              }}
            >
              {/* Timestamp — top left, Byline-style */}
              <div className="self-start border border-[rgba(41,47,54,0.72)] bg-[rgba(255,248,241,0.82)] px-5 py-2.5">
                <span className="meta-text text-[rgba(41,47,54,0.72)]">
                  {heroDate || "\u00a0"}
                </span>
              </div>

              {/* Headline + welcome */}
              <div className="mt-10 space-y-8">
                <h1 className="section-heading max-w-[42rem] text-[3.6rem] leading-[0.92] text-foreground sm:text-[4.4rem] lg:text-[5.4rem]">
                  {missionStatement}
                </h1>
                <p className="max-w-[33rem] text-[1.08rem] leading-9 text-[rgba(41,47,54,0.76)]">
                  welcome!! i'm michelle — AI engineer, founder, educator, content creator, builder, coder, whatever else fits. this space is kind of like a desk i want to share with you. my world: the projects, the writing, the favorite things. let's be friends. let's learn together.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/projects" className="archive-chip">work →</Link>
                  <Link href="/resources" className="archive-chip">garden →</Link>
                  <Link href="/posts" className="archive-chip">writing →</Link>
                  <Link href="/about" className="archive-chip">about →</Link>
                </div>
              </div>

              {/* Byline footer — anchored to bottom */}
              <div className="mt-auto pt-12">
                <div className="hero-byline-rule" />
                <p className="py-3 font-serif text-[1.12rem] italic text-foreground">By Michelle Lawson</p>
                <div className="hero-byline-rule" />
              </div>
            </div>

            {/* Hero right — neo.webp fills full column */}
            <div className="relative min-h-[36rem] overflow-hidden border-t border-[rgba(41,47,54,0.72)] lg:border-l lg:border-t-0">
              <Image
                src={heroArtwork.src}
                alt="Neo — hero artwork"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
              {/* Circular stamp badge — anchored bottom-right over illustration */}
              <a
                href="https://www.instagram.com/michellescomputer/"
                target="_blank"
                rel="noopener noreferrer"
                className="circular-badge absolute bottom-10 right-10 z-10 rotate-[14deg] shadow-lg"
              >
                <span>CHECK<br />MY INSTA<br />GRAM</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="page-frame">
        <div className="grid gap-0 border-b border-[rgba(41,47,54,0.72)] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="editorial-card border-0 border-r border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="section-kicker" style={{ color: "rgb(78,205,196)" }}>Featured work</p>
                <h2 className="section-heading mt-3 text-5xl text-foreground sm:text-6xl">
                  if you ask me what i've worked on... i'd send you here.
                </h2>
              </div>
              <Link href="/projects" className="archive-chip">
                see all work
              </Link>
            </div>

            <div className="mt-10 space-y-0">
              {featureWork.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="grid gap-0 border-t border-[rgba(41,47,54,0.72)] hover:bg-[rgba(255,248,241,0.6)] lg:grid-cols-[0.9fr_1.1fr]"
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
                        credit=""
                        variant="blueprint"
                        className="absolute inset-0 border-0"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-4 p-8 lg:p-10">
                    <p className="meta-text text-[rgba(41,47,54,0.52)]">{item.label}</p>
                    <h3 className="font-serif text-4xl leading-tight text-foreground">{item.title}</h3>
                    <p className="max-w-[30rem] text-[rgba(41,47,54,0.76)] leading-8">{item.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-0">
            <div className="editorial-card border-0 p-10 sm:p-12 lg:p-16">
              <p className="section-kicker" style={{ color: "rgb(78,205,196)" }}>Directory</p>
              <h2 className="section-heading mt-3 text-5xl text-foreground">pick your lane and i'll take you there.</h2>
              <div className="mt-8 grid gap-0 border-y border-[rgba(41,47,54,0.72)]">
                {directoryItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="grid gap-4 border-b border-[rgba(41,47,54,0.72)] bg-white/78 px-7 py-7 hover:bg-white last:border-b-0 lg:px-8 lg:py-8"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-serif text-3xl text-foreground">{item.title}</h3>
                      <span className="meta-text text-[rgba(41,47,54,0.52)]">go</span>
                    </div>
                    <p className="max-w-[30rem] text-sm leading-8 text-[rgba(41,47,54,0.74)]">{item.summary}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative min-h-[10rem] overflow-hidden border-t border-[rgba(41,47,54,0.72)]">
              <Image
                src="/blueprint1.jpeg"
                alt="Blueprint technical drawing"
                fill
                className="object-cover object-center opacity-60"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="absolute inset-0 bg-[rgba(255,248,241,0.28)]" />
            </div>
          </div>
        </div>
      </section>

      <section className="page-frame">
        <div className="grid gap-0 border-b border-[rgba(41,47,54,0.72)] lg:grid-cols-[0.86fr_1.14fr]">
          <div className="editorial-card border-0 border-r border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
            <p className="section-kicker" style={{ color: "rgb(78,205,196)" }}>Why this site exists</p>
            <h2 className="section-heading mt-3 text-5xl text-foreground sm:text-6xl">
              we are not doing shallow over here.
            </h2>
            <p className="mt-6 max-w-[30rem] text-[rgba(41,47,54,0.76)] leading-8">
              i care a lot about giving real value. that means actual links, actual tips, actual explanations,
              and enough context for you to go build something with it... not just cute vague words.
            </p>
          </div>

          <div className="space-y-0">
            {scrollySections.map((section, index) => (
              <div
                key={section.title}
                className="editorial-card grid gap-8 border-0 border-b border-[rgba(41,47,54,0.72)] p-10 sm:grid-cols-[auto_1fr] sm:p-12 last:border-b-0"
              >
                <div className="relative flex h-20 w-20 items-center justify-center font-serif text-3xl text-foreground">
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                    <ellipse cx="40" cy="40" rx="33" ry="26" stroke="rgba(41,47,54,0.72)" strokeWidth="1.5" />
                    <path d="M20 44c8-10 19-16 33-20" stroke="rgba(255,107,107,0.42)" strokeWidth="1.5" />
                  </svg>
                  0{index + 1}
                </div>
                <div>
                  <p className="section-kicker">{section.label}</p>
                  <h3 className="mt-2 font-serif text-4xl text-foreground">{section.title}</h3>
                  <p className="mt-4 max-w-[34rem] text-[rgba(41,47,54,0.76)] leading-8">{section.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-frame">
        <div className="grid gap-0 border-b border-[rgba(41,47,54,0.72)] lg:grid-cols-[1fr_1fr]">
          <div className="editorial-card border-0 border-r border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
            <p className="section-kicker" style={{ color: "rgb(78,205,196)" }}>Garden</p>
            <h2 className="section-heading mt-3 text-5xl text-foreground">if you ask me where to start... i tend to point here.</h2>
            <div className="mt-8 space-y-0 border-y border-[rgba(41,47,54,0.72)]">
              {topicHubs.map((hub) => (
                <div key={hub.title} className="border-b border-[rgba(41,47,54,0.72)] bg-white/78 px-7 py-8 last:border-b-0 lg:px-8" style={{ borderLeft: "3px solid rgb(78,205,196)" }}>
                  <h3 className="font-serif text-3xl text-foreground">{hub.title}</h3>
                  <p className="mt-3 max-w-[34rem] text-[rgba(41,47,54,0.76)] leading-8">{hub.intro}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="editorial-card border-0 p-10 sm:p-12 lg:p-16">
            <p className="section-kicker" style={{ color: "rgb(255,107,107)" }}>Writing</p>
            <h2 className="section-heading mt-3 text-5xl text-foreground">essays, poems, future histories, and the deeper thoughts.</h2>
            <div className="mt-8 space-y-0 border-y border-[rgba(41,47,54,0.72)]">
              {writingTracks.map((track) => (
                <div key={track.title} className="border-b border-[rgba(41,47,54,0.72)] bg-white/78 px-7 py-8 last:border-b-0 lg:px-8" style={{ borderLeft: "3px solid rgb(255,107,107)" }}>
                  <h3 className="font-serif text-3xl text-foreground">{track.title}</h3>
                  <p className="mt-3 max-w-[34rem] text-[rgba(41,47,54,0.76)] leading-8">{track.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-frame">
        <div className="editorial-card grid gap-0 border-b border-[rgba(41,47,54,0.72)] p-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-r border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
            <p className="section-kicker" style={{ color: "rgb(78,205,196)" }}>Elsewhere on the internet</p>
            <h2 className="section-heading mt-3 text-5xl text-foreground sm:text-6xl">
              people, sites, and labs i think you'd actually like.
            </h2>
            <p className="mt-6 max-w-[30rem] text-[rgba(41,47,54,0.76)] leading-8">
              not every good link belongs in a giant resources dump. some belong in community...
              because the people behind them matter too.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/community" className="archive-chip">community map</Link>
              <Link href="/resources" className="archive-chip">resource trail</Link>
            </div>
          </div>

          <div className="grid gap-0">
            {networkItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="border-b border-[rgba(41,47,54,0.72)] bg-white/78 px-7 py-8 hover:bg-white last:border-b-0 lg:px-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-serif text-3xl text-foreground">{item.name}</h3>
                  <span className="archive-chip">{item.type}</span>
                </div>
                <p className="mt-4 max-w-[34rem] text-[rgba(41,47,54,0.76)] leading-8">{item.whyItMatters}</p>
                {item.noteOnInteraction ? (
                  <p className="mt-3 text-sm leading-7 text-[rgba(41,47,54,0.62)]">{item.noteOnInteraction}</p>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
