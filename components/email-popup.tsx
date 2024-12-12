"use client"

import * as React from "react"
import { X, Copy, Send } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export function EmailPopup({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [message, setMessage] = React.useState("")
  const email = "michellelawsonmedia@gmail.com"

  const handleSend = () => {
    window.location.href = `mailto:${email}?body=${encodeURIComponent(message)}`
    onOpenChange(false)
    setMessage("")
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email)
    toast({
      title: "Email copied to clipboard",
      description: email,
      className: "bg-gray-900 text-white border-gray-800",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[640px] gap-0 bg-pink-950 text-gray-300 border-gray-800 p-0 shadow-lg">
        <DialogTitle className="sr-only">Email Popup</DialogTitle>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold">Send me an email</h2>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 p-4">
            <textarea
              className="w-full h-32 p-2 text-gray-900 bg-gray-100 rounded-md resize-none"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-900/50">
            <Button variant="outline" size="sm" onClick={handleCopyEmail}>
              <Copy className="h-4 w-4 mr-2" />
              Copy email
            </Button>
            <Button onClick={handleSend}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

