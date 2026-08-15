"use client"

import { FormEvent, useState } from "react"
import { ArrowRight } from "lucide-react"

export function NewsletterSignup() {
  const [note, setNote] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNote("the email pipe is not connected yet — this is the design preview, so i did not steal your address.")
  }

  return (
    <div className="learn-surface learn-border learn-shadow-md mx-auto grid max-w-6xl gap-7 border-2 p-7 sm:p-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
      <div>
        <p className="text-xs font-black uppercase tracking-[.2em]">Newsletter</p>
        <h2 className="mt-3 font-serif text-4xl leading-none tracking-tight sm:text-5xl">New articles, by email.</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="learn-newsletter-email" className="sr-only">Email address</label>
          <input
            id="learn-newsletter-email"
            type="email"
            required
            placeholder="you@email.com"
            className="learn-surface learn-border min-h-12 min-w-0 flex-1 border-2 px-4 text-base outline-none focus:ring-4 focus:ring-[#7557ff]/35"
          />
          <button type="submit" className="learn-border inline-flex min-h-12 items-center justify-center gap-2 border-2 bg-[#d7ff45] px-5 font-black text-black hover:bg-[#7557ff] hover:text-white">
            Subscribe <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        {note && <p role="status" className="learn-muted mt-3 text-sm leading-6">{note}</p>}
      </div>
    </div>
  )
}
