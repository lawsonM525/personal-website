"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowRight, ArrowUpRight, Clock3, FileText, Mail, Menu, Search, X } from "lucide-react"
import { ButterflyMark } from "./butterfly-mark"
import { BootScreen } from "./boot-screen"
import { contactEmail, contactHref } from "./contact-config"
import { signupForms } from "./signup-config"
import { WindowBar } from "./window-bar"
import styles from "./home.module.css"

const pages = [
  { label: "Learn", description: "Practical guides for using AI and building projects", href: "/learn", keywords: "guides tutorials ai college career" },

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
const mainLinks = ["/learn", "/projects", "/magazine", "/penpals", "/about"].map(href => ({ ...pages.find(page => page.href === href)!, label: href === "/magazine" ? "Magazine" : href === "/about" ? "About" : pages.find(page => page.href === href)!.label }))

export function HomeHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const chrome = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => { setMenuOpen(false); setSearchOpen(false) }, [pathname])
  const matches = useMemo(() => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
    return pages.filter(page => words.every(word => `${page.label} ${page.description} ${page.keywords}`.toLowerCase().includes(word)))
  }, [query])
  useEffect(() => {
    function keyboard(event: KeyboardEvent) { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {event.preventDefault();setSearchOpen(value=>!value)} }
    function openSearch() {setSearchOpen(true)}
    window.addEventListener("keydown",keyboard);window.addEventListener("michelle:search",openSearch)
    return ()=>{window.removeEventListener("keydown",keyboard);window.removeEventListener("michelle:search",openSearch)}
  },[])
  useEffect(()=>{if(searchOpen&&!dialog.current?.open){dialog.current?.showModal();input.current?.focus()}if(!searchOpen&&dialog.current?.open)dialog.current?.close()},[searchOpen])
  useEffect(()=>{
    const element=chrome.current;if(!element)return
    function measure(){document.documentElement.style.setProperty("--computer-header-height",`${element!.getBoundingClientRect().height}px`)}
    measure();const observer=new ResizeObserver(measure);observer.observe(element);return()=>observer.disconnect()
  },[])
  return <>
    <div ref={chrome} className={styles.siteChrome}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Michelle’s Computer home"><ButterflyMark/><span className={styles.srOnly}>Michelle’s Computer</span></Link>
        <nav className={styles.desktopNav} aria-label="Main navigation">{mainLinks.map(item=><a key={item.href} href={item.href} aria-current={pathname===item.href?"page":undefined}>{item.label}</a>)}</nav>
        <div className={styles.headerActions}>
          <a className={styles.emailShortcut} href={contactHref} aria-label={`Email Michelle at ${contactEmail}`} title="Email Michelle"><Mail size={19} aria-hidden="true"/></a>
          <button type="button" className={styles.searchButton} aria-label="Search pages" onClick={()=>{setQuery("");setSearchOpen(true)}}><Search size={17} aria-hidden="true"/><span>Search</span><kbd>⌘ K</kbd></button>
          <button type="button" className={styles.mobileMenuButton} aria-label={menuOpen?"Close navigation":"Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-site-navigation" onClick={()=>setMenuOpen(value=>!value)}>{menuOpen?<X size={22}/>:<Menu size={22}/>}</button>
        </div>
        {menuOpen&&<nav id="mobile-site-navigation" className={styles.mobileNav} aria-label="Mobile navigation">{mainLinks.map(item=><a key={item.href} href={item.href} onClick={()=>setMenuOpen(false)}><span>{item.label}</span><ArrowUpRight size={17} aria-hidden="true"/></a>)}<a href="/research">Research</a><a href="/talks">Talks</a><a href="/posts">Posts</a></nav>}
      </header>
      <nav className={styles.mobileQuickLinks} aria-label="Quick navigation">{mainLinks.filter(item=>item.href!=="/about").map(item=><a key={item.href} href={item.href} aria-current={pathname===item.href?"page":undefined}>{item.label}</a>)}</nav>
    </div>
    <dialog ref={dialog} className={styles.commandDialog} aria-labelledby="command-title" onClose={()=>setSearchOpen(false)} onClick={event=>{if(event.target===event.currentTarget)setSearchOpen(false)}}>
      <div className={styles.commandInner}>
        <div className={styles.windowBar}><Search size={15} aria-hidden="true"/><h2 id="command-title">Find a page or guide</h2><button type="button" aria-label="Close search" onClick={()=>setSearchOpen(false)}><X size={16}/></button></div>
        <label className={styles.searchField}><Search size={20} aria-hidden="true"/><input ref={input} value={query} onChange={event=>setQuery(event.target.value)} placeholder="Try articles, projects, magazine…" aria-label="Search pages and guides" onKeyDown={event=>{if(event.key==="Enter"&&matches[0])window.location.assign(matches[0].href)}}/></label>
        <div className={styles.searchResults} aria-live="polite">{matches.length?matches.map(page=><a href={page.href} key={page.href}><span><strong>{page.label}</strong><small>{page.description}</small></span><ArrowUpRight size={18} aria-hidden="true"/></a>):<p>No matching pages. Try “learn”, “projects”, or “pen pals”.</p>}</div>
        <div className={styles.commandHint}><span>Enter opens the first result · Tab to choose</span><kbd>esc</kbd></div>
      </div>
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
  { kind: "resources" as const, title: "Projects", description: "What can we build today?", action: "Explore the projects", href: "/projects" },
  { kind: "magazine" as const, title: "Magazine", description: "An artsy magazine about AI and learning.", action: "Join the waitlist", href: signupForms.magazine.pagePath },
  { kind: "penpals" as const, title: "Pen pals", description: "Want a handwritten letter from me?", action: "Sign up to be pen pals", href: signupForms.penpals.pagePath },
]

export default function HomeDesktop() {
  const [welcomeOpen, setWelcomeOpen] = useState(true)
  const [contactOpen, setContactOpen] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const [activeWindow, setActiveWindow] = useState<"welcome" | "contact">("welcome")
  const [time, setTime] = useState("")
  useEffect(() => { function tick() { setTime(new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date())) }; tick(); const timer = setInterval(tick, 60000); return () => clearInterval(timer) }, [])

  function restoreWelcome() { setWelcomeOpen(true); setMaximized(false); setActiveWindow("welcome") }

  return <BootScreen><div className={`${styles.site} ${styles.desktopSite}`}>
    <a href="#main" className={styles.skip}>Skip to content</a>
    <HomeHeader />
    <main id="main" className={styles.desktop}>
      <nav className={styles.desktopShortcuts} aria-label="Desktop shortcuts">{folders.map(folder => <a key={folder.kind} href={folder.href} aria-label={`${folder.title}: ${folder.action}`}>
        <SpriteIcon kind={folder.kind} />
        <span className={styles.shortcutLabel}>{folder.title}</span>
        <span className={styles.shortcutHint}>{folder.kind === "magazine" ? "Join the waitlist" : folder.kind === "penpals" ? "Get a handwritten letter" : folder.kind === "learn" ? "Guides & tutorials" : "Things I’m building"}</span>
      </a>)}</nav>
      <div className={`${styles.workspace} ${maximized ? styles.workspaceMaximized : ""}`}>
        {welcomeOpen ? <section data-computer-window className={`${styles.window} ${styles.welcomeWindow} ${activeWindow === "welcome" ? styles.activeWindow : ""}`} aria-labelledby="home-title" onPointerDown={() => setActiveWindow("welcome")} onFocusCapture={() => setActiveWindow("welcome")}>
          <WindowBar title="Dear Internet," onMinimize={() => { setWelcomeOpen(false); setMaximized(false) }} onMaximize={() => setMaximized(value => !value)} onClose={() => { setWelcomeOpen(false); setMaximized(false) }} maximized={maximized} />
          <div className={styles.heroBody}>
            <div className={styles.heroCopy}>
              <h1 id="home-title" tabIndex={-1}>Welcome<br />to Michelle’s<br />Computer.</h1>
              <p className={styles.tagline}>Turning my ideas, and yours,<br className={styles.desktopBreak} /> into reality.</p>
              <div className={styles.heroActions}><a href="/learn" className={styles.button}>Explore the guides <ArrowRight size={24} aria-hidden="true" /></a><a href="/about" className={styles.textLink}>My story <ArrowUpRight size={16} aria-hidden="true" /></a></div>
            </div>
            <img className={styles.heroLetter} src="/homepage/welcome-letter-d.webp" width="1024" height="1024" alt="An open ivory envelope with blank paper and a blue botanical postage stamp." fetchPriority="high" />
          </div>
        </section> : <button className={`${styles.window} ${styles.restoreWelcome}`} type="button" onClick={restoreWelcome}><FileText size={19} aria-hidden="true" /><span>Open Dear Internet,</span><ArrowUpRight size={18} aria-hidden="true" /></button>}
        {contactOpen && <section data-computer-window className={`${styles.window} ${styles.contactWindow} ${activeWindow === "contact" ? styles.activeWindow : ""}`} aria-labelledby="contact-title" onPointerDown={() => setActiveWindow("contact")} onFocusCapture={() => setActiveWindow("contact")}>
          <WindowBar title="Keep in touch" warm onMinimize={() => setContactOpen(false)} onClose={() => setContactOpen(false)} />
          <div className={styles.contactBody}>
            <h2 id="contact-title">Keep in touch</h2>
            <a href={contactHref}><Mail size={21} aria-hidden="true"/><span><strong>Email me</strong><small>{contactEmail}</small></span><ArrowUpRight size={20} aria-hidden="true" /></a>
            <a href={signupForms.magazine.pagePath}><span><strong>Magazine</strong><small>Join the magazine waitlist</small></span><ArrowUpRight size={20} aria-hidden="true" /></a>
            <a href={signupForms.penpals.pagePath}><span><strong>Pen pals</strong><small>Want a handwritten letter from me?</small></span><ArrowUpRight size={20} aria-hidden="true" /></a>
          </div>
        </section>}
        <nav className={styles.moreLinks} aria-label="More from Michelle"><a href="/projects">Projects <ArrowUpRight size={13} aria-hidden="true" /></a><a href="/research">Research <ArrowUpRight size={13} aria-hidden="true" /></a><a href="/talks">Talks <ArrowUpRight size={13} aria-hidden="true" /></a><a href="/posts">Posts <ArrowUpRight size={13} aria-hidden="true" /></a></nav>
      </div>
    </main>
    <div className={styles.taskbar} role="toolbar" aria-label="Desktop controls"><button type="button" className={styles.startButton} onClick={() => window.dispatchEvent(new Event("michelle:search"))}><Search size={19} aria-hidden="true" /><span>Explore</span></button><button type="button" className={styles.taskButton} aria-pressed={welcomeOpen && activeWindow === "welcome"} onClick={restoreWelcome}><FileText size={16} aria-hidden="true" /><span>Dear Internet,</span></button><button type="button" className={styles.taskButton} aria-pressed={contactOpen && activeWindow === "contact"} onClick={() => { setContactOpen(true); setActiveWindow("contact") }}><Mail size={16} aria-hidden="true" /><span>Keep in touch</span></button><span className={styles.clock}><Clock3 size={13} aria-hidden="true" />{time || "—"}</span></div>
  </div></BootScreen>
}
