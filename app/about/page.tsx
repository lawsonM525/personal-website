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
            <h2 className="text-2xl font-bold">Career</h2>

            <div className="space-y-12">
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Founder & CEO</h3>
                <div>
                  <Link href="#" className="text-white hover:underline">Resend</Link>
                  <span className="text-neutral-500"> • San Francisco, California</span>
                </div>
                <div className="text-neutral-500">
                  Jan 2023 — Present • 2 yrs 0 mos
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  Building the email API platform for developers. Leading product strategy, engineering, and company vision to help developers send transactional emails with better deliverability and developer experience.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold">VP of Developer Experience</h3>
                <div>
                  <Link href="#" className="text-white hover:underline">WorkOS</Link>
                  <span className="text-neutral-500"> • Los Angeles, California</span>
                </div>
                <div className="text-neutral-500">
                  Jul 2021 — Dec 2022 • 1 yr 5 mos
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  Led developer relations and documentation teams to improve the developer experience of enterprise features like SSO and Directory Sync. Established developer advocacy programs and enhanced API documentation.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold">Chief Product Officer</h3>
                <div>
                  <Link href="#" className="text-white hover:underline">Liferay Cloud, Inc</Link>
                  <span className="text-neutral-500"> • Los Angeles, California</span>
                </div>
                <div className="text-neutral-500">
                  Jun 2018 — Jul 2021 • 3 yrs 1 mos
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  Oversaw product strategy and development of cloud infrastructure solutions. Managed multiple product teams, introduced new cloud services, and transformed the traditional enterprise software into a modern SaaS platform.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold">Principal Developer Advocate</h3>
                <div>
                  <Link href="#" className="text-white hover:underline">Liferay, Inc</Link>
                  <span className="text-neutral-500"> • Los Angeles, California</span>
                </div>
                <div className="text-neutral-500">
                  Mar 2015 — Jun 2018 • 3 yrs 3 mos
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  Drove developer adoption through technical content, conference talks, and community engagement. Created developer tools and frameworks to improve the development experience with Liferay's platform.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold">Front-end Engineer</h3>
                <div>
                  <Link href="#" className="text-white hover:underline">Liferay Latin America</Link>
                  <span className="text-neutral-500"> • Recife, Brazil</span>
                </div>
                <div className="text-neutral-500">
                  Jul 2012 — Mar 2015 • 2 yrs 8 mos
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  Developed front-end solutions and UI components for enterprise applications. Contributed to core product development and helped establish front-end best practices across the organization.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
  )
}

