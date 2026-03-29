import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Footer } from "@/components/footer"

const SCHOLARLY_URL = "https://startscholarly.com"

const timeline = [
  {
    label: "The problem",
    body: "The college application process is opaque, stressful, and wildly unequal. Students with resources get coaches, essay editors, and insider knowledge. Everyone else is guessing.",
  },
  {
    label: "The build",
    body: "Co-founded Scholarly to change that. As CTO, i've been shaping the product end-to-end — the architecture, the AI features, the user experience, and the roadmap.",
  },
  {
    label: "The mission",
    body: "Make the entire process — school discovery, essay development, application strategy — more accessible. Not just for the students who already have a leg up.",
  },
  {
    label: "Where we are",
    body: "Actively building. The platform is live and evolving. If you're navigating college apps or know someone who is, go check it out.",
  },
]

export default function ScholarlyPage() {
  return (
    <main className="editorial-shell">
      {/* Header */}
      <section className="page-frame">
        <div className="grid gap-0 border-b border-[rgba(41,47,54,0.72)] lg:grid-cols-[1fr_1fr]">
          <div className="border-r border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
            <p className="section-kicker" style={{ color: "rgb(78,205,196)" }}>CTO + co-founder</p>
            <h1 className="section-heading mt-3 text-[4rem] leading-[0.93] text-foreground sm:text-[5rem] lg:text-[5.5rem]">
              Scholarly
            </h1>
            <p className="mt-6 max-w-[34rem] text-[1.06rem] leading-9 text-[rgba(41,47,54,0.74)]">
              an ed-tech platform making the college application process more accessible — finding schools, building the story, navigating the system.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="archive-chip">Ed-tech</span>
              <span className="archive-chip">AI</span>
              <span className="archive-chip">Product</span>
              <span className="archive-chip">Co-founder</span>
            </div>
            <div className="mt-8">
              <Link
                href={SCHOLARLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[rgba(41,47,54,0.72)] bg-foreground px-6 py-3 font-mono text-[0.72rem] tracking-[0.14em] uppercase text-[rgb(255,248,241)] transition-colors hover:bg-[rgba(41,47,54,0.82)]"
              >
                Visit Scholarly <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative min-h-[32rem] overflow-hidden border-t border-[rgba(41,47,54,0.72)] lg:border-l lg:border-t-0">
            <Image
              src="/scholarly-home.png"
              alt="Scholarly — homepage screenshot"
              fill
              className="object-cover object-top"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-[rgba(41,47,54,0.04)]" />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="page-frame">
        <div className="grid gap-0 border-b border-[rgba(41,47,54,0.72)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-r border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
            <p className="section-kicker" style={{ color: "rgb(78,205,196)" }}>The story</p>
            <h2 className="section-heading mt-3 text-5xl text-foreground sm:text-6xl">
              the process shouldn't be this hard to navigate.
            </h2>
            <p className="mt-6 max-w-[30rem] text-[rgba(41,47,54,0.76)] leading-8">
              i built Scholarly because i watched smart, capable students lose ground to a system that rewards access, not ability. that's a solvable problem.
            </p>
          </div>

          <div>
            {timeline.map((item, i) => (
              <div
                key={item.label}
                className="border-b border-[rgba(41,47,54,0.72)] p-10 last:border-b-0 sm:p-12"
                style={{ borderLeft: "3px solid rgb(78,205,196)" }}
              >
                <p className="meta-text text-[rgba(41,47,54,0.52)]">0{i + 1} — {item.label}</p>
                <p className="mt-4 leading-8 text-[rgba(41,47,54,0.8)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-frame">
        <div className="border-b border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="section-kicker" style={{ color: "rgb(255,107,107)" }}>Check it out</p>
              <h2 className="section-heading mt-2 text-4xl text-foreground">Scholarly is live.</h2>
              <p className="mt-3 text-[rgba(41,47,54,0.74)] leading-8">
                if you're applying to college, know someone who is, or just want to see what we're building — the platform is live.
              </p>
            </div>
            <Link
              href={SCHOLARLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 border border-[rgba(41,47,54,0.72)] px-8 py-4 font-mono text-[0.72rem] tracking-[0.14em] uppercase text-foreground transition-colors hover:bg-[rgba(41,47,54,0.06)]"
            >
              Visit Scholarly <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="page-frame">
        <div className="border-b border-[rgba(41,47,54,0.72)] p-6">
          <Link href="/projects" className="meta-text text-[rgba(41,47,54,0.52)] hover:text-foreground transition-colors">
            ← back to work
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
