"use client"

import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye, Heart, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

interface PostPopupProps {
  id: string
  link: string
  type: string
  onClose: () => void
}

export function PostPopup({ id, link, type, onClose }: PostPopupProps) {
  const [post, setPost] = useState({
    image: "/placeholder.svg?height=600&width=600",
    description: "",
    date: "",
  })

  useEffect(() => {
    async function fetchPostDetails() {
      try {
        const response = await fetch(`/api/post-details?id=${id}`)
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error("Failed to fetch post details:", error)
      }
    }

    fetchPostDetails()
  }, [id])

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1015px] bg-[#262626] p-0 gap-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative aspect-square md:w-[600px]">
            {type === 'tiktok' ? (
              <iframe
                src={`https://www.tiktok.com/embed/v2/${id}`}
                className="absolute top-0 left-0 w-full h-full"
                allowFullScreen
              />
            ) : (
              <Image
                src={post.image}
                alt="Post"
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="p-6 md:w-[415px] flex flex-col bg-[#121212]">
            <div className="flex-1">
              <p className="text-white mb-4">{post.description}</p>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <time dateTime={post.date}>{post.date}</time>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(link, '_blank')}
                className="bg-[#262626] text-white border-gray-700 hover:bg-[#363636]"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Original
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

