"use client"

import { ExternalLink, Instagram } from "lucide-react"

interface InstagramEmbedProps {
  url: string
  caption?: string
  date?: string
}

export function InstagramEmbed({ url, caption, date }: InstagramEmbedProps) {
  return (
    <article className="group flex min-h-[17rem] flex-col justify-between overflow-hidden border border-gray-800 bg-[#0b0b0b] transition-colors hover:border-gray-600">
      <div className="border-b border-gray-800 bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#515bd4] p-5">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Instagram className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em]">Instagram</span>
          </div>
          {date && <time className="text-xs text-white/80">{date}</time>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-lg font-semibold leading-7 text-white">
          {caption || "Favorite Instagram post"}
        </p>
        <div className="mt-auto pt-6">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-gray-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-black"
          >
            View on Instagram
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  )
}
