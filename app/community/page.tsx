import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { EditorialArt } from "@/components/editorial-art"
import { networkItems } from "@/data/editorial-content"

export default function CommunityPage() {
  return (
    <main className="editorial-shell">
      {/* Header */}
      <section className="page-frame">
        <div className="grid gap-0 border-b border-[rgba(41,47,54,0.72)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-r border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
            <p className="section-kicker">Community</p>
            <h1 className="section-heading mt-3 text-[4rem] leading-[0.93] text-foreground sm:text-[5rem] lg:text-[5.5rem]">
              people have been here. more are coming.
            </h1>
            <p className="mt-6 max-w-[34rem] text-[1.06rem] leading-9 text-[rgba(41,47,54,0.74)]">
              a guestbook, a network of people i think you should know, and a public sense that this site belongs to more than just me.
            </p>
          </div>
          <div className="relative min-h-[28rem] overflow-hidden border-t border-[rgba(41,47,54,0.72)] lg:border-l lg:border-t-0">
            <Image
              src="/missed-u-forum.jpeg"
              alt="We missed you — retro computer screen"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* Guestbook + neighbors */}
      <section className="page-frame">
        <div className="grid gap-0 border-b border-[rgba(41,47,54,0.72)] lg:grid-cols-[0.88fr_1.12fr]">
          {/* Guestbook */}
          <div className="border-r border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
            <p className="section-kicker">Guestbook</p>
            <h2 className="section-heading mt-3 text-5xl text-foreground">
              leave a note.
            </h2>
            <p className="mt-6 leading-9 text-[rgba(41,47,54,0.74)]">
              you've been here. say something. drop your name, a thought, a link — anything. the guestbook is coming soon and it will be worth it.
            </p>

            {/* Placeholder form — wired soon */}
            <div className="mt-10 space-y-0 border border-[rgba(41,47,54,0.72)]">
              <div className="border-b border-[rgba(41,47,54,0.72)] px-6 py-4">
                <p className="meta-text text-[rgba(41,47,54,0.52)]">Name</p>
                <div className="mt-2 h-10 bg-white/50" />
              </div>
              <div className="border-b border-[rgba(41,47,54,0.72)] px-6 py-4">
                <p className="meta-text text-[rgba(41,47,54,0.52)]">Your note</p>
                <div className="mt-2 h-20 bg-white/50" />
              </div>
              <div className="px-6 py-4">
                <span className="archive-chip opacity-60">submit — coming soon</span>
              </div>
            </div>
          </div>

          {/* Internet neighbors */}
          <div className="p-10 sm:p-12 lg:p-16">
            <p className="section-kicker">Internet neighbors</p>
            <h2 className="section-heading mt-3 text-5xl text-foreground">
              people and labs i'd send you to.
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
                  <p className="mt-3 leading-8 text-[rgba(41,47,54,0.76)]">{item.whyItMatters}</p>
                  {item.noteOnInteraction ? (
                    <p className="mt-2 text-sm text-[rgba(41,47,54,0.56)]">{item.noteOnInteraction}</p>
                  ) : null}
                </Link>
              ))}
              <div className="border-t border-[rgba(41,47,54,0.72)]" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
