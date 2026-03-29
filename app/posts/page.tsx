import Image from "next/image"
import { Footer } from "@/components/footer"
import { writingTracks } from "@/data/editorial-content"
import { InstagramGrid } from "@/components/instagram-embed"

export default function PostsPage() {
  return (
    <main className="editorial-shell">
      {/* Page header — obsessed artist image */}
      <section className="page-frame">
        <div className="grid gap-0 border-b border-[rgba(41,47,54,0.72)] lg:grid-cols-[1fr_1fr]">
          <div className="border-r border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
            <p className="section-kicker" style={{ color: "rgb(255,107,107)" }}>Writing</p>
            <h1 className="section-heading mt-3 text-[4rem] leading-[0.93] text-foreground sm:text-[5rem] lg:text-[5.5rem]">
              words and thoughts and stories and stuff.
            </h1>
            <p className="mt-6 max-w-[34rem] text-[1.06rem] leading-9 text-[rgba(41,47,54,0.74)]">
              They say writing helps you think. So here I am. I personally tend to think a lot more with art, but I thought I'd give writing a shot. Come think with me.
            </p>
          </div>
          <div className="relative min-h-[28rem] overflow-hidden border-t border-[rgba(41,47,54,0.72)] lg:border-l lg:border-t-0">
            <Image
              src="/obsessed artist.jpeg"
              alt="Artist at desk surrounded by drawings"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-[rgba(41,47,54,0.18)]" />
          </div>
        </div>
      </section>

      {/* Writing tracks — editorial cover cards */}
      <section className="page-frame">
        <div className="border-b border-[rgba(41,47,54,0.72)]">
          <div className="p-10 sm:p-12 lg:p-16">
            <p className="section-kicker" style={{ color: "rgb(255,107,107)" }}>Writing</p>
            <h2 className="section-heading mt-3 text-5xl text-foreground">
              "i suck at writing"... so i'm doing it more. enjoy reading, learning, and living with me.
            </h2>
          </div>
          <div className="grid gap-0 border-t border-[rgba(41,47,54,0.72)] lg:grid-cols-2">
            {writingTracks.map((track, i) => (
              <div
                key={track.title}
                className={`relative min-h-[26rem] overflow-hidden ${i % 2 === 0 ? "border-r border-[rgba(41,47,54,0.72)]" : ""} ${i < 2 ? "border-b border-[rgba(41,47,54,0.72)]" : ""}`}
              >
                {track.imageSrc ? (
                  <>
                    <Image
                      src={track.imageSrc}
                      alt={track.imageAlt || track.title}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                    {/* Gradient overlay — dark at bottom for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(41,47,54,0.88)] via-[rgba(41,47,54,0.28)] to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-[rgba(255,248,241,0.9)]" />
                )}

                {/* Number */}
                <div className="absolute left-6 top-6">
                  <span className={`meta-text text-[0.65rem] ${track.imageSrc ? "text-[rgba(255,248,241,0.7)]" : "text-[rgba(41,47,54,0.48)]"}`}>
                    0{i + 1}
                  </span>
                </div>

                {/* Text anchored to bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className={`font-serif text-4xl ${track.imageSrc ? "text-[rgb(255,248,241)]" : "text-foreground"}`}>
                    {track.title}
                  </h3>
                  <p className={`mt-3 leading-8 ${track.imageSrc ? "text-[rgba(255,248,241,0.82)]" : "text-[rgba(41,47,54,0.76)]"}`}>
                    {track.description}
                  </p>
                  <span className={`mt-5 inline-block archive-chip ${track.imageSrc ? "border-[rgba(255,248,241,0.4)] bg-[rgba(255,248,241,0.12)] text-[rgba(255,248,241,0.9)]" : ""}`}>
                    coming soon
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social archive — Instagram embeds */}
      <section className="page-frame">
        <div className="border-b border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
          <p className="section-kicker">Social archive</p>
          <h2 className="section-heading mt-3 text-5xl text-foreground">
            what's already out there.
          </h2>
          <p className="mt-5 max-w-[38rem] leading-8 text-[rgba(41,47,54,0.74)]">
            posts, clips, and things that lived on instagram or tiktok first — archived here so they don't just disappear into the algorithm.
          </p>
          <div className="mt-10">
            <InstagramGrid />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
