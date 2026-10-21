import { ArrowUpRight } from "lucide-react"
import { signupForms } from "@/components/homepage/signup-config"

export function NewsletterSignup() {
  return <div className="learn-surface learn-border learn-shadow-md mx-auto grid max-w-6xl gap-7 border-2 p-7 sm:p-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
    <div><p className="text-xs font-black uppercase tracking-[.2em]">Michelle’s Computer</p><h2 className="mt-3 font-serif text-4xl leading-none tracking-tight sm:text-5xl">The magazine waitlist</h2></div>
    <div><p className="learn-muted mb-5 text-base leading-7">An artsy magazine about AI and learning—with comics, diary entries, and handwritten pages. Join the waitlist for updates as it comes together.</p><a href={signupForms.magazine.publicUrl} className="learn-border inline-flex min-h-12 items-center justify-center gap-3 border-2 bg-[#ee591f] px-5 font-bold text-white hover:bg-[#c84615]">Join the magazine waitlist <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a></div>
  </div>
}
