'use client'

import { ResourceSection, ResourceCard } from "@/components/resource-catalog"
import { Footer } from "@/components/footer"
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Resources() {
  const [hitCount, setHitCount] = useState(137);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Update time
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Custom Y2K animations */}
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        .blink {
          animation: blink 1.2s infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .marquee {
          animation: marquee 20s linear infinite;
        }

        @keyframes glitch {
          0% { text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; }
          25% { text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
          50% { text-shadow: -1px 0 #ff00ff, 1px 0 #00ffff; }
          75% { text-shadow: 1px 0 #ff00ff, -1px 0 #00ffff; }
          100% { text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; }
        }
        .glitch {
          animation: glitch 3s infinite;
        }

        .pixel-border {
          position: relative;
          border-style: solid;
          border-width: 3px;
          border-image-slice: 2;
          border-image-width: 2;
          border-image-outset: 0;
          border-image-source: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='6' height='6'><path d='M0 2h2v2H0zM2 0h2v2H2zM4 2h2v2H4zM2 4h2v2H2z' fill='%23ff56c1' /></svg>");
          border-image-repeat: stretch;
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="bg-black/80 backdrop-blur-sm rounded-b-lg border-2 border-pink-500/30 p-6 mb-10">
          {/* Y2K Window-style Title */}
          <div className="overflow-hidden mb-8">
            <div className="marquee whitespace-nowrap">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text inline-block">
                Resources
              </h1>
            </div>
          </div>

          <div className="pixel-border mb-8 p-4 bg-gradient-to-r from-pink-900/30 to-purple-900/30">
            <p className="text-center text-lg">
              for learning more, building faster, and living your best life 🙂‍↕️
            </p>
          </div>
        </div>

        {/* Featured Section */}
        <div className="mb-12">
          <ResourceSection 
            title="Featured" 
            emoji="⭐" 
            textColor="text-yellow-300"
            borderColor="pink"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResourceCard 
                title="Windsurf"
                description="my editor — I use Windsurf every day and I LOVE it; vibe coding that helps me brainstorm + build"
                link="https://windsurf.com/refer?referral_code=cdbb51b0b0"
                isHot={true}
              />
              <ResourceCard 
                title="Google Notebook LM"
                description="my new fave tool for learning anything faster w/ generative AI"
                link="https://notebooklm.google.com"
                isNew={true}
              />
              <ResourceCard 
                title="Datafast (datafa.st)"
                description="website analytics that lets you track who visits your website or project — very fun and very informative 🙂‍↕️"
                link="https://datafa.st/?via=michelle"
                isHot={true}
              />
            </div>
          </ResourceSection>
        </div>

        {/* AI tools (moved from Day 2 Tools) */}
        <ResourceSection 
          title="AI tools" 
          emoji="🤖" 
          textColor="text-pink-300"
          borderColor="purple"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ResourceCard 
              title="Lovable"
              description="frontend builder that helps you spin up cute, working MVPs fast — with live previews"
              link="https://lovable.dev"
            />
            <ResourceCard 
              title="Gamma"
              description="use AI to make presentations and pitch decks super quick"
              link="https://gamma.app?utm_content=michelle&utm_source=instagram&utm_campaign=evergreen"
            />
            <ResourceCard 
              title="Windsurf"
              description="my editor — I use Windsurf a lot and I LOVE it; clean, AI-powered editor that makes vibe coding and shipping faster"
              link="https://codeium.com/windsurf"
              isHot={true}
            />
            <ResourceCard 
              title="Mistral 7B"
              description="lightweight open-source LLM that’s fast and great for bots and chat features"
              link="https://mistral.ai"
            />
            <ResourceCard 
              title="Hugging Face"
              description="the model hub — find and experiment with open-source AI models"
              link="https://huggingface.co"
            />
            <ResourceCard 
              title="Claude (via Anthropic)"
              description="I use Claude a lot — and Claude Code as a great CLI. Lately, GPT-5 has been outperforming Claude, so I pair GPT-5 with Windsurf."
              link="https://www.anthropic.com"
              isNew={true}
            />
            <ResourceCard 
              title="MongoDB"
              description="my go-to NoSQL database (ex-MongoDB PM intern) — flexible docs and scales well"
              link="https://www.mongodb.com"
            />
          </div>
        </ResourceSection>

        {/* Resources in Y2K style grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            {/* Textbooks Y2K Section */}
            <ResourceSection 
              title="My Textbooks (FREE!)" 
              emoji="📘" 
              textColor="text-blue-300"
              borderColor="pink"
            >
              <ResourceCard 
                title="Girly Guide to AI"
                description="beginner-friendly intro to artificial intelligence, with ✨vibes✨"
                link="https://michellexcomputer.gumroad.com/l/girly-guide-to-ai"
                isNew={true}
              />
              <ResourceCard 
                title="Girly Guide to Algorithms"
                description="cute but powerful breakdowns of classic algorithm concepts"
                link="https://michellexcomputer.gumroad.com/l/algorithmsforthegirlies"
              />
            </ResourceSection>

            {/* Learning Resources */}
            <ResourceSection 
              title="Learn & Think Like a Coder" 
              emoji="🧠" 
              textColor="text-purple-300"
              borderColor="blue"
            >
              <ResourceCard 
                title="Codédex"
                description="gamified coding adventures for total beginners (and girlies who love aesthetics)"
                link="https://www.codedex.io"
                isHot={true}
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
                title="CS Girlies Discord"
                description="join our community of 13,000+ Gen Z women in tech"
                link="https://csgirlies.com"
                isHot={true}
              />
            </ResourceSection>

            {/* Developer Resources */}
            <ResourceSection 
              title="Developer Resources" 
              emoji="🛠️" 
              textColor="text-cyan-300"
              borderColor="blue"
            >
              <ResourceCard 
                title="Sprite Sheet Generator"
                description="create sprite sheets for animations in websites or games - super useful for web dev projects!"
                link="https://sprite-sheet-generator.com"
                isNew={true}
              />
              <ResourceCard 
                title="cron-job.org"
                description="simple free cron scheduler for pings, reminders, and recurring tasks"
                link="https://cron-job.org"
              />
              <ResourceCard 
                title="GIPHY API"
                description="add delightful gifs and motion to your app with a simple API"
                link="https://developers.giphy.com"
              />
              <ResourceCard 
                title="Datafast (datafa.st)"
                description="website analytics that lets you track who visits your website or project — very fun and very informative 🙂‍↕️"
                link="https://datafa.st/?via=michelle"
              />
            </ResourceSection>

          </div>

          {/* Right Column */}
          <div>
            {/* Practice Resources */}
            <ResourceSection 
              title="Practice + Projects" 
              emoji="💻" 
              textColor="text-green-300"
              borderColor="purple"
            >
              <ResourceCard 
                title="Kaggle"
                description="tutorials, datasets, and competitions to get into data science & ML"
                link="https://www.kaggle.com"
              />
              <ResourceCard 
                title="LeetCode"
                description="practice coding problems and prepare for technical interviews"
                link="https://leetcode.com"
              />
              <ResourceCard 
                title="Neetcode"
                description="a very helpful DSA roadmap and lots of explainer videos for Leetcode"
                link="https://neetcode.io"
                isHot={true}
              />
              <ResourceCard 
                title="GitHub Student Pack"
                description="free developer tools and services for students"
                link="https://education.github.com/pack"
                isHot={true}
              />
            </ResourceSection>

            {/* Productivity Tools */}
            <ResourceSection 
              title="Productivity Tools" 
              emoji="⚡" 
              textColor="text-yellow-300"
              borderColor="pink"
            >
              <ResourceCard 
                title="Obsidian"
                description="my second brain, literally. perfect for taking smart notes and organizing ideas"
                link="https://obsidian.md"
              />
              <ResourceCard 
                title="Windsurf"
                description="vibe coding with an AI tool that actively helps you brainstorm + build"
                link="https://codeium.com/windsurf"
                isNew={true}
              />
              <ResourceCard 
                title="16Personalities.com"
                description="because knowing your brain helps you train your brain (I also just really like MBTI 🤭)"
                link="https://www.16personalities.com"
              />
            </ResourceSection>

            {/* Internships Section */}
            <ResourceSection 
              title="Internships + Career" 
              emoji="💼" 
              textColor="text-teal-300"
              borderColor="blue"
            >
              <ResourceCard 
                title="Intern List"
                description="curated list of newly posted internships, updated every hour!!"
                link="https://www.intern-list.com"
                isNew={true}
              />
              <ResourceCard 
                title="Levels.fyi"
                description="compare career levels and compensation across companies"
                link="https://www.levels.fyi"
              />
              <ResourceCard 
                title="Tech Interview Handbook"
                description="prepare for coding interviews with free guides and resources"
                link="https://www.techinterviewhandbook.org"
              />
            </ResourceSection>
          </div>
        </div>

        {/* Y2K Guestbook and stats section */}
        <div className="mt-16 mb-8">
          <div className="bg-black border-2 border-dashed border-pink-500/50 p-4 rounded-lg">
            <div className="text-center">
              <p className="text-lg mb-2 font-bold">~*~*~ Thanks for visiting my resources page! ~*~*~</p>
              <div className="mt-4 flex justify-center gap-4 flex-wrap">
                <div className="pixel-border bg-black/50 px-4 py-2">
                  <p className="text-sm text-gray-400">
                    <span className="font-mono bg-gray-800 px-2 py-1 rounded mr-2">
                      {String(hitCount).padStart(8, '0')}
                    </span>
                    <span className="text-pink-400">visitors</span>
                  </p>
                </div>
                <div className="pixel-border bg-black/50 px-4 py-2">
                  <p className="text-sm text-gray-400">
                    Last <span className="text-pink-400">updated</span>: April 2025
                  </p>
                </div>
                <div className="pixel-border bg-black/50 px-4 py-2">
                  <p className="text-sm text-gray-400">
                    Made with <span className="text-pink-400 blink">♥</span>
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <img src="data:image/gif;base64,R0lGODlhEAAQAPcAAAAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBVZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDVmQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMrzDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YrAGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaqM2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmAmZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9VM/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//VZv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAACH5BAEAAPwALAAAAAAQABAAAAhuAPcJHDjQgcGDCA0mPLjQ4MKGDgke9AKRy6GLGDNq3DhwikaOHC2CHEmypEaLJ1GuFKmS4kuVMGPKnAlzps2XNHPS3JnTJk+ZMH/qDEpT6NCiPpMSTbp0qVOmTJ8ytRmSatWrWLNq3cq1q9d8AQEAOw==" alt="Y2K icon" width="16" height="16" />
                  <span>Best viewed in 800x600</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
