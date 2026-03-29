import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { EditorialArt } from "@/components/editorial-art"
import { networkItems, topicHubs } from "@/data/editorial-content"

const featuredResources = [
  {
    title: "Windsurf",
    note: "The editor i use to move from idea to working prototype fast. actually fast.",
    href: "https://windsurf.com/refer?referral_code=cdbb51b0b0",
    label: "Editor",
  },
  {
    title: "NotebookLM",
    note: "One of the most useful tools for learning and synthesis right now. no exaggeration.",
    href: "https://notebooklm.google.com",
    label: "Research",
  },
  {
    title: "Datafast",
    note: "Lightweight analytics that make internet projects legible without the bloat.",
    href: "https://datafa.st/?via=michelle",
    label: "Analytics",
  },
]

export default function Resources() {
  return (
    <main className="editorial-shell">
      {/* Page header */}
      <section className="page-frame">
        <div className="grid gap-0 border-b border-[rgba(41,47,54,0.72)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-r border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
            <p className="section-kicker" style={{ color: "rgb(78,205,196)" }}>Garden</p>
            <h1 className="section-heading mt-3 text-[4rem] leading-[0.93] text-foreground sm:text-[5rem] lg:text-[5.5rem]">
              topic hubs, curated links, and notes worth expanding.
            </h1>
            <p className="mt-6 max-w-[34rem] text-[1.06rem] leading-9 text-[rgba(41,47,54,0.74)]">
              not a dump of links. actual introductions, trails, context, and commentary for the things worth actually learning.
            </p>
          </div>
          <div className="relative min-h-[28rem] overflow-hidden border-t border-[rgba(41,47,54,0.72)] lg:border-l lg:border-t-0">
            <Image
              src="/inkdrawing.jpeg"
              alt="Ink drawing"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-[rgba(78,205,196,0.08)]" />
          </div>
        </div>
      </section>

      {/* Featured tools */}
      <section className="page-frame">
        <div className="border-b border-[rgba(41,47,54,0.72)]">
          <div className="p-10 sm:p-12 lg:p-16">
            <p className="section-kicker" style={{ color: "rgb(78,205,196)" }}>Useful immediately</p>
            <h2 className="section-heading mt-3 text-5xl text-foreground">
              tools i actually use.
            </h2>
          </div>
          <div className="grid gap-0 border-t border-[rgba(41,47,54,0.72)] lg:grid-cols-3">
            {featuredResources.map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-r border-[rgba(41,47,54,0.72)] bg-white/75 p-8 hover:bg-white last:border-r-0 lg:p-10"
              >
                <p className="meta-text text-[rgba(41,47,54,0.52)]">{resource.label}</p>
                <h3 className="mt-3 font-serif text-4xl text-foreground">{resource.title}</h3>
                <p className="mt-4 leading-8 text-[rgba(41,47,54,0.76)]">{resource.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Topic hubs */}
      <section className="page-frame">
        <div className="grid gap-0 border-b border-[rgba(41,47,54,0.72)] lg:grid-cols-[1.2fr_0.8fr]">
          <div className="border-r border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
            <p className="section-kicker" style={{ color: "rgb(78,205,196)" }}>Topic hubs</p>
            <h2 className="section-heading mt-3 text-5xl text-foreground">
              start with a topic, not a wall of links.
            </h2>
            <div className="mt-10 space-y-0">
              {topicHubs.map((hub) => (
                <div
                  key={hub.title}
                  className="border-t border-[rgba(41,47,54,0.72)] bg-white/75 px-6 py-8"
                  style={{ borderLeft: "3px solid rgb(78,205,196)" }}
                >
                  <h3 className="font-serif text-4xl text-foreground">{hub.title}</h3>
                  <p className="mt-3 max-w-[34rem] leading-8 text-[rgba(41,47,54,0.76)]">{hub.intro}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {hub.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="archive-chip"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Network sidebar */}
          <div className="p-10 sm:p-12 lg:p-16">
            <p className="section-kicker" style={{ color: "rgb(255,107,107)" }}>Also worth exploring</p>
            <h2 className="section-heading mt-3 text-5xl text-foreground">
              places i send people.
            </h2>
            <div className="mt-10 space-y-0">
              {networkItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-t border-[rgba(41,47,54,0.72)] bg-white/75 px-6 py-8 hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-3xl text-foreground">{item.name}</h3>
                    <span className="archive-chip shrink-0">{item.type}</span>
                  </div>
                  <p className="mt-3 leading-8 text-[rgba(41,47,54,0.74)]">{item.whyItMatters}</p>
                  {item.noteOnInteraction ? (
                    <p className="mt-2 text-sm text-[rgba(41,47,54,0.56)]">{item.noteOnInteraction}</p>
                  ) : null}
                </Link>
              ))}
            </div>

            <div className="relative mt-10 min-h-[10rem] overflow-hidden border border-[rgba(41,47,54,0.14)]">
              <Image
                src="/blueprint2.jpeg"
                alt="Blueprint technical drawing"
                fill
                className="object-cover object-center opacity-55"
                sizes="(min-width: 1024px) 30vw, 100vw"
              />
              <div className="absolute inset-0 bg-[rgba(255,248,241,0.35)]" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
