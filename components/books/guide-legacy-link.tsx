"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { aiGuideReaderPath } from "@/lib/ai-guide"

export function GuideLegacyLink({ chapterIds }: { chapterIds: string[] }) {
  const router = useRouter()
  useEffect(() => {
    function openReader() {
      const hash = window.location.hash
      if (hash === "#guide-preview-start" || chapterIds.some(id => hash === `#guide-${id}` || hash === `#guide-preview-${id}`)) router.replace(`${aiGuideReaderPath}${hash}`)
    }
    openReader(); window.addEventListener("hashchange", openReader)
    return () => window.removeEventListener("hashchange", openReader)
  }, [chapterIds, router])
  return null
}
