"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { ArrowLeft, Grid2X2, Search } from "lucide-react"
import { HomeHeader } from "@/components/homepage/home-desktop"
import { WindowBar } from "@/components/homepage/window-bar"
import { ExplorerIcon, type ExplorerIconKind } from "./explorer-icon"
import { Paint } from "./paint"
import { Minesweeper } from "./minesweeper"
import { Terminal } from "./terminal"
import homeStyles from "@/components/homepage/home.module.css"
import styles from "./explore.module.css"

type AppId = "paint" | "minesweeper" | "terminal"
type Item = { name: string; description: string; group: string; icon: ExplorerIconKind; app?: AppId; href?: string }
const apps: AppId[] = ["paint", "minesweeper", "terminal"]
const appTitles: Record<AppId, string> = { paint: "Paint", minesweeper: "Minesweeper", terminal: "Terminal" }
const items: Item[] = [
  { name: "Paint", description: "Make a mess with stickers, glitter, and rainbow brushes.", group: "Programs", icon: "paint", app: "paint" },
  { name: "Minesweeper", description: "A little game of logic. Six hidden mines.", group: "Programs", icon: "minesweeper", app: "minesweeper" },
  { name: "Terminal", description: "Type commands to explore the computer.", group: "Programs", icon: "terminal", app: "terminal" },
  { name: "Learn", description: "Articles and practical guides.", group: "Files & folders", icon: "paper", href: "/learn" },
  { name: "Michelle’s finds", description: "Favorite AI projects and posts that made Michelle go whoa.", group: "Files & folders", icon: "folder", href: "/learn/you-wont-believe-this-was-made-with-ai" },
  { name: "Girly Guide to AI", description: "Read Michelle’s illustrated guide to artificial intelligence.", group: "Files & folders", icon: "magazine", href: "/girly-guide-to-ai" },
  { name: "Projects", description: "Things Michelle has built.", group: "Files & folders", icon: "folder", href: "/projects" },
  { name: "Research", description: "Published papers and research.", group: "Files & folders", icon: "paper", href: "/research" },
  { name: "Posts", description: "Posts from Michelle’s Computer.", group: "Files & folders", icon: "folder", href: "/posts" },
  { name: "10 Apps in 10 Weeks", description: "Explore the app-building challenge.", group: "Files & folders", icon: "folder", href: "/10apps" },
  { name: "Magazine", description: "Find out more and join the waitlist.", group: "Keep in touch", icon: "magazine", href: "/magazine" },
  { name: "Pen pals", description: "Stay in touch by letter or email.", group: "Keep in touch", icon: "penpals", href: "/penpals" },
  { name: "Submit an article", description: "Send an article or draft for Learn.", group: "Keep in touch", icon: "paper", href: "/learn/submit" },
]

export default function Explorer() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [group, setGroup] = useState("All files")
  const [visited, setVisited] = useState<AppId[]>([])
  const [open, setOpen] = useState<AppId[]>([])
  const [minimized, setMinimized] = useState<AppId[]>([])
  const [active, setActive] = useState<AppId | null>(null)
  const [maximized, setMaximized] = useState<AppId | "explorer" | null>(null)
  const [explorerMinimized, setExplorerMinimized] = useState(false)
  const [time, setTime] = useState("")
  const pane = useRef<HTMLElement>(null)
  function openApp(id: AppId) {
    setVisited(previous => previous.includes(id) ? previous : [...previous, id])
    setOpen(previous => [...previous.filter(value => value !== id), id])
    setMinimized(previous => previous.filter(value => value !== id)); setActive(id)
  }
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("app")
    if (apps.includes(id as AppId)) openApp(id as AppId)
    function tick() { setTime(new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date())) }
    tick(); const timer = setInterval(tick, 60000); return () => clearInterval(timer)
  }, [])
  useEffect(() => { if (active) pane.current?.querySelector<HTMLElement>(`[data-app="${active}"] [data-window-drag-handle]`)?.focus({ preventScroll: true }) }, [active])
  function desktop() { router.push("/?desktop=1") }
  function explorer() { setExplorerMinimized(false); setActive(null) }
  function closeApp(id: AppId) { setOpen(previous => previous.filter(value => value !== id)); setMinimized(previous => previous.filter(value => value !== id)); if (maximized === id) setMaximized(null); explorer() }
  const filtered = items.filter(item => (group === "All files" || item.group === group) && `${item.name} ${item.description}`.toLowerCase().includes(query.trim().toLowerCase()))

  return <div className={`${homeStyles.site} ${styles.desktop}`}>
    <a className={homeStyles.skip} href="#explorer-content">Skip to content</a>
    <HomeHeader />
    <main ref={pane} id="explorer-content" className={styles.workspace} data-active-app={active || "explorer"}>
      {explorerMinimized && <button className={styles.restore} type="button" onClick={explorer}><ExplorerIcon kind="folder" size={24} />Open Explorer</button>}
      <section data-computer-window hidden={explorerMinimized} className={`${styles.explorerWindow} ${active ? styles.inactiveExplorer : ""} ${maximized === "explorer" ? styles.maximized : ""}`} aria-label="Explorer window" style={{ zIndex: active === null ? 30 : 1 }} onPointerDown={() => setActive(null)} onFocusCapture={() => setActive(null)}>
        <WindowBar title="Explorer" icon={<ExplorerIcon kind="folder" size={18} />} onMinimize={() => setExplorerMinimized(true)} onMaximize={() => setMaximized(value => value === "explorer" ? null : "explorer")} maximized={maximized === "explorer"} onClose={desktop} />
        <div className={styles.addressBar}><Link href="/?desktop=1"><ArrowLeft size={15} />My computer</Link><span>C:\MICHELLE\</span></div>
        <div className={styles.fileBrowser}>
          <nav className={styles.sidebar} aria-label="Explorer folders">{["All files", "Programs", "Files & folders", "Keep in touch"].map(folder => <button key={folder} type="button" aria-label={folder} aria-current={group === folder ? "page" : undefined} onClick={() => { setGroup(folder); setQuery("") }}><ExplorerIcon kind={folder === "Programs" ? "terminal" : folder === "Keep in touch" ? "penpals" : "folder"} size={22} /><span className={styles.folderLabel}>{folder}</span><span className={styles.mobileFolderLabel}>{{ "All files": "All", "Programs": "Play", "Files & folders": "Read", "Keep in touch": "Connect" }[folder]}</span></button>)}</nav>
          <div className={styles.files}>
            <div className={styles.fileHeading}><h1>{group}</h1><label><Search size={15} /><span className={homeStyles.srOnly}>Search this computer</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find something…" /></label></div>
            {["Programs", "Files & folders", "Keep in touch"].map(section => {
              const entries = filtered.filter(item => item.group === section)
              return entries.length ? <section key={section} className={styles.fileGroup} aria-label={section}><h2>{section}</h2><div className={styles.fileGrid}>{entries.map(item => {
                const inside = <><ExplorerIcon kind={item.icon} /><strong>{item.name}</strong><span className={homeStyles.srOnly}>{item.description}</span></>
                return item.app ? <button type="button" key={item.name} title={item.description} data-computer-sound="open" onClick={() => openApp(item.app!)}>{inside}</button> : <Link key={item.name} title={item.description} href={item.href!}>{inside}</Link>
              })}</div></section> : null
            })}
            {!filtered.length && <p className={styles.noResults}>No files found. <button type="button" onClick={() => { setQuery(""); setGroup("All files") }}>Show everything</button></p>}
          </div>
        </div>
        <div className={styles.statusBar}>{filtered.length} items<span>Select to open</span></div>
      </section>
      {visited.map(id => <section data-computer-window data-app={id} key={id} hidden={!open.includes(id) || minimized.includes(id)} className={`${styles.appWindow} ${id === "paint" ? styles.paintWindow : ""} ${active === id ? styles.activeApp : ""} ${maximized === id ? styles.maximized : ""}`} aria-label={`${appTitles[id]} window`} onPointerDown={() => setActive(id)} onFocusCapture={() => setActive(id)} style={{ zIndex: active === id ? 40 : 3 + open.indexOf(id) }}>
        <WindowBar title={appTitles[id]} icon={<ExplorerIcon kind={id} size={18} />} onMinimize={() => { setMinimized(previous => [...previous, id]); explorer() }} onMaximize={() => setMaximized(value => value === id ? null : id)} maximized={maximized === id} onClose={() => closeApp(id)} />
        <div className={styles.appBody}><button type="button" className={styles.backToExplorer} onClick={explorer}><ArrowLeft size={14} />Back to Explorer</button>{id === "paint" ? <Paint /> : id === "minesweeper" ? <Minesweeper /> : <Terminal openApp={openApp} />}</div>
      </section>)}
    </main>
    <div className={styles.taskbar} role="toolbar" aria-label="Desktop controls"><button type="button" className={styles.mobileDesktopButton} onClick={desktop} aria-label="Show desktop"><Grid2X2 size={20}/><span>Desktop</span></button><button type="button" className={styles.exploreButton} aria-pressed={active === null && !explorerMinimized} onClick={explorer}><ExplorerIcon kind="folder" size={22} />Explore</button>{open.map(id => <button type="button" key={id} aria-pressed={active === id && !minimized.includes(id)} onClick={() => openApp(id)}><ExplorerIcon kind={id} size={20} /><span>{appTitles[id]}</span></button>)}<time>{time || "—"}</time></div>
  </div>
}
