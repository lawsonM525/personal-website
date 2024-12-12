import { TimelineItem } from "./timeline-item"

interface TimelineProps {
  items: Array<{
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
  }>
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="relative space-y-12">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
        {items.map((item, index) => (
          <TimelineItem key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

