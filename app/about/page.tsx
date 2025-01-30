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
  const bioText = `Michelle Lawson is a Top Voice in Educational Technology recognized by LinkedIn. With over 150,000 followers across various social media platforms, she has established herself as a leading figure in the field. An accomplished author, Michelle has written multiple books that use "girly" metaphors and analogies to make complex computer science concepts more engaging. As an undergraduate researcher, she has published papers with the American Society of Engineering Education, focusing on Computer Science education. Michelle also curates a strong collection of educational resources designed to help students succeed in their STEM degrees.`;

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
              Hi! I'm Michelle Lawson <span className="inline-block">👋</span> I'm a Computer Science student, building a community of 150,000+ women in CS.
            </p>
            <p className="text-neutral-400">
              I'm the <span className="text-white">Founder</span> of <span className="text-white">Computer Science Girlies</span>, a global movement empowering Gen Z women in CS through content, connections, and career opportunities. I've worked on <span className="text-white">machine learning, product management, and quantitative research</span>, and I've spoken at major tech conferences like TechCrunch Disrupt and Columbia Devfest.
            </p>
            <p className="text-neutral-400">
              I love <span className="text-white">building things that inspire and educate</span>, from viral Comp Sci content to AI-driven projects. When I'm not working, I'm probably <span className="text-white">reading about behavioral psychology, art journaling, or writing poetry by a pond</span>.
            </p>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Bio</h2>
            <p className="text-sm text-neutral-400">
              This is made for journalists, podcast hosts, and event organizers to copy-and-paste.
            </p>
            <div className="bg-neutral-900 p-6 rounded-lg text-neutral-400 italic">
                {bioText}
            </div>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(bioText);
                }}
              >
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

