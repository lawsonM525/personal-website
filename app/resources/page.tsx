'use client'

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import Link from 'next/link'

export default function Resources() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <Nav />
      <h1 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
        My Fave Resources
      </h1>
      <p className="text-center text-xl text-gray-300 mb-12">
        for learning faster, coding smarter, and living your best life 🙂‍↕️
      </p>

      <div className="space-y-12">
        {/* Textbooks Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
            <span>📘</span> My Textbooks
          </h2>
          <div className="grid gap-6">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-pink-500/50 transition-colors">
              <h3 className="text-xl font-semibold mb-2">Girly Guide to AI</h3>
              <p className="text-gray-300 mb-4">beginner-friendly intro to artificial intelligence, with ✨vibes✨</p>
              <Link href="https://michellexcomputer.gumroad.com/l/girly-guide-to-ai" target="_blank" className="text-pink-500 hover:text-pink-400 transition-colors">
                Check it out →
              </Link>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-pink-500/50 transition-colors">
              <h3 className="text-xl font-semibold mb-2">Girly Guide to Algorithms</h3>
              <p className="text-gray-300 mb-4">cute but powerful breakdowns of classic algorithm concepts</p>
              <Link href="https://michellexcomputer.gumroad.com/l/algorithmsforthegirlies" target="_blank" className="text-pink-500 hover:text-pink-400 transition-colors">
                Check it out →
              </Link>
            </div>
          </div>
        </section>

        {/* Learn to Think Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
            <span>🧠</span> Learn & Think Like a Coder
          </h2>
          <div className="grid gap-6">
            <ResourceCard 
              title="Codédex"
              description="gamified coding adventures for total beginners (and girlies who love aesthetics)"
              link="https://www.codedex.io"
            />
            <ResourceCard 
              title="The Missing Semester (MIT)"
              description="learn the CS stuff nobody teaches you (shell, git, vim, etc)"
              link="https://missing.csail.mit.edu"
            />
            <ResourceCard 
              title="MIT BTTAI Fellowship"
              description="the AI program that changed my life"
              link="https://www.breakthroughtech.org"
            />
            <ResourceCard 
              title="Google Notebook LM"
              description="my new fave tool for learning anything faster w/ generative AI"
              link="https://notebooklm.google.com"
            />
            <ResourceCard 
              title="Windsurf"
              description="vibe coding with an AI tool that actively helps you brainstorm + build"
              link="https://codeium.com/windsurf"
            />
            <ResourceCard 
              title="Obsidian"
              description="my second brain, literally. perfect for taking smart notes and organizing ideas"
              link="https://obsidian.md"
            />
            <ResourceCard 
              title="16Personalities.com"
              description="because knowing your brain helps you train your brain (I also just really like MBTI 🤭)"
              link="https://www.16personalities.com"
            />
          </div>
        </section>

        {/* Practice + Projects Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
            <span>💻</span> Practice + Projects
          </h2>
          <div className="grid gap-6">
            <ResourceCard 
              title="Kaggle"
              description="tutorials, datasets, and competitions to get into data science & ML"
              link="https://www.kaggle.com"
            />
          </div>
        </section>

        {/* For the Girlies Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
            <span>👯‍♀️</span> For the Girlies
          </h2>
          <div className="grid gap-6">
            <ResourceCard 
              title="CS Girlies Discord"
              description="a super warm, hyper-friendly community of Gen Z women in tech"
              link="https://csgirlies.com"
            />
          </div>
        </section>

        {/* Internships Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
            <span>💼</span> Internships + Career
          </h2>
          <div className="grid gap-6">
            <ResourceCard 
              title="Intern List"
              description="curated list of newly posted internships, updated every hour!!"
              link="https://www.intern-list.com"
            />
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}

function ResourceCard({ title, description, link }: { title: string, description: string, link: string }) {
  return (
    <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-pink-500/50 transition-colors">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <Link href={link} target="_blank" className="text-pink-500 hover:text-pink-400 transition-colors">
        Check it out →
      </Link>
    </div>
  )
}
