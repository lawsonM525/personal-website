"use client"

import { Toaster } from "@/components/ui/toaster"
import { ComputerPageShell } from "@/components/homepage/computer-page-shell"
import { usePathname } from "next/navigation"

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const ownsDesktop = pathname === "/" || pathname === "/magazine" || pathname === "/penpals"
  const isProposal = pathname.startsWith("/begin") || pathname === "/openaibeta"
  return <>{ownsDesktop || isProposal ? children : <ComputerPageShell>{children}</ComputerPageShell>}<Toaster /></>
}
