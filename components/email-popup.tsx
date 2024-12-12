"use client"

import * as React from "react"
import { X, Copy, Send } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogPortal } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

export function EmailPopup() {
  const [message, setMessage] = React.useState("")
  const email = "michellelawsonmedia@gmail.com"

  const handleSend = () => {
    window.location.href = `mailto:${email}?body=${encodeURIComponent(message)}`
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Contact</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="max-w-[640px] gap-0 bg-pink-950 text-gray-300 border-gray-800 p-0 shadow-lg">
          <DialogTitle asChild>
            <VisuallyHidden>Email Form</VisuallyHidden>
          </DialogTitle>
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h2 className="text-lg font-semibold">New Message</h2>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DialogTrigger>
            </div>
            <div className="flex-1 p-4">
              <div className="flex items-center mb-4">
                <span className="text-gray-400 mr-2">To:</span>
                <span>{email}</span>
                <Button variant="ghost" size="icon" className="ml-auto" onClick={handleCopyEmail}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <textarea
                className="w-full h-40 bg-transparent border border-gray-800 rounded p-2 text-white"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="flex justify-end p-4 border-t border-gray-800">
              <Button onClick={handleSend}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

