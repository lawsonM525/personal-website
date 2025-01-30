"use client"

import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye, Heart, MessageCircle, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface PostPopupProps {
  post: {
    id: string
    platform: "LinkedIn" | "Instagram" | "TikTok"
    description: string
    media: Array<{ url: string; type: "image" | "video" }>
    stats: {
      likes: number
      views?: number
      comments: number
    }
    originalLink: string
    tags: string[]
    date: string
  }
  onClose: () => void
  onNext?: () => void
  onPrevious?: () => void
}

export function PostPopup({ post, onClose, onNext, onPrevious }: PostPopupProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const currentMedia = post.media[currentMediaIndex]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1015px] bg-[#262626] p-0 gap-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative aspect-square md:w-[600px]">
            {/* Media Navigation */}
            {post.media.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentMediaIndex(i => Math.max(0, i - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-1 rounded-full"
                  disabled={currentMediaIndex === 0}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() => setCurrentMediaIndex(i => Math.min(post.media.length - 1, i + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-1 rounded-full"
                  disabled={currentMediaIndex === post.media.length - 1}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* Media Display */}
            {currentMedia.type === 'video' ? (
              <iframe
                src={currentMedia.url}
                className="absolute top-0 left-0 w-full h-full"
                allowFullScreen
              />
            ) : (
              <Image
                src={currentMedia.url}
                alt={post.description}
                fill
                className="object-cover"
              />
            )}

            {/* Post Navigation */}
            {onPrevious && (
              <button
                onClick={onPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full transform -translate-x-full"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
            )}
            {onNext && (
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full transform translate-x-full"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            )}
          </div>

          <div className="p-6 md:w-[415px] flex flex-col bg-[#121212]">
            <div className="flex-1">
              <Badge className="mb-4" variant="outline">
                {post.platform}
              </Badge>
              <p className="text-white mb-4">{post.description}</p>
              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-1 text-gray-400">
                  <Heart className="w-4 h-4" />
                  <span>{post.stats.likes}</span>
                </div>
                {post.stats.views && (
                  <div className="flex items-center gap-1 text-gray-400">
                    <Eye className="w-4 h-4" />
                    <span>{post.stats.views}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-gray-400">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.stats.comments}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <time dateTime={post.date}>{post.date}</time>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(post.originalLink, '_blank')}
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

