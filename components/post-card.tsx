import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Eye, MessageSquare } from 'lucide-react'

interface PostCardProps {
  title: string
  description: string
  image: string
  date: string
  views: number
  comments: number
  tags: string[]
}

export function PostCard({
  title,
  description,
  image,
  date,
  views,
  comments,
  tags,
}: PostCardProps) {
  return (
    <Card className="overflow-hidden bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">
      <div className="aspect-video relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-gray-800 text-gray-300 hover:bg-gray-700"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {views}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              {comments}
            </span>
          </div>
          <time dateTime={date}>{date}</time>
        </div>
      </div>
    </Card>
  )
}

