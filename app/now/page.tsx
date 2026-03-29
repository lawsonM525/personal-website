import { Footer } from "@/components/footer"
import { EditorialArt } from "@/components/editorial-art"
import { nowItems } from "@/data/editorial-content"

export default function NowPage() {
  return (
    <main className="editorial-shell">
      <section className="page-frame">
        <div className="grid gap-0 border-b border-[rgba(41,47,54,0.72)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-r border-[rgba(41,47,54,0.72)] p-10 sm:p-12 lg:p-16">
            <p className="section-kicker">Now</p>
            <h1 className="section-heading mt-3 text-[4rem] leading-[0.93] text-foreground sm:text-[5rem] lg:text-[5.5rem]">
              what's actually happening right now.
            </h1>
            <p className="mt-6 max-w-[34rem] text-[1.06rem] leading-9 text-[rgba(41,47,54,0.74)]">
              this page changes. it's a snapshot, not a biography. if you want to know what i'm focused on without decoding a whole timeline — this is it.
            </p>
            <p className="mt-6 text-sm text-[rgba(41,47,54,0.48)]">Last updated: March 2026</p>
          </div>

          <div className="relative min-h-[28rem] border-t border-[rgba(41,47,54,0.72)] lg:border-l lg:border-t-0">
            <EditorialArt
              title="Now"
              credit="Art coming soon"
              variant="banner"
              className="absolute inset-0 border-0"
            />
          </div>
        </div>
      </section>

      <section className="page-frame">
        <div className="border-b border-[rgba(41,47,54,0.72)]">
          {nowItems.map((item, i) => (
            <div
              key={item.label}
              className={`grid gap-0 border-b border-[rgba(41,47,54,0.72)] bg-white/75 lg:grid-cols-[14rem_1fr] ${i === nowItems.length - 1 ? "border-b-0" : ""}`}
            >
              <div className="border-b border-[rgba(41,47,54,0.72)] p-8 lg:border-b-0 lg:border-r">
                <p className="meta-text text-[rgba(41,47,54,0.52)]">{item.label}</p>
              </div>
              <div className="p-8">
                <p className="leading-9 text-[rgba(41,47,54,0.8)]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
