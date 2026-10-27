import { buildPageMetadata } from "@/lib/seo"
export const metadata = buildPageMetadata({ title: "RAG in Practice", description: "Michelle Lawson explains retrieval-augmented generation and the research and implementation behind Future U.", path: "/projects/rag-in-practice" })
export default function RagLayout({ children }: { children: React.ReactNode }) { return children }
