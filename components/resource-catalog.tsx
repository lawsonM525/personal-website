import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { ReactNode } from "react"

export function ResourceSection({ title, emoji, children, borderColor = "blue" }: { title: string; emoji: string; children: ReactNode; textColor?: string; borderColor?: string }) {
  return <section className="computer-resource-section" data-accent={borderColor}><header><span aria-hidden="true">{emoji}</span><h2>{title}</h2></header><div>{children}</div></section>
}

export function ResourceCard({ title, description, link, isNew, isHot, isBeta, cta = "enter site" }: { title: string; description: string; link: string; isNew?: boolean; isHot?: boolean; isBeta?: boolean; cta?: string }) {
  const external = link.startsWith("http")
  return <article className="computer-resource-card"><div className="computer-resource-card-heading"><h3>{title}</h3><span>{isBeta && <small>BETA</small>}{isNew && <small>NEW!</small>}{isHot && <small>HOT!</small>}</span></div><p>{description}</p><Link href={link} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{cta}<ArrowUpRight size={15} aria-hidden="true" /></Link></article>
}
