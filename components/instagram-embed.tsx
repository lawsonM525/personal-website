"use client"

import Script from "next/script"
import { useEffect, useRef } from "react"

declare global {
  interface Window {
    instgrm?: {
      Embeds: { process(): void }
    }
  }
}

const reels = [
  { url: "https://www.instagram.com/reel/DRc05k3Epk3/", shortcode: "DRc05k3Epk3" },
  { url: "https://www.instagram.com/reel/DWC_I1IDURZ/", shortcode: "DWC_I1IDURZ" },
  { url: "https://www.instagram.com/reel/DTMOFypD7Ya/", shortcode: "DTMOFypD7Ya" },
  { url: "https://www.instagram.com/reel/DSm0pFcFXkc/", shortcode: "DSm0pFcFXkc" },
  { url: "https://www.instagram.com/reel/DP07pJ1kTNO/", shortcode: "DP07pJ1kTNO" },
]

function SingleEmbed({ url, shortcode }: { url: string; shortcode: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Re-process any time this mounts (handles dynamic renders)
    if (window.instgrm) {
      window.instgrm.Embeds.process()
    }
  }, [])

  return (
    <div ref={ref} className="w-full">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        data-instgrm-captioned
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: 0,
          boxShadow: "none",
          display: "block",
          margin: 0,
          maxWidth: "100%",
          minWidth: 0,
          padding: 0,
          width: "100%",
        }}
      >
        {/* Styled fallback — shows while embed loads or if blocked locally */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block no-underline"
        >
          <div className="flex min-h-[18rem] flex-col items-center justify-center gap-5 border border-[rgba(41,47,54,0.12)] bg-[rgba(255,248,241,0.9)] p-8 text-center transition-colors hover:bg-white">
            {/* Instagram gradient ring */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full p-0.5"
              style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}>
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="url(#ig-grad)" strokeWidth="1.5">
                  <defs>
                    <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f09433" />
                      <stop offset="50%" stopColor="#dc2743" />
                      <stop offset="100%" stopColor="#bc1888" />
                    </linearGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="url(#ig-grad)" stroke="none" />
                </svg>
              </div>
            </div>
            <div>
              <p className="meta-text text-[rgba(41,47,54,0.52)]">@michellescomputer</p>
              <p className="mt-2 font-serif text-2xl text-foreground">view reel</p>
              <p className="mt-1 text-xs text-[rgba(41,47,54,0.4)]">{shortcode}</p>
            </div>
            <span className="archive-chip group-hover:border-foreground">open on instagram →</span>
          </div>
        </a>
      </blockquote>
    </div>
  )
}

export function InstagramGrid() {
  useEffect(() => {
    const tryProcess = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process()
      }
    }
    // Try immediately, then again after a short delay
    tryProcess()
    const t = setTimeout(tryProcess, 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.instgrm?.Embeds.process()
        }}
      />
      <div className="grid gap-0 border border-[rgba(41,47,54,0.72)] sm:grid-cols-2 lg:grid-cols-3">
        {reels.map((reel, i) => (
          <div
            key={reel.shortcode}
            className={`border-[rgba(41,47,54,0.72)] ${i % 3 !== 2 ? "border-r" : ""} ${i < reels.length - (reels.length % 3 || 3) ? "border-b" : ""}`}
          >
            <SingleEmbed url={reel.url} shortcode={reel.shortcode} />
          </div>
        ))}
      </div>
    </>
  )
}
