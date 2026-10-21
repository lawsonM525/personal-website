"use client"

import { Toaster } from "@/components/ui/toaster"
import { HomeHeader } from "@/components/homepage/home-desktop"
import { usePathname } from "next/navigation"

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hasOwnHeader = pathname === "/" || pathname === "/magazine" || pathname === "/penpals" || pathname === "/learn" || pathname.startsWith("/learn/")
  const isProposal = pathname.startsWith("/begin") || pathname === "/openaibeta"
  return <>
    {!hasOwnHeader && !isProposal && <HomeHeader />}
    {children}
    <Toaster />
  </>
}
