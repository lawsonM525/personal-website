import Link from "next/link"
import { LearnThemeToggle } from "@/components/learn/learn-theme"

export function LearnMasthead() {
  return <>
    <div className="learn-border border-b px-5 sm:px-8">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-5">
        <Link href="/learn" className="text-xs font-black uppercase tracking-[.16em]">Learning library</Link>
        <LearnThemeToggle />
      </div>
    </div>
  </>
}
