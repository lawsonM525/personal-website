"use client"

import { Footer } from "@/components/footer"
import { CommandMenu } from "@/components/command-menu"
import { useState } from "react"

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-start justify-center p-4">
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
      <div className="space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold">Michelle Lawson</h1>
        <p className="text-gray-400">Obsessed with turning ideas into reality</p>
        <button
          onClick={() => setCommandOpen(true)}
          className="text-sm text-gray-400 mt-8 px-2 py-1 rounded-md transition-all duration-200 ease-in-out hover:bg-gray-800"
        >
          Press <kbd className="px-2 py-1 bg-gray-800 rounded-full">Ctrl</kbd> +{" "}
          <kbd className="px-2 py-1 bg-gray-800 rounded-full">K</kbd> to start →
        </button>
      </div>
      <Footer />
    </main>
  )
}

