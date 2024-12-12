"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { FileText, Mail, Home, User, Briefcase, BookOpen, Mic, Book } from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { DialogContent, DialogTitle } from "@/components/ui/dialog"
import { EmailPopup } from "./email-popup"
import { Nav } from "./nav"

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [onOpenChange, open])

  const runCommand = React.useCallback((command: () => unknown) => {
    onOpenChange(false)
    command()
  }, [])

  return (
    <>
      <CommandDialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Command Menu</DialogTitle>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
                <Home className="mr-2 h-4 w-4" />
                Home
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/about"))}>
                <User className="mr-2 h-4 w-4" />
                About
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/projects"))}>
                <Briefcase className="mr-2 h-4 w-4" />
                Projects
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/posts"))}>
                <FileText className="mr-2 h-4 w-4" />
                Posts
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => runCommand(() => document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'k', 'metaKey': true})))}>
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </DialogContent>
      </CommandDialog>
    </>
  )
}

