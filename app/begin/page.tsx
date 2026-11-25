import { buildPageMetadata } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "Begin",
  description: "Pitch deck proposals by Michelle Lawson.",
  path: "/begin",
  imageEyebrow: "MICHELLE LAWSON · PARTNERSHIPS",
})

export default function BeginPage() {
  return <main className="min-h-screen bg-black" aria-hidden="true" />
}
