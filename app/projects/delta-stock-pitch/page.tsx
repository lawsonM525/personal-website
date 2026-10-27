import { buildPageMetadata } from "@/lib/seo"
import { ProjectPdfReader } from "@/components/project-pdf-reader"
import { Download, ExternalLink } from "lucide-react"

export const metadata = buildPageMetadata({ title:"Delta Air Lines stock pitch", description:"Michelle Lawson’s Delta Air Lines stock pitch from the Smith College Stock Pitch Competition, April 2023.", path:"/projects/delta-stock-pitch" })
const pdf = "/projects/delta-stock-pitch/delta-stock-pitch.pdf"
export default function DeltaStockPitch() {
  return <main className="project-pdf-page"><header><p className="article-eyebrow">Smith College Stock Pitch Competition · April 2023</p><h1>Delta Air Lines<br/>stock pitch</h1><p>Isobel Hamilton, Michelle Lawson, Xiaoxiao Li, Nermine Mokdad, Selena Zheng</p><div className="project-pdf-actions"><a href={pdf} download="Delta-Air-Lines-Stock-Pitch.pdf"><Download size={16} aria-hidden="true"/>Download PDF</a><a href={pdf} target="_blank" rel="noopener noreferrer">Open PDF <ExternalLink size={14} aria-hidden="true"/></a></div></header><ProjectPdfReader /><p className="project-pdf-note">19 pages · Original presentation from April 2023</p></main>
}
