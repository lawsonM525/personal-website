"use client"

import { useEffect } from "react"
import { analyticsGoals, trackGoal, type AnalyticsGoal } from "@/lib/analytics"
import { aiGuidePurchaseUrl } from "@/lib/ai-guide"

export function SiteAnalytics() {
  useEffect(() => {
    function click(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null
      const marked = target?.closest<HTMLElement>("[data-analytics-goal]")
      const named = marked?.dataset.analyticsGoal
      if (named && analyticsGoals.includes(named as AnalyticsGoal)) { trackGoal(named as AnalyticsGoal); return }
      const link = target?.closest<HTMLAnchorElement>("a[href]")
      if (!link) return
      const url = new URL(link.href)
      if (url.origin === window.location.origin && url.pathname === "/magazine") trackGoal("magazine_waitlist_open")
      else if (url.origin === window.location.origin && url.pathname === "/penpals") trackGoal("penpal_form_open")
      else if (url.origin + url.pathname === aiGuidePurchaseUrl) trackGoal("guide_purchase_click")
    }
    document.addEventListener("click", click)
    return () => document.removeEventListener("click", click)
  }, [])
  return null
}
