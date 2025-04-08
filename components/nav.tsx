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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

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

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    console.log("Menu state changed:", isMenuOpen);
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Toggle menu function with debug logs
  const toggleMenu = () => {
    console.log("Toggling menu from", isMenuOpen, "to", !isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white z-50">
          <Image
            src={favicon}
            alt="Logo"
            width={32}
            height={32}
            className="w-8 h-8 border border-white/50 rounded-full"
          />
        </Link>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center justify-center flex-1 space-x-2 relative" ref={navRef}>
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
          {/* Hover effect background */}
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
        
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md text-white md:hidden z-50"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <svg 
              className="h-6 w-6" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          ) : (
            <svg 
              className="h-6 w-6" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          )}
        </button>

        {/* Desktop Menu Button (grid icon) */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 hidden md:flex"
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

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 z-40 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Mobile Menu Panel */}
        <div 
          ref={menuRef}
          className={`fixed top-0 right-0 w-3/4 max-w-xs h-full bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Mobile Menu Content */}
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg 
                  className="h-6 w-6" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>
            
            {/* Mobile Menu Links */}
            <div className="mt-6 flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-medium py-3 px-1 border-b border-gray-800 ${
                    pathname === link.href ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
