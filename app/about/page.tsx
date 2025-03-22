'use client'

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { UnderConstruction } from "@/components/under-construction"
import { CommandButton } from '@/components/CommandButton'
import profilePhoto from '@/assets/michelle pink scarf icon.png'
import headshot from '@/assets/Michelle.Lawson.png'
import Image from 'next/image' 
import { Button } from '@/components/ui/button'
import { ClipboardCopy, Download } from 'lucide-react'
import Link from 'next/link'


export default function About() {
  const bioText = `Michelle Lawson is a Top Voice in Educational Technology recognized by LinkedIn. With over 150,000 followers across various social media platforms, she has established herself as a leading figure in the field. An accomplished author, Michelle has written multiple books that use "girly" metaphors and analogies to make complex computer science concepts more engaging. As an undergraduate researcher, she has published papers with the American Society of Engineering Education, focusing on Computer Science education. Michelle also curates a strong collection of educational resources designed to help students succeed in their STEM degrees.`;

  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          Inspire. Educate. Create.
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
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  console.log('Headshot source:', headshot.src);
                  // Create a link element
                  const link = document.createElement('a');
                  link.href = headshot.src;
                  link.download = 'Michelle-Lawson-Headshot.png';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Headshot
              </Button>
            </div>
          </section>

          <section className="space-y-8">
  <h2 className="text-2xl font-bold">My Journey</h2>

  <div className="space-y-12">
    <div className="space-y-3">
      <h3 className="text-xl font-bold">The Beginning: Smith College & Research</h3>
      <div className="text-neutral-500">
        2022 — Present
      </div>
      <p className="text-neutral-400 leading-relaxed">
        In 2022, I was awarded over <span className="text-white">$300,000</span> in scholarships to attend <span className="text-white">Smith College</span> and study <span className="text-white">Computer Science</span>. 
        By 2023, I had joined a research team in <span className="text-white">computer science education</span>, working with <span className="text-white">Pablo Frank Bolton and Liberty Lehr</span> as the team’s <span className="text-white">statistician</span>. We investigated a more effective way to assess STEM students, developing the <span className="text-white">Justified Multiple Choice Question (JMCQ) Effect</span>. Our research was recognized by the <span className="text-white">American Society of Engineering Education</span>, where we presented our findings.
      </p>
    </div>

    <div className="space-y-3">
      <h3 className="text-xl font-bold">Diving Into Finance & Equity Research</h3>
      <div className="text-neutral-500">
        Spring 2023 — 2024
      </div>
      <p className="text-neutral-400 leading-relaxed">
        While I was deep into computer science, I couldn’t shake my long-standing interest in <span className="text-white">finance</span>. So in <span className="text-white">Spring 2023</span>, I took my first step into the field through <span className="text-white">stock pitch competitions</span>. 
        Along the way, I worked under the mentorship of a former <span className="text-white">Morgan Stanley VP</span>, gaining insights into unconventional approaches to <span className="text-white">equity research</span>. This experience sharpened my ability to blend <span className="text-white">quantitative and qualitative analysis</span>.
      </p>
    </div>

    <div className="space-y-3">
      <h3 className="text-xl font-bold">Building a Global Tech Community</h3>
      <div className="text-neutral-500">
        Summer 2023 — Present
      </div>
      <p className="text-neutral-400 leading-relaxed">
        In the summer of 2023, I started doing something that changed my life: <span className="text-white">creating content</span>. What started as a simple way to share my love for <span className="text-white">computer science</span> on TikTok quickly turned into a movement, reaching <span className="text-white">millions of people</span> around the world.  
        Soon after, I founded <span className="text-white">Computer Science Girlies</span>, a vibrant community dedicated to supporting young women in tech. 
      </p>
    </div>

    <div className="space-y-3">
      <h3 className="text-xl font-bold">Startups, AI, and the Future</h3>
      <div className="text-neutral-500">
        Summer 2024 — Present
      </div>
      <p className="text-neutral-400 leading-relaxed">
        In Summer 2024, I immersed myself in the world of <span className="text-white">startups</span> and <span className="text-white">AI</span>. I joined <span className="text-white">The Residency</span>, a startup incubator, while living at <span className="text-white">Harvard St. Commons</span>. At the same time, I started studying <span className="text-white">Machine Learning</span> at <span className="text-white">MIT’s Breakthrough Tech</span>, a program that continues to push my technical expertise forward.  
    </p>
    </div>

    <div className="space-y-3">
      <h3 className="text-xl font-bold">Where I'm Headed Next</h3>
      <div className="text-neutral-500">
        Summer 2025 — Future
      </div>
      <p className="text-neutral-400 leading-relaxed">
        This journey—spanning <span className="text-white">research, finance, startups, AI, and content creation</span>—has given me a unique skill set that allows me to analyze things <span className="text-white">technologically</span>, but still understand them from a <span className="text-white">business and psychological</span> point of view.  
        In Summer 2025, I’ll be bringing all of these perspectives together as a <span className="text-white">Product Management Intern at MongoDB</span>. I’m especially excited about their advancements in <span className="text-white">AI and vector search</span>, and I can’t wait to contribute to the next wave of AI-powered innovation.  
        Whatever comes next, one thing is certain—I’ll keep building, learning, and finding new ways to make an impact.
      </p>
    </div>
  </div>
</section>

        </div>
      </main>
  )
}

