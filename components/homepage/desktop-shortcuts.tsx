import Link from "next/link"
import styles from "./desktop-shortcuts.module.css"

const shortcuts = [
  { label: "Learn", href: "/learn", src: "/homepage/learn-icon-v3.webp" },
  { label: "Projects", href: "/projects", src: "/homepage/projects-icon-v2.webp" },
  { label: "Magazine", href: "/magazine", src: "/explorer/icons/magazine-v1.webp" },
  { label: "Pen pals", href: "/penpals", src: "/explorer/icons/penpals-v1.webp" },
  { label: "Dear Internet,", href: "/?desktop=1&letter=1", src: "/explorer/icons/paper-v1.webp" },
  { label: "Girly Guide to AI", href: "/girly-guide-to-ai", src: "/interface/icons/book-v1.webp" },
]

export function DesktopShortcuts({ onExplore, onPaint }: { onExplore?: () => void; onPaint?: () => void }) {
  const explore = <><img src="/explorer/icons/folder-v1.webp" alt="" width="64" height="64" /><span>Explore</span></>
  return <nav className={styles.shortcuts} aria-label="Desktop shortcuts">
    {shortcuts.map(shortcut => <Link key={shortcut.label} href={shortcut.href} data-computer-sound="open"><img src={shortcut.src} alt="" width="64" height="64" /><span>{shortcut.label}</span></Link>)}
    {onExplore ? <button type="button" onClick={onExplore} data-computer-sound="open">{explore}</button> : <Link href="/explore" data-computer-sound="open">{explore}</Link>}
    {onPaint && <button type="button" onClick={onPaint} data-computer-sound="open"><img src="/explorer/icons/paint-v1.webp" alt="" width="64" height="64" /><span>Paint</span></button>}
  </nav>
}
