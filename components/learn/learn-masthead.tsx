import Link from "next/link"
import { LearnThemeToggle } from "@/components/learn/learn-theme"

export function LearnMasthead() {
  return (
    <div className="learn-border border-b-2 px-5 sm:px-8">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-5">
        <Link href="/learn" className="font-serif text-xl font-black tracking-tight sm:text-2xl">
          Michelle&apos;s Computer
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/about" className="hidden text-xs font-black uppercase tracking-[.16em] hover:underline sm:block">
            Michelle Lawson
          </Link>
          <LearnThemeToggle />
        </div>
      </div>
    </div>
  )
}
