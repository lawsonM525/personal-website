"use client"

import { useCallback, useEffect, useRef } from "react"
import { ArrowRight, ChevronDown, FileText, FolderOpen, ShieldCheck, Sparkles, User, X } from "@/components/retro-icons"
import { MemberAccount } from "@/components/member/member-account"
import { MemberAvatar } from "@/components/member/member-avatar"
import type { FeedbackViewer } from "@/lib/feedback"
import layout from "./feedback-layout.module.css"
import card from "./feedback-account.module.css"

export function FeedbackSidebar({ active, viewer, busy, onBrowse, onPicks, onRequests, onHow, onSignIn, onNextReview, onModeration, onSignOut, onViewerChange }: {
  active: "browse" | "picks" | "requests" | "how" | null; viewer: FeedbackViewer | null; busy: boolean;
  onBrowse: () => void; onPicks: () => void; onRequests: () => void; onHow: () => void;
  onSignIn: () => void; onNextReview: () => void; onModeration: () => void; onSignOut: () => void;
  onViewerChange: (viewer: FeedbackViewer | null) => void;
}) {
  const menu = useRef<HTMLDetailsElement>(null)
  const positionMenu = useCallback(() => {
    const node = menu.current, summary = node?.querySelector("summary")
    if (!node?.open || !summary) return
    const anchor = summary.getBoundingClientRect(), container = node.getBoundingClientRect()
    const height = window.visualViewport?.height ?? window.innerHeight
    const top = Math.max(8, document.querySelector(".computer-page-window>[data-window-drag-handle]")?.getBoundingClientRect().bottom ?? 88)
    const bottom = Math.min(height - 10, (document.querySelector('[aria-label="Desktop controls"]')?.getBoundingClientRect().top ?? height) - 8)
    const above = anchor.top - top - 10, below = bottom - anchor.bottom - 10
    const compact = window.matchMedia("(max-width:1000px)").matches
    const openBelow = compact ? below >= above : above < 180 && below > above
    const shortScreen = Math.max(above, below) < 260
    const width = Math.min(312, window.innerWidth - 32)
    const left = Math.max(16, Math.min(compact ? anchor.right - width : anchor.left, window.innerWidth - width - 16))
    node.style.setProperty("--feedback-account-left", `${left - container.left}px`)
    node.style.setProperty("--feedback-account-height", `${Math.max(64, Math.min(550, shortScreen ? bottom - top - 16 : openBelow ? below : above))}px`)
    node.style.setProperty("--feedback-account-top", shortScreen ? `${top + 8 - container.top}px` : openBelow ? "calc(100% + 10px)" : "auto")
    node.style.setProperty("--feedback-account-bottom", shortScreen || openBelow ? "auto" : "calc(100% + 10px)")
  }, [])
  function closeMenu(restoreFocus = false) { if (menu.current) { menu.current.open = false; if (restoreFocus) menu.current.querySelector("summary")?.focus() } }
  function go(action: () => void) { closeMenu(); action() }
  useEffect(() => {
    function outside(event: PointerEvent) { if (menu.current?.open && event.target instanceof Node && !menu.current.contains(event.target)) menu.current.open = false }
    document.addEventListener("pointerdown", outside)
    window.addEventListener("resize", positionMenu)
    window.addEventListener("scroll", positionMenu, true)
    window.visualViewport?.addEventListener("resize", positionMenu)
    return () => { document.removeEventListener("pointerdown", outside); window.removeEventListener("resize", positionMenu); window.removeEventListener("scroll", positionMenu, true); window.visualViewport?.removeEventListener("resize", positionMenu) }
  }, [positionMenu])
  useEffect(() => {
    const summary = menu.current?.querySelector("summary")
    if (!summary) return
    const observer = new ResizeObserver(positionMenu)
    observer.observe(summary)
    return () => observer.disconnect()
  }, [viewer?.id, positionMenu])
  const needed = viewer ? Math.max(0, 3 - viewer.credits) : 3
  const stats = viewer?.reviewer_stats
  const recognized = Boolean(stats && stats.helpful_reviews >= 3 && stats.helped_builders >= 3)
  return <aside className={layout.sidebar} aria-label="Feedback exchange navigation">
    <nav className={layout.navigation} aria-label="Exchange sections">
      <button type="button" aria-current={active === "browse" ? "page" : undefined} onClick={() => go(onBrowse)}><FolderOpen size={29} /><span>Browse projects</span></button>
      <button type="button" aria-current={active === "picks" ? "page" : undefined} onClick={() => go(onPicks)}><Sparkles size={29} /><span>Michelle’s picks</span></button>
      <button type="button" className={layout.requests} aria-current={active === "requests" ? "page" : undefined} onClick={() => go(onRequests)}><FolderOpen size={29} /><span>My requests</span></button>
      <button type="button" className={layout.helpButton} aria-current={active === "how" ? "page" : undefined} onClick={() => go(onHow)}><FileText size={29} /><span>How it works</span></button>
    </nav>
    <div className={layout.account}>
      {viewer ? <details ref={menu} className={layout.accountMenu} onToggle={() => { positionMenu(); if (menu.current?.open) { menu.current.querySelector('[aria-labelledby="feedback-account-title"]')?.scrollTo({ top: 0 }); menu.current.querySelector('[data-account-card-scroll]')?.scrollTo({ top: 0 }) } }} onKeyDown={event => { if (event.key === "Escape" && !menu.current?.querySelector("dialog[open]")) { event.preventDefault(); event.stopPropagation(); closeMenu(true) } }}><summary aria-label={`${viewer.display_name} account`}><MemberAvatar name={viewer.display_name} avatar={viewer.avatar} size={40} /><strong>{viewer.display_name}</strong><ChevronDown size={15} /></summary><div className={`${layout.accountContents} ${card.panel}`} role="region" aria-labelledby="feedback-account-title">
        <div className={card.titlebar}><Sparkles size={20} /><span id="feedback-account-title">Your builder card</span><button type="button" aria-label="Close account card" onClick={() => closeMenu(true)}><X size={14} /></button></div>
        <div className={card.body} data-account-card-scroll>
          <section className={card.profile}><MemberAccount viewer={viewer} compact variant="builder-card" onChange={onViewerChange} /><span className={card.memberTag}>{recognized ? <><Sparkles size={14} />Helpful reviewer</> : (viewer.submission_cost ?? 3) === 0 ? "Early builder · submit free" : "Builder on Michelle’s Computer"}</span></section>
          <section className={card.credits} aria-label="Your review credits">
            <div className={card.creditHeading}><strong>{viewer.credits}</strong><span>review {viewer.credits === 1 ? "credit" : "credits"} saved<small>3 credits = 1 feedback request</small></span></div>
            <div className={card.creditTrack} role="progressbar" aria-label="Credits for your next feedback request" aria-valuemin={0} aria-valuemax={3} aria-valuenow={Math.max(0, Math.min(3, viewer.credits))} aria-valuetext={`${viewer.credits} credits saved; 3 credits per request`}>{[1, 2, 3].map(value => <span key={value} data-earned={viewer.credits >= value} aria-hidden="true">{value}</span>)}</div>
            <p className={card.nextStep}>{(viewer.submission_cost ?? 3) === 0 ? "Submit free during launch. Bank credits for later." : needed === 0 ? "Your next feedback request is ready!" : `${needed} more ${needed === 1 ? "review" : "reviews"} to unlock your next request.`}</p>
          </section>
          <dl className={card.stats}><div><dt><FileText size={16} />Reviews shared</dt><dd>{stats?.completed ?? 0}</dd></div><div><dt><Sparkles size={16} />Marked useful</dt><dd>{stats?.helpful_reviews ?? 0}</dd></div></dl>
        </div>
        <div className={card.footer}>
          <button type="button" className={card.reviewAction} disabled={busy} onClick={() => go(onNextReview)}><span>{viewer.assignment ? "Continue your review" : "Review a project"}<ArrowRight size={17} /></span><small>+1 credit</small></button>
          <p className={card.rewardNote}>Earn it when your complete review publishes.</p>
          <div className={card.actions}>{viewer.is_admin && <button type="button" onClick={() => go(onModeration)}><ShieldCheck size={17} />Moderation</button>}<button type="button" disabled={busy} onClick={() => go(onSignOut)}>Sign out</button></div>
        </div>
      </div></details> : <button type="button" className={layout.signIn} onClick={onSignIn}><User size={28} /><span>Sign in</span></button>}
    </div>
  </aside>
}
