"use client"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Playfair_Display, Caveat } from "next/font/google"
import "./globals.css"
import { CommandMenu } from "@/components/command-menu"
import { EmailPopup } from "@/components/email-popup"
import { Toaster } from "@/components/ui/toaster"
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

export const metadata: Metadata = {
  title: "Michelle Lawson",
  description: "Michelle Lawson is a top voice in technology education. With over 150,000 followers across various social media platforms, she has established herself as a leading figure in the field. An accomplished author, Michelle has written multiple books that use fashion and makeup-themed metaphors to make complex computer science concepts more engaging. As an undergraduate researcher, she has published papers with the American Society of Engineering Education, focusing on Computer Science education. Michelle also curates a strong collection of educational resources designed to help students succeed in their STEM degrees.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false)
  const [emailPopupOpen, setEmailPopupOpen] = useState(false)

  return (
    <html lang="en" className={`dark ${playfair.variable} ${caveat.variable}`}>
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
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

