"use client"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import Image from "next/image"
import entriesImg from "@/assets/pagez/entries-list-screen.png"
import graphImg from "@/assets/pagez/graph-screen.png"
import insightsImg from "@/assets/pagez/insights-and-stats-screen.png"

export default function PagezUpdates() {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours() % 12 || 12
      const minutes = now.getMinutes().toString().padStart(2, "0")
      const ampm = now.getHours() >= 12 ? "PM" : "AM"
      setCurrentTime(`${hours}:${minutes} ${ampm}`)
    }
    updateTime()
    const id = setInterval(updateTime, 60000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative">
      <style jsx global>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        .blink { animation: blink 1.2s infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
        .marquee { animation: marquee 20s linear infinite; }
        @keyframes glitch {
          0% { text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; }
          25% { text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
          50% { text-shadow: -1px 0 #ff00ff, 1px 0 #00ffff; }
          75% { text-shadow: 1px 0 #ff00ff, -1px 0 #00ffff; }
          100% { text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; }
        }
        .glitch { animation: glitch 3s infinite; }
        .pixel-border { position: relative; border-style: solid; border-width: 3px; border-image-slice: 2; border-image-width: 2; border-image-outset: 0; border-image-source: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='6' height='6'><path d='M0 2h2v2H0zM2 0h2v2H2zM4 2h2v2H4zM2 4h2v2H2z' fill='%23ff56c1' /></svg>"); border-image-repeat: stretch; box-shadow: 0 0 0 2px rgba(0,0,0,0.3); }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-10 opacity-5"
        style={{ backgroundImage: `repeating-linear-gradient(0deg, rgba(255,255,255,0.2), rgba(255,255,255,0.2) 1px, transparent 1px, transparent 2px)` }}
      />

      <Nav />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="bg-gradient-to-r from-purple-800 to-blue-900 mb-8 rounded-t-lg border-b-2 border-white/20 p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <div className="w-4 h-4 rounded-full bg-yellow-500" />
            <div className="w-4 h-4 rounded-full bg-green-500" />
          </div>
          <div className="font-mono text-white/80 text-sm">{currentTime}</div>
        </div>

        <div className="bg-black/80 backdrop-blur-sm rounded-b-lg border-2 border-pink-500/30 p-6 mb-10">
          <div className="overflow-hidden mb-8">
            <div className="marquee whitespace-nowrap">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text inline-block">
                Pagez — updates • Pagez — updates • Pagez — updates • Pagez — updates •
              </h1>
            </div>
          </div>

          <div className="pixel-border mb-6 p-4 bg-gradient-to-r from-pink-900/30 to-purple-900/30">
            <p className="text-center text-lg">Analyze your relationships and habits with AI insights and a knowledge graph.</p>
          </div>

          <Section title="Overview" emoji="📌" textColor="text-yellow-300" borderColor="pink">
            <div className="space-y-4 text-gray-300">
              <p>
                Pagez is a journaling app focused on the connections across your entries. It surfaces people, events,
                and themes with stats, AI‑generated insights, and a knowledge graph inspired by Obsidian.
              </p>
              <div>
                <h3 className="text-xl font-semibold mb-2">Built with</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Expo (React Native) for a cross‑platform app</li>
                  <li>Clerk for authentication</li>
                  <li>Convex for the backend and real‑time data</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Why it’s not published yet</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Design iteration: the artsy font isn’t accessible enough yet</li>
                  <li>Graph UX: needs more interactivity</li>
                  <li>Next step: integrate Neo4j for a robust, interactive knowledge graph</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Platforms</h3>
                <p>Targeting web, Google Play, and Apple App Store. Expo enables a single codebase.</p>
              </div>
            </div>
          </Section>

          <Section title="Screenshots" emoji="🖼️" textColor="text-blue-300" borderColor="purple">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <figure className="bg-gray-900 rounded-lg p-3 border border-white/10">
                <Image src={insightsImg} alt="Insights and stats screen" className="rounded-md w-full h-auto" />
                <figcaption className="text-sm text-gray-400 mt-2">Insights & stats</figcaption>
              </figure>
              <figure className="bg-gray-900 rounded-lg p-3 border border-white/10">
                <Image src={entriesImg} alt="Entries list screen" className="rounded-md w-full h-auto" />
                <figcaption className="text-sm text-gray-400 mt-2">Entries list</figcaption>
              </figure>
              <figure className="bg-gray-900 rounded-lg p-3 border border-white/10">
                <Image src={graphImg} alt="Knowledge graph screen" className="rounded-md w-full h-auto" />
                <figcaption className="text-sm text-gray-400 mt-2">Knowledge graph</figcaption>
              </figure>
            </div>
          </Section>

          <Section title="Roadmap" emoji="🛠️" textColor="text-green-300" borderColor="blue">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Design refresh with accessible typography and improved contrast</li>
              <li>Integrate Neo4j for an interactive knowledge graph</li>
              <li>Richer AI insights: entity linking, clusters, and trendlines</li>
              <li>Polish onboarding and empty states</li>
              <li>Public beta → ship to Web, Play Store, and App Store</li>
            </ul>
          </Section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function Section({ title, emoji, children, textColor = "text-white", borderColor = "pink" }: { title: string; emoji: string; children: React.ReactNode; textColor?: string; borderColor?: "pink" | "purple" | "blue" }) {
  const getBorderClass = () => {
    switch (borderColor) {
      case "blue":
        return "from-blue-500 to-cyan-500"
      case "purple":
        return "from-purple-500 to-indigo-500"
      case "pink":
      default:
        return "from-pink-500 to-purple-500"
    }
  }
  return (
    <section className="mb-10">
      <div className="mb-4">
        <div
          className={`h-2 bg-gradient-to-r ${getBorderClass()} mb-1`}
          style={{ backgroundImage: "linear-gradient(90deg, var(--tw-gradient-stops)), linear-gradient(90deg, black 25%, transparent 25%, transparent 50%, black 50%, black 75%, transparent 75%, transparent)", backgroundSize: "100% 100%, 8px 8px" }}
        />
        <div className="flex items-center mb-1">
          <span className="text-3xl mr-2">{emoji}</span>
          <h2 className={`text-2xl font-bold ${textColor} glitch`}>{title}</h2>
          <span className="ml-2 blink text-xl">★</span>
        </div>
        <div
          className={`h-2 bg-gradient-to-r ${getBorderClass()} mt-1`}
          style={{ backgroundImage: "linear-gradient(90deg, var(--tw-gradient-stops)), linear-gradient(90deg, black 25%, transparent 25%, transparent 50%, black 50%, black 75%, transparent 75%, transparent)", backgroundSize: "100% 100%, 8px 8px" }}
        />
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  )
}
