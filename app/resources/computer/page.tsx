import type { Metadata } from "next"
import { ComputerClient } from "./computer-client"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Michelle's Computer — Resources",
  description: "A desktop-style resource hub for tools, quests, and learning paths.",
  path: "/resources/computer",
  imageEyebrow: "MICHELLE'S COMPUTER · RESOURCES",
})

export default function MichellesComputerPage() {
  return <ComputerClient />
}
