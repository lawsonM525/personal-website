"use client"
import { Inter } from "next/font/google"
import { Playfair_Display, Caveat } from "next/font/google"
import { CommandMenu } from "@/components/command-menu"
import { EmailPopup } from "@/components/email-popup"
import { Toaster } from "@/components/ui/toaster"
import { Nav } from "@/components/nav"
import { useState } from "react"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif" 
})
const caveat = Caveat({ 
  subsets: ["latin"],
  variable: "--font-handwriting" 
})

export function LayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false)
  const [emailPopupOpen, setEmailPopupOpen] = useState(false)

  return (
    <html lang="en" className={`dark ${playfair.variable} ${caveat.variable}`}>
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <Nav />
        <CommandMenu 
          open={commandMenuOpen} 
          onOpenChange={setCommandMenuOpen}
        />
        {children}
        <EmailPopup 
          open={emailPopupOpen} 
          onOpenChange={setEmailPopupOpen} 
        />
        <Toaster />
      </body>
    </html>
  )
} 