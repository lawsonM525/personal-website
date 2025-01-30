'use client'

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { UnderConstruction } from "@/components/under-construction"
import { CommandButton } from '@/components/CommandButton'
import profilePhoto from '@/assets/michelle pink scarf icon.png'
import Image from 'next/image' 
import { Button } from '@/components/ui/button'
import { ClipboardCopy, Download } from 'lucide-react'

export default function About() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          Create. Share. Repeat.
        </h1>

        <div className="space-y-12">
          <div className="grid md:grid-cols-[300px,1fr] gap-8 items-start">
            <Image
              src={profilePhoto}
              alt="Profile photo"
              width={300}
              height={250}
              className="rounded-lg"
            />
            <div className="space-y-4">
              <p className="text-lg">
                Hi! I'm Michelle Lawson <span className="inline-block">👋</span> I started as a software engineer back in
                2009, working with Flash.
              </p>
              <p className="text-neutral-400">
                I'm the <span className="text-white">Founder & CEO</span> at Resend. Before that, I was a VP of
                Developer Experience at WorkOS and CPO at Liferay Cloud. I'm originally from Brazil and now living in{" "}
                <span className="text-white">San Francisco, California</span> with my amazing wife and beautiful
                daughter.
              </p>
              <p className="text-neutral-400">
                I love <span className="text-white">dark mode</span>, open source, and side projects. When I'm not
                working, I like running, watching movies, and <span className="text-white">eating cheese</span>.
              </p>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Bio</h2>
            <p className="text-sm text-neutral-400">
              This is made for journalists, podcast hosts, and event organizers to copy-and-paste.
            </p>
            <div className="bg-neutral-900 p-6 rounded-lg text-neutral-400 italic">
              Zeno Rocha is a Brazilian creator and programmer. He currently lives in San Francisco, California, where
              he's the Founder & CEO at Resend. His lifelong appreciation for building software and sharing knowledge
              led him to speak in over 110 conferences worldwide. His passion for open source put him on the top 20 most
              active users on GitHub at age 22. Before moving to the US, Zeno developed multiple applications, mentored
              startups, and worked at major companies in Latin America, such as Globo and Petrobras.
            </div>
            <div className="flex gap-4">
              <Button variant="outline" size="sm">
                <ClipboardCopy className="w-4 h-4 mr-2" />
                Copy Bio
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download Headshot
              </Button>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Career</h2>
          </section>
        </div>
      </main>
  )
}

