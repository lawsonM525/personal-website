"use client"

import Image from "next/image"
import { HandwrittenText } from "./handwritten-text"
import { PostPopup } from "./post-popup"
import { useState } from "react"

interface TimelineItemProps {
  type: "highlight" | "post" | "note"
  date: string
  title?: string
  description?: string
  content?: string
  media?: {
    type: "gif" | "post"
    url: string
    alt: string
  }
  handwritten?: boolean
}

export function TimelineItem({
  type,
  date,
  title,
  description,
  content,
  media,
  handwritten
}: TimelineItemProps) {
  const [showPost, setShowPost] = useState(false)

  if (type === "note") {
    return (
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <div className="text-right text-gray-400">{date}</div>
        <div className="w-3 h-3 rounded-full bg-white/20" />
        <div className="bg-gray-900/50 rounded-lg p-6">
          <HandwrittenText className="text-gray-300">
            {content}
          </HandwrittenText>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-start">
      <div className="text-right text-gray-400">{date}</div>
      <div className="w-3 h-3 rounded-full bg-white/20" />
      <div className="space-y-4">
        {handwritten ? (
          <HandwrittenText className="text-2xl text-white">{title}</HandwrittenText>
        ) : (
          <h3 className="text-2xl font-serif text-white">{title}</h3>
        )}
        <p className="text-gray-400">{description}</p>
        {media && (
          <div className="relative aspect-video rounded-lg overflow-hidden">
            {media.type === "gif" ? (
              <Image
                src={media.url}
                alt={media.alt}
                fill
                className="object-cover"
              />
            ) : (
              <>
                <div 
                  className="relative aspect-video cursor-pointer"
                  onClick={() => setShowPost(true)}
                >
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt={media.alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white">View Post</span>
                  </div>
                </div>
                {showPost && (
                  <PostPopup
                    id="1"
                    link={media.url}
                    type="instagram"
                    onClose={() => setShowPost(false)}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

