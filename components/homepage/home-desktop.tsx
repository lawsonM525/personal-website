"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react"
import { ArrowRight, ArrowUpRight, ChevronRight, Clock3, FileText, Folder, Home, Menu, Search, X } from "lucide-react"
import { signupForms } from "./signup-config"
import { SignupWindow } from "./signup-window"
import { WindowBar } from "./window-bar"
import styles from "./home.module.css"

const pages = [
  { label: "Learn", description: "Practical guides for using AI and building projects", href: "/learn", keywords: "guides tutorials ai college career" },
  { label: "Resources", description: "Tools, textbooks, and learning resources", href: "/resources", keywords: "tools books downloads textbook" },
  { label: "Magazine waitlist", description: "Join the waitlist for magazine updates", href: signupForms.magazine.pagePath, keywords: "magazine email signup waitlist" },
  { label: "Pen pals", description: "Leave your mailing details for a handwritten letter", href: signupForms.penpals.pagePath, keywords: "pen pals letter mail address signup" },
  { label: "My story", description: "About Michelle Lawson", href: "/about", keywords: "bio about story michelle" },
  { label: "Projects", description: "What can we build today?", href: "/projects", keywords: "build apps work projects" },
  { label: "Research", description: "Michelle’s published research", href: "/research", keywords: "papers publications research" },
  { label: "Talks", description: "Talks and conference appearances", href: "/talks", keywords: "speaking talks conferences" },
  { label: "Posts", description: "Posts from Michelle’s Computer", href: "/posts", keywords: "instagram social posts" },
  { label: "Reminder", description: "A reminder from Michelle", href: "/reminder", keywords: "reminder" },
  { label: "How to Build Your Own AI Wardrobe", description: "No, you don’t need to know how to code", href: "/learn/how-to-build-ai-wardrobe-digital-closet", keywords: "wardrobe clothes closet ai guide" },
]
const mainLinks = [pages[0], pages[1], pages[5], pages[4], { ...pages[2], label: "Magazine" }, pages[3]]
const desktopShortcuts = [
  { label: "Projects", href: "/projects", image: "/homepage/projects-icon-v2.webp" },
  { label: "Research", href: "/research", image: "/homepage/research-icon-v2.webp" },
  { label: "Talks", href: "/talks", image: "/homepage/talks-icon-v2.webp" },
]

type SignupKind = keyof typeof signupForms

function signupKindFor(href: string): SignupKind | undefined {
  return (Object.keys(signupForms) as SignupKind[]).find(kind => signupForms[kind].pagePath === href)
}

function launchSignup(href: string) {
  const kind = signupKindFor(href)
  if (!kind) return false
  window.dispatchEvent(new CustomEvent("michelle:signup", { detail: kind }))
  return true
}

export function handleSignupLink(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !signupKindFor(href)) return
  event.preventDefault()
  launchSignup(href)
}

export function HomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [signupKind, setSignupKind] = useState<SignupKind | null>(null)
  const [openedSignups, setOpenedSignups] = useState<SignupKind[]>([])
  const signupDialog = useRef<HTMLDialogElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const matches = useMemo(() => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
    return pages.filter(page => words.every(word => `${page.label} ${page.description} ${page.keywords}`.toLowerCase().includes(word)))
  }, [query])

  function showSignup(kind: SignupKind) {
    setSearchOpen(false)
    setMenuOpen(false)
    if (!signupDialog.current?.open) signupDialog.current?.showModal()
    setOpenedSignups(previous => previous.includes(kind) ? previous : [...previous, kind])
    setSignupKind(kind)
  }

  useEffect(() => {
    function keyboard(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearchOpen(value => !value) }
    }
    function openSearch() { setSearchOpen(true) }
    function openSignup(event: Event) {
      const kind = (event as CustomEvent).detail
      if (kind !== "magazine" && kind !== "penpals") return
      showSignup(kind)
    }
    window.addEventListener("michelle:signup", openSignup)
    window.addEventListener("keydown", keyboard)
    window.addEventListener("michelle:search", openSearch)
    return () => { window.removeEventListener("michelle:signup", openSignup); window.removeEventListener("keydown", keyboard); window.removeEventListener("michelle:search", openSearch) }
  }, [])
  useEffect(() => {
    if (searchOpen && !dialog.current?.open) { dialog.current?.showModal(); input.current?.focus() }
    if (!searchOpen && dialog.current?.open) dialog.current?.close()
  }, [searchOpen])
  useEffect(() => {
    if (!signupKind && signupDialog.current?.open) signupDialog.current?.close()
    if (signupKind) signupDialog.current?.querySelector<HTMLElement>(`[data-signup-kind="${signupKind}"] button`)?.focus()
  }, [signupKind])

  return <>
    <header className={styles.header}>
      <Link href="/" className={styles.brand} aria-label="Michelle’s Computer home"><span>Michelle’s Computer</span></Link>
      <nav className={styles.desktopNav} aria-label="Main navigation">{mainLinks.map(item => <a key={item.href} href={item.href} onClick={event => handleSignupLink(event, item.href)}>{item.label}</a>)}</nav>
      <div className={styles.headerActions}>
        <button type="button" className={styles.searchButton} aria-label="Search pages" onClick={() => { setQuery(""); setSearchOpen(true) }}><Search size={17} aria-hidden="true" /><span>Search</span><kbd>⌘ K</kbd></button>
        <button type="button" className={styles.mobileMenuButton} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-site-navigation" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      {menuOpen && <nav id="mobile-site-navigation" className={styles.mobileNav} aria-label="Mobile navigation">{mainLinks.map(item => <a key={item.href} href={item.href} onClick={event => { setMenuOpen(false); handleSignupLink(event, item.href) }}><span>{item.label}</span><ArrowUpRight size={17} aria-hidden="true" /></a>)}<a href="/research">Research</a><a href="/talks">Talks</a><a href="/posts">Posts</a></nav>}
    </header>
    <nav className={styles.mobileQuickLinks} aria-label="Quick navigation">{[pages[0], pages[1], { ...pages[2], label: "Magazine" }, pages[3]].map(item => <a key={item.href} href={item.href} onClick={event => handleSignupLink(event, item.href)}>{item.label}</a>)}</nav>
    <dialog ref={dialog} className={styles.commandDialog} aria-labelledby="command-title" onClose={() => setSearchOpen(false)} onClick={event => { if (event.target === event.currentTarget) setSearchOpen(false) }}>
      <div className={styles.commandInner}>
        <div className={styles.windowBar}><Search size={15} aria-hidden="true" /><h2 id="command-title">Find a page or guide</h2><button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}><X size={16} /></button></div>
        <label className={styles.searchField}><Search size={20} aria-hidden="true" /><input ref={input} value={query} onChange={event => setQuery(event.target.value)} placeholder="Try resources, magazine, pen pals…" aria-label="Search pages and guides" onKeyDown={event => { if (event.key === "Enter" && matches[0] && !launchSignup(matches[0].href)) window.location.assign(matches[0].href) }} /></label>
        <div className={styles.searchResults} aria-live="polite">{matches.length ? matches.map(page => <a href={page.href} key={page.href} onClick={event => handleSignupLink(event, page.href)}><span><strong>{page.label}</strong><small>{page.description}</small></span><ArrowUpRight size={18} aria-hidden="true" /></a>) : <p>No matching pages. Try “learn”, “resources”, or “pen pals”.</p>}</div>
        <div className={styles.commandHint}><span>Enter opens the first result · Tab to choose</span><kbd>esc</kbd></div>
      </div>
    </dialog>
    <dialog ref={signupDialog} className={`${styles.commandDialog} ${styles.signupDialog}`} aria-label={signupKind === "magazine" ? "Magazine waitlist window" : "Pen pals window"} onClose={() => setSignupKind(null)} onClick={event => { if (event.target === event.currentTarget) setSignupKind(null) }}>
      {openedSignups.map(kind => <div key={kind} data-signup-kind={kind} hidden={signupKind !== kind}><SignupWindow kind={kind} onClose={() => setSignupKind(null)} onSwitch={showSignup} /></div>)}
    </dialog>
  </>
}

export { WindowBar } from "./window-bar"

export function SpriteIcon({ kind, className = "" }: { kind: "learn" | "resources" | "magazine" | "penpals"; className?: string }) {
  return <span className={`${styles.sprite} ${styles[`sprite_${kind}`]} ${className}`} aria-hidden="true" />
}

export function HomeFooter() {
  return <footer className={styles.footer}><span>Michelle Lawson</span><span>Inspire. Educate. Create.</span><div><a href="https://www.instagram.com/michellescomputer/">Instagram <ArrowUpRight size={12} aria-hidden="true" /></a><a href="https://github.com/lawsonM525">GitHub <ArrowUpRight size={12} aria-hidden="true" /></a></div></footer>
}

const folders = [
  { kind: "learn" as const, title: "Learn", description: "Practical guides for using AI and building projects.", action: "Read the guides", href: "/learn" },
  { kind: "resources" as const, title: "Resources", description: "Tools, textbooks, and learning resources.", action: "Explore resources", href: "/resources" },
  { kind: "magazine" as const, title: "Magazine", description: "An artsy magazine about AI and learning.", action: "Join the waitlist", href: signupForms.magazine.pagePath },
  { kind: "penpals" as const, title: "Pen pals", description: "Want a handwritten letter from me?", action: "Sign up to be pen pals", href: signupForms.penpals.pagePath },
]

export default function HomeDesktop() {
  const [welcomeOpen, setWelcomeOpen] = useState(true)
  const [maximized, setMaximized] = useState(false)
  const [folderView, setFolderView] = useState<"all" | "learn" | "connect">("all")
  const [time, setTime] = useState("")
  useEffect(() => { function tick() { setTime(new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date())) }; tick(); const timer = setInterval(tick, 60000); return () => clearInterval(timer) }, [])
  const visibleFolders = folders.filter(item => folderView === "all" || (folderView === "learn" ? ["learn", "resources"].includes(item.kind) : ["magazine", "penpals"].includes(item.kind)))

  return <div className={`${styles.site} ${styles.desktopSite}`}>
    <a href="#main" className={styles.skip}>Skip to content</a>
    <HomeHeader />
    <main id="main" className={styles.desktop}>
      <nav className={styles.desktopShortcuts} aria-label="Desktop shortcuts">{desktopShortcuts.map(item => <a key={item.href} href={item.href} onClick={event => handleSignupLink(event, item.href)}><img className={styles.shortcutArt} src={item.image} width="68" height="68" alt="" aria-hidden="true" decoding="async" /><span>{item.label}</span></a>)}</nav>
      <div className={`${styles.workspace} ${maximized ? styles.workspaceMaximized : ""}`}>
        {welcomeOpen ? <section className={`${styles.window} ${styles.welcomeWindow}`} aria-labelledby="home-title">
          <WindowBar title="welcome.exe" onMinimize={() => { setWelcomeOpen(false); setMaximized(false) }} onMaximize={() => setMaximized(value => !value)} onClose={() => { setWelcomeOpen(false); setMaximized(false) }} maximized={maximized} />
          <div className={styles.windowMenu}><a href="/about">About Michelle</a><a href="/resources">Resources</a><button type="button" onClick={() => window.dispatchEvent(new Event("michelle:search"))}>Find a page</button><span className={styles.windowPath}>Michelle’s Computer / Welcome</span></div>
          <div className={styles.heroBody}>
            <div className={styles.heroCopy}>
              <h1 id="home-title"><span className={styles.welcomeKicker}>Welcome to</span><span className={styles.srOnly}> Michelle’s Computer</span><img src="/homepage/welcome-title-v3.png" alt="" width="656" height="234" fetchPriority="high" /></h1>
              <p className={styles.tagline}>Turning my ideas, and yours,<br className={styles.desktopBreak} /> into reality.</p>
              <div className={styles.heroActions}><a href="/resources" className={styles.button}>Explore resources <ArrowRight size={21} aria-hidden="true" /></a><a href="/about" className={styles.textLink}>My story <ArrowUpRight size={16} aria-hidden="true" /></a></div>
            </div>
            <a className={styles.profile} href="/about" aria-label="Meet Michelle Lawson"><img src="/homepage/michelle-profile-v3.jpg" width="1244" height="1244" alt="Michelle smiling at her computer in her pink scarf and glasses" fetchPriority="high" /><span>Michelle Lawson <ArrowUpRight size={14} aria-hidden="true" /></span></a>
          </div>
          <div className={styles.statusBar}><span>I love building things that inspire and educate.</span><span className={styles.resizeGrip} aria-hidden="true" /></div>
        </section> : <button className={`${styles.window} ${styles.restoreWelcome}`} type="button" onClick={() => setWelcomeOpen(true)}><FileText size={19} aria-hidden="true" /><span>Open welcome.exe</span><ChevronRight size={18} aria-hidden="true" /></button>}
        <section className={`${styles.window} ${styles.explorer}`} aria-labelledby="explorer-title">
          <div className={styles.windowBar}><Folder size={14} aria-hidden="true" /><h2 id="explorer-title">Explore Michelle’s Computer</h2><span className={styles.barLines} aria-hidden="true" /><span className={styles.itemCount}>{visibleFolders.length} folders</span></div>
          <div className={styles.explorerToolbar}><span className={styles.location}><Home size={13} aria-hidden="true" /><span>My computer</span><ChevronRight size={12} aria-hidden="true" /></span><div className={styles.folderFilters} role="group" aria-label="Filter folders"><button type="button" aria-pressed={folderView === "all"} onClick={() => setFolderView("all")}>All folders</button><button type="button" aria-pressed={folderView === "learn"} onClick={() => setFolderView("learn")}>Learn & build</button><button type="button" aria-pressed={folderView === "connect"} onClick={() => setFolderView("connect")}>Keep in touch</button></div></div>
          <div className={styles.folderGrid} data-count={visibleFolders.length}>
            {visibleFolders.map(folder => <a href={folder.href} key={folder.kind} className={styles.folderCard} onClick={event => handleSignupLink(event, folder.href)}>
              <SpriteIcon kind={folder.kind} />
              <h3>{folder.title}</h3><p>{folder.description}</p><span className={styles.folderAction}>{folder.action}<ArrowRight size={18} aria-hidden="true" /></span>
            </a>)}
          </div>
          <div className={styles.explorerStatus}><span>Click a folder to explore.</span><span>Magazine and pen pals are separate signups.</span></div>
        </section>
        <div className={styles.moreLinks}><span>More from Michelle</span><a href="/projects">Projects</a><a href="/research">Research</a><a href="/talks">Talks</a><a href="/posts">Posts</a></div>
      </div>
    </main>
    <div className={styles.taskbar} role="toolbar" aria-label="Desktop controls"><button type="button" className={styles.startButton} onClick={() => window.dispatchEvent(new Event("michelle:search"))}><Search size={19} aria-hidden="true" />Explore</button><button type="button" className={styles.taskButton} aria-pressed={welcomeOpen} onClick={() => { setWelcomeOpen(true); setMaximized(false) }}><FileText size={15} aria-hidden="true" />welcome.exe</button><span className={styles.clock}><Clock3 size={13} aria-hidden="true" />{time || "—"}</span></div>
  </div>
}
