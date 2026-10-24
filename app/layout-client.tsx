"use client"

import { Toaster } from "@/components/ui/toaster"
import { ComputerPageShell } from "@/components/homepage/computer-page-shell"
import { ComputerSoundProvider } from "@/components/homepage/computer-sounds"
import { usePathname } from "next/navigation"

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const ownsDesktop = pathname === "/" || pathname === "/magazine" || pathname === "/penpals"
  const isProposal = pathname.startsWith("/begin") || pathname === "/openaibeta"
  const content = ownsDesktop || isProposal ? children : <ComputerPageShell>{children}</ComputerPageShell>
  return <>{isProposal ? content : <ComputerSoundProvider>{content}</ComputerSoundProvider>}<Toaster /></>
}
