"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ArrowLeft, FileText, Search } from "lucide-react"
import { HomeHeader, WindowBar } from "./home-desktop"

const routeTitles: Record<string, string> = {
  "/about": "About Michelle", "/resources": "Resources", "/projects": "Projects",
  "/research": "Research", "/talks": "Talks", "/posts": "Posts", "/reminder": "Reminder",
  "/learn": "Learn", "/learn/how-to-build-ai-wardrobe-digital-closet": "How to Build Your Own AI Wardrobe",
  "/projects/rag-in-practice": "RAG in Practice", "/projects/delta-stock-pitch": "Delta stock pitch", "/10apps": "10 Apps in 10 Weeks",
  "/10apps/pagez/updates": "Challenge updates", "/day2tools": "Day 2 Tools",
  "/resources/computer": "Resource desktop", "/resources/computer/toolkit": "Toolkit",
  "/resources/computer/quests": "Quests",

}

export function ComputerPageShell({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const router = useRouter()
  const title = routeTitles[path] || (path.startsWith("/learn/") ? "Learn" : "Page")
  const parent = path.startsWith("/10apps/") ? { href:"/10apps", label:"Back to 10 Apps" } : path.startsWith("/projects/") || path === "/10apps" ? { href:"/projects", label:"Back to projects" } : path.startsWith("/learn/") ? { href:"/learn", label:"Back to Learn" } : { href:"/", label:"Michelle’s Computer" }
  const [minimized, setMinimized] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const [time, setTime] = useState("")
  useEffect(() => { setMinimized(false); setMaximized(false) }, [path])
  useEffect(() => {
    function tick() { setTime(new Intl.DateTimeFormat(undefined, {hour:"numeric", minute:"2-digit"}).format(new Date())) }
    tick(); const timer = setInterval(tick, 60000); return () => clearInterval(timer)
  }, [])
  function restore() { setMinimized(false) }
  function search() { window.dispatchEvent(new Event("michelle:search")) }

  return <div className="computer-desktop-page">
    <a className="computer-skip" href="#computer-page-content">Skip to content</a>
    <HomeHeader />
    <div className="computer-page-workspace">
      {minimized && <button type="button" className="computer-restore" onClick={restore}><FileText size={19} />Open {title}</button>}
      <section data-computer-window hidden={minimized} className={`computer-page-window${maximized ? " computer-page-window-maximized" : ""}`} aria-label={`${title} window`}>
        <WindowBar title={title} onMinimize={() => setMinimized(true)} onMaximize={() => setMaximized(value => !value)} onClose={() => router.push(parent.href)} maximized={maximized} />
        {!path.startsWith("/learn") && <nav className="computer-page-toolbar" aria-label="Window navigation"><Link href={parent.href}><ArrowLeft size={13} />{parent.label}</Link><span>{title}</span><button type="button" onClick={search}><Search size={13} />Find a page</button></nav>}
        <div id="computer-page-content" className="computer-page-content" data-page={path}>{children}</div>
      </section>
    </div>
    <div className="computer-page-taskbar" role="toolbar" aria-label="Desktop controls"><button type="button" onClick={search}><Search size={17} /><span>Explore</span></button><button type="button" aria-pressed={!minimized} onClick={restore}><FileText size={16} /><span>{title}</span></button><time>{time || "—"}</time></div>
  </div>
}
