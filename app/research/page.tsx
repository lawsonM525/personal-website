'use client'

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import Link from 'next/link'

export default function Research() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <Nav />
      <h1 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
        Research Publications
      </h1>

      <div className="space-y-8">
        <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-pink-500/50 transition-colors">
          <h2 className="text-2xl font-semibold mb-2">The Justification Effect on Two-Tier Multiple-Choice Exams</h2>
          <p className="text-gray-400 mb-4">PF Bolton, LR Lehr, R Simha, M Lawson</p>
          <p className="text-gray-300 mb-4">2024 ASEE Annual Conference & Exposition</p>
          <div className="flex gap-4">
            <Link 
              href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=yatiHe0AAAAJ&citation_for_view=yatiHe0AAAAJ:u-x6o8ySG0sC"
              target="_blank"
              className="text-pink-500 hover:text-pink-400 transition-colors"
            >
              View on Google Scholar
            </Link>
            <Link 
              href="https://www.researchgate.net/profile/Michelle-Lawson-7/publication/382873696_The_Justification_Effect_on_Two-Tier_Multiple-Choice_Exams/links/66ff65eaf599e0392fb5097f/The-Justification-Effect-on-Two-Tier-Multiple-Choice-Exams.pdf"
              target="_blank"
              className="text-pink-500 hover:text-pink-400 transition-colors"
            >
              View PDF
            </Link>
          </div>
        </div>
 
      </div>

      <Footer />
    </main>
  )
}
