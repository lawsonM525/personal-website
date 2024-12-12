"use client"
import Image from "next/image"
import { Play, Heart, Eye } from 'lucide-react'
import { useState, useEffect } from "react"
import { PostPopup } from "./post-popup"

interface PostProps {
  id: string
  link: string
  type: string
  description: string
  date: string
}

function PostItem({ id, link, type, description, date }: PostProps) {
  const [showPopup, setShowPopup] = useState(false)
  const [thumbnailUrl, setThumbnailUrl] = useState("")

  useEffect(() => {
    async function fetchThumbnail() {
      try {
        const response = await fetch(`/api/thumbnail?url=${encodeURIComponent(link)}`)
        const data = await response.json()
        if (data.thumbnailUrl) {
          setThumbnailUrl(data.thumbnailUrl)
        }
      } catch (error) {
        console.error("Failed to fetch thumbnail:", error)
      }
    }

    fetchThumbnail()
  }, [link])

  return (
    <>
      <div 
        className="relative aspect-square group cursor-pointer"
        onClick={() => setShowPopup(true)}
      >
        <Image
          src={thumbnailUrl || "/placeholder.svg?height=600&width=600"}
          alt={description}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white">
          <p className="text-sm text-center px-4">{description}</p>
        </div>
      </div>
      {showPopup && (
        <PostPopup
          id={id}
          link={link}
          type={type}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  )
}

export function PostGrid() {
  const [posts, setPosts] = useState<PostProps[]>([])

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('/data/posts.json')
      const data = await response.json()
      setPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </div>
  )
}

