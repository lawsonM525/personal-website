"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ArrowLeft, FileText, FolderOpen, Grid2X2, Search } from "lucide-react"
import { HomeHeader, WindowBar } from "./home-desktop"

const routeTitles: Record<string, string> = {
  "/about": "About Michelle", "/resources": "Resources", "/projects": "Projects",
  "/research": "Research", "/talks": "Talks", "/posts": "Posts", "/reminder": "Reminder",
  "/learn": "Learn", "/learn/how-to-build-ai-wardrobe-digital-closet": "How to Build Your Own AI Wardrobe",
  "/learn/submit": "Submit an article",
  "/girly-guide-to-ai": "The Girly Guide to AI",
  "/projects/rag-in-practice": "RAG in Practice", "/projects/delta-stock-pitch": "Delta stock pitch", "/10apps": "10 Apps in 10 Weeks",
  "/10apps/pagez/updates": "Challenge updates", "/day2tools": "Day 2 Tools",
  "/resources/computer": "Resource desktop", "/resources/computer/toolkit": "Toolkit",
  "/resources/computer/quests": "Quests",

}

export function ComputerPageShell({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const router = useRouter()
  const isGuide = path === "/girly-guide-to-ai"
  const content = useRef<HTMLDivElement>(null)
  const title = routeTitles[path] || (path.startsWith("/learn/") ? "Learn" : "Page")
  const parent = path.startsWith("/10apps/") ? { href:"/10apps", label:"Back to 10 Apps" } : path.startsWith("/projects/") || path === "/10apps" ? { href:"/projects", label:"Back to projects" } : path.startsWith("/learn/") || path === "/girly-guide-to-ai" ? { href:"/learn", label:"Back to Learn" } : { href:"/?desktop=1", label:"Michelle’s Computer" }
  const [minimized, setMinimized] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const [time, setTime] = useState("")
  useEffect(() => { setMinimized(false); setMaximized(false) }, [path])
  useEffect(() => {
    function tick() { setTime(new Intl.DateTimeFormat(undefined, {hour:"numeric", minute:"2-digit"}).format(new Date())) }
    tick(); const timer = setInterval(tick, 60000); return () => clearInterval(timer)
  }, [])
  const readingPosition = useRef(0)
  function minimize() { readingPosition.current = isGuide ? content.current?.scrollTop || 0 : window.scrollY; setMinimized(true) }
  function restore() { if (minimized) { setMinimized(false); requestAnimationFrame(() => { const viewport = isGuide ? content.current : window; viewport?.scrollTo({ top: readingPosition.current, behavior: "instant" }) }) } }
  function search() { window.dispatchEvent(new Event("michelle:search")) }

  return <div className="computer-desktop-page" data-contained-reader={isGuide ? "guide" : undefined}>
    <a className="computer-skip" href="#computer-page-content">Skip to content</a>
    <HomeHeader />
    <div className="computer-page-workspace">
      {minimized && <button type="button" className="computer-restore" data-computer-sound="open" onClick={restore}><FileText size={19} />Open {title}</button>}
      <section data-computer-window hidden={minimized} className={`computer-page-window${maximized ? " computer-page-window-maximized" : ""}`} aria-label={`${title} window`}>
        <WindowBar title={title} onMinimize={minimize} onMaximize={() => setMaximized(value => !value)} onClose={() => router.push("/?desktop=1")} maximized={maximized} />
        {!path.startsWith("/learn") && path !== "/girly-guide-to-ai" && <nav className="computer-page-toolbar" aria-label="Window navigation"><Link href={parent.href}><ArrowLeft size={13} />{parent.label}</Link><span>{title}</span><button type="button" data-computer-sound="open" onClick={search}><Search size={13} />Find a page</button></nav>}
        <div ref={content} id="computer-page-content" className="computer-page-content" data-page={path} data-guide-scroll-viewport={isGuide ? "" : undefined} tabIndex={isGuide ? 0 : undefined} role={isGuide ? "region" : undefined} aria-label={isGuide ? "Book reading area" : undefined}>{children}</div>
      </section>
    </div>
    <div className="computer-page-taskbar" role="toolbar" aria-label="Desktop controls"><button type="button" className="computer-mobile-desktop" onClick={() => router.push("/?desktop=1")} aria-label="Show desktop"><Grid2X2 size={18}/><span>Desktop</span></button><button type="button" className="computer-page-explore" aria-label="Open Explorer" data-computer-sound="open" onClick={() => router.push("/explore")}><FolderOpen size={17} /><span>Explore</span></button><button type="button" className="computer-page-task" data-computer-sound="open" aria-pressed={!minimized} onClick={restore}><FileText size={16} /><span>{title}</span></button><time>{time || "—"}</time></div>
  </div>
}
