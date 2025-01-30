"use client"

import Image, { StaticImageData } from "next/image"
import { Heart, MessageCircle, Play, ExternalLink } from 'lucide-react'
import { useState } from "react"
import { PostPopup } from "./post-popup"

/* Picture imports*/
import afrotech from "@/assets/afrotech-group-pic.jpeg"

interface MediaItem {
  url: string | StaticImageData
  type: "image" | "video"
}

interface PostProps {
  id: string
  platform: "LinkedIn" | "Instagram" | "TikTok"
  description: string
  media: MediaItem[]
  stats: {
    likes: number
    views?: number
    comments: number
  }
  originalLink: string
  tags: string[]
  date: string
}

function PostItem({ post, onPostClick }: { 
  post: PostProps
  onPostClick: (postId: string) => void 
}) {
  const [isHovered, setIsHovered] = useState(false)
  const mainImage = post.media[0].url

  return (
    <div 
      className="relative aspect-square cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPostClick(post.id)}
    >
      <Image
        src={mainImage}
        alt={post.description}
        fill
        className="object-cover"
      />
      {isHovered && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-6">
          {post.media[0].type === "video" && (
            <Play className="absolute top-4 right-4 h-6 w-6 text-white" />
          )}
          <div className="flex items-center gap-1 text-white">
            <Heart className="h-6 w-6 fill-white" />
            <span className="font-semibold">{post.stats.likes}</span>
          </div>
          {post.stats.views && (
            <div className="flex items-center gap-1 text-white">
              <MessageCircle className="h-6 w-6" />
              <span className="font-semibold">{post.stats.views}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const POSTS: PostProps[] = [
  {
    id: "1",
    platform: "LinkedIn",
    description: "🤓 Your startup needs Gen Z—and so do you‼️\n\nThis summer, I was in a residential startup incubator, The Residency, and saw firsthand how tapping into Gen Z can transform a business...",
    media: [
      { url: "https://media.licdn.com/dms/image/v2/D4D22AQHrjg3DCIdKZw/feedshare-shrink_800/feedshare-shrink_800/0/1729188887465?e=1738195200&v=beta&t=a66DClLr6Q9m5rccb5F0IlMM5kDLSHCImJt-yCHxRwo", type: "image" }    ],
    stats: {
      likes: 219,
      comments: 7,
      views: 6846
    },
    originalLink: "https://www.linkedin.com/posts/michelle-o-lawson_disrupt2024-genz-startups-activity-7252743871602851842-OJGG",
    tags: ["GenZ", "startup", "community", "entrepreneurship"],
    date: "2024-03-25"
  },
  {
    id: "2",
    platform: "Instagram",
    description: "bestie, i'm so happy i went to afrotech. not just for the opportunities, but for the people!!! the energy was everything 💛\n\nthere were so many chances to grow, connect, and learn. seeing everyone showing up for themselves and chasing their dreams was so inspiring 🌟\n\n[...]",
    media: [
      { url: afrotech, type: "image" }
    ],
    stats: {
      likes: 789,
      comments: 34
    },
    originalLink: "https://www.instagram.com/p/DC0_X9dxpV1/?img_index=1",
    tags: ["afrotech", "community", "networking", "tech", "diversity"],
    date: "2024-03-15"
  },
  {
    id: "3",
    platform: "TikTok",
    description: "How I built an AI career advisor in 4 weeks 🤖 #coding #tech #ai",
    media: [
      { url: "https://www.tiktok.com/@michellexcomputer/video/embed/7422584400061287723", type: "video" }
    ],
    stats: {
      likes: 10500,
      comments: 230,
      views: 50000
    },
    originalLink: "https://www.tiktok.com/@michellexcomputer/video/123",
    tags: ["coding", "tech", "tutorial"],
    date: "2024-03-10"
  }
]

export function PostGrid({ platform }: { platform?: "LinkedIn" | "Instagram" | "TikTok" }) {
  const [activePostId, setActivePostId] = useState<string | null>(null)
  
  const filteredPosts = platform 
    ? POSTS.filter(post => post.platform === platform)
    : POSTS

  return (
    <>
      <div className="grid grid-cols-3 gap-1">
        {filteredPosts.map((post) => (
          <PostItem 
            key={post.id} 
            post={post} 
            onPostClick={(id) => setActivePostId(id)}
          />
        ))}
      </div>

      {activePostId && (
        <PostPopup
          post={POSTS.find(p => p.id === activePostId)!}
          onClose={() => setActivePostId(null)}
          onNext={() => {
            const currentIndex = POSTS.findIndex(p => p.id === activePostId)
            const nextPost = POSTS[currentIndex + 1]
            if (nextPost) setActivePostId(nextPost.id)
          }}
          onPrevious={() => {
            const currentIndex = POSTS.findIndex(p => p.id === activePostId)
            const prevPost = POSTS[currentIndex - 1]
            if (prevPost) setActivePostId(prevPost.id)
          }}
        />
      )}
    </>
  )
}

