'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ClipboardCopy, Download } from "lucide-react"
import { Footer } from "@/components/footer"
import { EditorialArt } from "@/components/editorial-art"
import { aboutHighlights } from "@/data/editorial-content"
import headshot from "@/assets/Michelle.Lawson.png"
import portrait from "@/assets/michelle pink scarf icon.png"

export default function About() {
  const bioText = `Michelle Lawson is a software engineer, AI product builder, and educator from Accra, Ghana. She studies computer science at Smith College, served as a Forward Deployed AI Product Management Intern at MongoDB, and is the CTO and co-founder of Scholarly. Her work sits at the intersection of AI engineering, product strategy, and education: building full-stack systems, translating user pain into product direction, and making technical ideas feel useful, human, and reachable.`

  const timeline = [
    {
      title: "Smith College, ML, and Research",
      date: "2022 — Present",
      body: "Studying computer science at Smith College with work spanning machine learning, math for deep learning, and research on better ways to assess student understanding in STEM.",
    },
    {
      title: "MongoDB",
      date: "Summer 2025",
      body: "Worked as a Forward Deployed AI Product Management Intern, driving strategy for an AI-assisted refactoring agent and building a full-stack demo that connected the Gemini API with a Model Context Protocol server and client.",
    },
    {
      title: "Breakthrough Tech x Salesforce",
      date: "2024 — 2025",
      body: "Built and fine-tuned machine learning models for sentiment analysis and time-series prediction, then shipped a web-based SaaS customer sentiment analysis platform with cloud-hosted ML models.",
    },
    {
      title: "Startups, AI, and Community",
      date: "Summer 2024 — Present",
      body: "Building Scholarly, Future You, and other AI products while growing technical communities through Computer Science Girlies and AI education content that reaches a large public audience.",
    },
  ]

  return (
    <main className="editorial-shell">
      {/* Hero */}
      <section className="page-frame">
        <div className="grid gap-0 border-b border-[rgba(41,47,54,0.72)] lg:grid-cols-[1fr_1fr]">
          <div className="border-r border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
            <p className="section-kicker">About</p>
            <h1 className="section-heading mt-3 text-[4rem] leading-[0.93] text-foreground sm:text-[5rem] lg:text-[5.5rem]">
              builder, researcher, founder... and the girl who's probably opening one more tab.
            </h1>
            <p className="mt-6 max-w-[34rem] text-[1.06rem] leading-9 text-[rgba(41,47,54,0.74)]">
              i build projects, explain things properly, and leave behind resources that make ambitious futures feel a little more reachable. i want this site to feel like talking to someone who will actually put you on.
            </p>
            <div className="mt-10 space-y-0">
              {aboutHighlights.map((item) => (
                <div
                  key={item}
                  className="border-t border-[rgba(41,47,54,0.72)] bg-white/75 px-6 py-5 text-[rgba(41,47,54,0.8)] leading-8"
                >
                  {item}
                </div>
              ))}
              <div className="border-t border-[rgba(41,47,54,0.72)]" />
            </div>
          </div>
          <div className="relative min-h-[32rem] overflow-hidden border-t border-[rgba(41,47,54,0.72)] lg:border-l lg:border-t-0">
            <Image
              src={portrait}
              alt="Michelle Lawson"
              fill
              className="object-cover object-top"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Official bio + headshot */}
      <section className="page-frame">
        <div className="grid gap-0 border-b border-[rgba(41,47,54,0.72)] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border-r border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
            <p className="section-kicker">The official version</p>
            <h2 className="section-heading mt-3 text-5xl text-foreground">
              for journalists, hosts, organizers.
            </h2>
            <div className="mt-8 border-l-4 border-[rgba(41,47,54,0.72)] bg-white/75 px-8 py-6 font-serif text-[1.06rem] italic leading-9 text-[rgba(41,47,54,0.8)]">
              {bioText}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigator.clipboard.writeText(bioText)}
              >
                <ClipboardCopy className="mr-2 h-4 w-4" />
                copy bio
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const link = document.createElement("a")
                  link.href = headshot.src
                  link.download = "Michelle-Lawson-Headshot.png"
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                download headshot
              </Button>
            </div>
          </div>

          <div className="p-10 sm:p-12 lg:p-16">
            <p className="section-kicker">Headshot</p>
            <h2 className="section-heading mt-3 text-5xl text-foreground">the face.</h2>
            <div className="mt-8 overflow-hidden border border-[rgba(41,47,54,0.72)]">
              <Image
                src={headshot}
                alt="Michelle Lawson"
                width={600}
                height={600}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="page-frame">
        <div className="border-b border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
          <p className="section-kicker">Journey</p>
          <h2 className="section-heading mt-3 text-5xl text-foreground">the longer story.</h2>
          <div className="mt-10 space-y-0">
            {timeline.map((entry, i) => (
              <div
                key={entry.title}
                className="grid gap-0 border-t border-[rgba(41,47,54,0.72)] bg-white/75 lg:grid-cols-[16rem_1fr]"
              >
                <div className="border-b border-[rgba(41,47,54,0.72)] p-8 lg:border-b-0 lg:border-r">
                  <p className="meta-text text-[rgba(41,47,54,0.52)]">{entry.date}</p>
                  <h3 className="mt-3 font-serif text-2xl text-foreground">{entry.title}</h3>
                </div>
                <div className="p-8">
                  <p className="leading-9 text-[rgba(41,47,54,0.76)]">{entry.body}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-[rgba(41,47,54,0.72)]" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
