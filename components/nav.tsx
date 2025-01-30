"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import favicon  from "@/assets/mia-icon-big.png"
import Image from "next/image"

interface NavProps {
  onCommandOpen: () => void
}

export function Nav() {
  const pathname = usePathname()
  const [hoverTarget, setHoverTarget] = useState<HTMLElement | null>(null)
  const [hoverStyle, setHoverStyle] = useState({ left: 0, width: 0, height: 0 })
  const navRef = useRef<HTMLDivElement>(null)

  const links = [
    { href: "/about", label: "MY STORY" },
    { href: "/projects", label: "PROJECTS" },
    { href: "/research", label: "RESEARCH" },
    { href: "/talks", label: "TALKS" },
    { href: "/posts", label: "POSTS" },
    { href: "/resources", label: "RESOURCES" },
    { href: "/reminder", label: "REMINDER" },
  ]

  useEffect(() => {
    if (hoverTarget && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect()
      const targetRect = hoverTarget.getBoundingClientRect()
      setHoverStyle({
        left: targetRect.left - navRect.left,
        width: targetRect.width,
        height: targetRect.height,
      })
    }
  }, [hoverTarget])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm">
      <Link href="/" className="text-2xl font-bold text-white">
        <Image
          src={favicon}
          alt="Logo"
          width={32}
          height={32}
          className="w-8 h-8"
        />
      </Link>
      <div className="flex items-center justify-center flex-1 space-x-2 relative" ref={navRef}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm transition-colors relative py-2 px-3 rounded-md
              ${pathname === link.href 
                ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:mx-auto after:w-12 after:h-0.5 after:bg-white' 
                : 'text-gray-400 hover:text-white'
              }`}
            onMouseEnter={(e) => setHoverTarget(e.currentTarget)}
            onMouseLeave={() => setHoverTarget(null)}
          >
            {link.label}
          </Link>
        ))}
        <div
          className="absolute bg-gray-700/50 transition-all duration-200 ease-out rounded-md -z-10"
          style={{
            left: `${hoverStyle.left}px`,
            width: `${hoverStyle.width}px`,
            height: `${hoverStyle.height}px`,
            opacity: hoverTarget ? 1 : 0,
            top: 0,
          }}
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="5" cy="5" r="3" fill="currentColor" />
          <circle cx="19" cy="5" r="3" fill="currentColor" />
          <circle cx="5" cy="19" r="3" fill="currentColor" />
          <circle cx="19" cy="19" r="3" fill="currentColor" />
        </svg>
        <span className="sr-only">Open command menu</span>
      </Button>
    </nav>
  )
}

