import type { Metadata } from "next"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "RAG in Practice — Michelle Lawson",
  description:
    "A visual guide to retrieval-augmented generation, the math behind it, and how Michelle used RAG to build Future U.",
  path: "/projects/rag-in-practice",
  imageEyebrow: "PROJECTS · RAG IN PRACTICE",
})

export default function RagInPracticeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
