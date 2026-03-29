"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, Mail, Phone, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import favicon from "@/assets/mia-icon-big.png"

interface NavProps {
  onCommandOpen?: () => void
}

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/resources", label: "Garden" },
  { href: "/posts", label: "Writing" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
  { href: "/now", label: "Now" },
]

export function Nav({ onCommandOpen }: NavProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-[rgba(255,248,241,0.96)] backdrop-blur-sm">
      <div className="page-frame">
        {/* Pre-masthead strip — icons + editor's letter + subscribe */}
        <div className="hidden border-b border-[rgba(41,47,54,0.18)] md:grid md:grid-cols-[16rem_1fr_16rem]">
          <div className="flex items-center gap-2.5 border-r border-[rgba(41,47,54,0.18)] px-8 py-2">
            <Mail className="h-3 w-3 text-[rgba(41,47,54,0.45)]" />
            <Phone className="h-3 w-3 text-[rgba(41,47,54,0.45)]" />
            <FileText className="h-3 w-3 text-[rgba(41,47,54,0.45)]" />
            <Link href="/posts" className="scribble ml-2 text-[0.88rem] text-[rgba(41,47,54,0.52)] hover:text-foreground transition-colors">editor's letter</Link>
          </div>
          <div />
          <div className="flex items-center justify-end border-l border-[rgba(41,47,54,0.18)] px-8 py-2">
            <button className="rounded-full bg-[rgb(41,47,54)] px-5 py-1.5 font-mono text-[0.6rem] tracking-[0.18em] text-[rgb(255,248,241)] uppercase transition-colors hover:bg-[rgba(41,47,54,0.82)]">
              Subscribe
            </button>
          </div>
        </div>

        {/* Masthead row — thinner */}
        <div className="grid min-h-[5.5rem] border-b border-[rgba(41,47,54,0.72)] md:grid-cols-[16rem_1fr_16rem]">
          <div className="flex items-center border-r border-[rgba(41,47,54,0.72)] px-8 py-3">
            <Link href="/" className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden border border-[rgba(41,47,54,0.72)] bg-white">
                <Image
                  src={favicon}
                  alt="Michelle Lawson"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-cover"
                />
              </div>
              <span className="scribble text-[1.5rem] leading-tight text-[rgba(41,47,54,0.72)]">
                pssst...<br />you're doing great
              </span>
            </Link>
          </div>

          <div className="flex items-center justify-center px-6 py-4">
            <Link href="/" className="masthead-script text-center text-[4rem] text-foreground sm:text-[5rem]">
              Michelle Lawson
            </Link>
          </div>

          <div className="hidden items-center justify-end border-l border-[rgba(41,47,54,0.72)] px-8 md:flex">
            {onCommandOpen ? (
              <Button
                variant="ghost"
                className="h-auto border-0 px-0 py-0 text-base font-normal text-foreground hover:bg-transparent"
                onClick={onCommandOpen}
              >
                Index
              </Button>
            ) : null}
          </div>
        </div>

        {/* Nav links row — full width, no date/time */}
        <div className="border-b border-[rgba(41,47,54,0.72)]">
          <nav className="hidden items-center justify-around px-8 py-2 md:flex">
            {links.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-[1.04rem] transition-colors ${
                    active ? "nav-oval text-foreground" : "text-foreground hover:text-[rgba(41,47,54,0.62)]"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile: hamburger only */}
          <div className="flex items-center justify-between px-6 py-3 md:hidden">
            <Link href="/" className="masthead-script text-[2.5rem] text-foreground">
              Michelle Lawson
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center border border-[rgba(41,47,54,0.72)] p-2 text-foreground"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen ? (
          <div className="border-b border-[rgba(41,47,54,0.72)] py-4 md:hidden">
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`mx-4 px-4 py-3 text-base ${
                    pathname === link.href
                      ? "nav-oval text-foreground"
                      : "text-[rgba(41,47,54,0.72)]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  )
}
