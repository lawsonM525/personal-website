"use client"

import { useRef } from "react"
import { ChevronDown, FileText, FolderOpen, ShieldCheck, Sparkles, User } from "@/components/retro-icons"
import { MemberAccount } from "@/components/member/member-account"
import { MemberAvatar } from "@/components/member/member-avatar"
import type { FeedbackViewer } from "@/lib/feedback"
import { ReviewerReputation } from "./structured-review"
import layout from "./feedback-layout.module.css"

export function FeedbackSidebar({ active, viewer, busy, onBrowse, onPicks, onRequests, onHow, onSignIn, onNextReview, onModeration, onSignOut, onViewerChange }: {
  active: "browse" | "picks" | "requests" | "how" | null; viewer: FeedbackViewer | null; busy: boolean;
  onBrowse: () => void; onPicks: () => void; onRequests: () => void; onHow: () => void;
  onSignIn: () => void; onNextReview: () => void; onModeration: () => void; onSignOut: () => void;
  onViewerChange: (viewer: FeedbackViewer | null) => void;
}) {
  const menu = useRef<HTMLDetailsElement>(null)
  function go(action: () => void) { if (menu.current) menu.current.open = false; action() }
  const needed = viewer ? Math.max(0, (viewer.submission_cost ?? 3) - viewer.credits) : 0
  return <aside className={layout.sidebar} aria-label="Feedback exchange navigation">
    <nav className={layout.navigation} aria-label="Exchange sections">
      <button type="button" aria-current={active === "browse" ? "page" : undefined} onClick={() => go(onBrowse)}><FolderOpen size={29} /><span>Browse projects</span></button>
      <button type="button" aria-current={active === "picks" ? "page" : undefined} onClick={() => go(onPicks)}><Sparkles size={29} /><span>Michelle’s picks</span></button>
      <button type="button" className={layout.requests} aria-current={active === "requests" ? "page" : undefined} onClick={() => go(onRequests)}><FolderOpen size={29} /><span>My requests</span></button>
      <button type="button" className={layout.helpButton} aria-current={active === "how" ? "page" : undefined} onClick={() => go(onHow)}><FileText size={29} /><span>How it works</span></button>
    </nav>
    <div className={layout.account}>
      {viewer ? <details ref={menu} className={layout.accountMenu}><summary aria-label={`${viewer.display_name} account`}><MemberAvatar name={viewer.display_name} avatar={viewer.avatar} size={40} /><strong>{viewer.display_name}</strong><ChevronDown size={15} /></summary><div className={layout.accountContents}>
        <MemberAccount viewer={viewer} compact onChange={onViewerChange} />
        <p>{viewer.credits} review {viewer.credits === 1 ? "credit" : "credits"} · {needed === 0 ? "Your next request is ready." : `${needed} more ${needed === 1 ? "review" : "reviews"} to earn a request.`}</p>
        <ReviewerReputation stats={viewer.reviewer_stats} />
        {viewer.assignment && <button type="button" disabled={busy} onClick={() => go(onNextReview)}>Continue your review</button>}
        {viewer.is_admin && <button type="button" onClick={() => go(onModeration)}><ShieldCheck size={18} />Moderation</button>}
        <button type="button" disabled={busy} onClick={() => go(onSignOut)}>Sign out</button>
      </div></details> : <button type="button" className={layout.signIn} onClick={onSignIn}><User size={28} /><span>Sign in</span></button>}
    </div>
  </aside>
}
