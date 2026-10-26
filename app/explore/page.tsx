import type { Metadata } from "next"
import Explorer from "@/components/explore/explorer"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({ title: "Explore Michelle’s Computer", description: "Open the folders, try Paint, play Minesweeper, or explore Michelle’s Computer through the terminal.", path: "/explore" })
export default function ExplorePage() { return <Explorer /> }
