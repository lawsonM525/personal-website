"use client"
import { CommandMenu } from "@/components/command-menu"
import { EmailPopup } from "@/components/email-popup"
import { Toaster } from "@/components/ui/toaster"
import { Nav } from "@/components/nav"
import { useState } from "react"

export function LayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false)
  const [emailPopupOpen, setEmailPopupOpen] = useState(false)

  return (
    <>
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
    </>
  )
} 