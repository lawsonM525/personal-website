'use client'

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Resources() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showTrail, setShowTrail] = useState(false);
  const [hitCount, setHitCount] = useState(137);
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    // Cursor trail effect
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setShowTrail(true);
      setTimeout(() => setShowTrail(false), 200);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
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
      window.removeEventListener('mousemove', handleMouseMove);
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
      
      {/* Cursor trail effect */}
      {showTrail && (
        <div 
          className="fixed pointer-events-none z-50 w-6 h-6 rounded-full"
          style={{ 
            background: 'radial-gradient(circle, rgba(255,105,180,0.8) 0%, rgba(255,105,180,0) 70%)',
            left: `${cursorPosition.x}px`, 
            top: `${cursorPosition.y}px`,
            transform: 'translate(-50%, -50%)',
            mixBlendMode: 'screen'
          }}
        />
      )}
      
      {/* Y2K scanlines and noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-5" 
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.2) 1px,
            transparent 1px,
            transparent 2px
          )`
        }}
      />
      
      <Nav />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Y2K browser-style header */}
        <div className="bg-gradient-to-r from-purple-800 to-blue-900 mb-8 rounded-t-lg border-b-2 border-white/20 p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
          </div>
          <div className="font-mono text-white/80 text-sm">{currentTime}</div>
        </div>
        
        <div className="bg-black/80 backdrop-blur-sm rounded-b-lg border-2 border-pink-500/30 p-6 mb-10">
          {/* Y2K Window-style Title */}
          <div className="overflow-hidden mb-8">
            <div className="marquee whitespace-nowrap">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text inline-block">
                ★彡 mia's resources 彡★ ⋆｡°✩ mia's resources ✩°｡⋆ ★彡 mia's resources 彡★ ⋆｡°✩ mia's resources ✩°｡⋆
              </h1>
            </div>
          </div>
          
          <div className="pixel-border mb-8 p-4 bg-gradient-to-r from-pink-900/30 to-purple-900/30">
            <p className="text-center text-lg">
              for learning faster, coding smarter, and living your best life 🙂‍↕️
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResourceCard 
                title="JobRight AI Agent"
                description="first ever auto-applying AI job agent that applies to jobs for you"
                link="https://jobright.ai/ai-agent?utm_id=agent&utm_source=1021&utm_campaign=michelle"
                isNew={true}
              />
              <ResourceCard 
                title="CS Girlies Discord"
                description="a super warm, hyper-friendly community of Gen Z women in tech"
                link="https://csgirlies.com"
                isHot={true}
              />
            </div>
          </ResourceSection>
        </div>
        
        {/* Resources in Y2K style grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            {/* Textbooks Y2K Section */}
            <ResourceSection 
              title="My Textbooks" 
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

function ResourceSection({ 
  title, 
  emoji, 
  children,
  textColor = "text-white",
  borderColor = "pink" 
}: { 
  title: string, 
  emoji: string, 
  children: React.ReactNode,
  textColor?: string,
  borderColor?: string
}) {
  const getBorderClass = () => {
    switch(borderColor) {
      case 'blue': return 'from-blue-500 to-cyan-500';
      case 'purple': return 'from-purple-500 to-indigo-500';
      case 'pink':
      default: return 'from-pink-500 to-purple-500';
    }
  };

  return (
    <section className="mb-10">
      {/* Y2K style header with pixel border */}
      <div className="mb-4">
        <div className={`h-2 bg-gradient-to-r ${getBorderClass()} mb-1`} style={{
          backgroundImage: 'linear-gradient(90deg, var(--tw-gradient-stops)), linear-gradient(90deg, black 25%, transparent 25%, transparent 50%, black 50%, black 75%, transparent 75%, transparent)',
          backgroundSize: '100% 100%, 8px 8px',
        }}></div>
        
        <div className="flex items-center mb-1">
          <span className="text-3xl mr-2">{emoji}</span>
          <h2 className={`text-2xl font-bold ${textColor} glitch`}>{title}</h2>
          <span className="ml-2 blink text-xl">★</span>
        </div>
        
        <div className={`h-2 bg-gradient-to-r ${getBorderClass()} mt-1`} style={{
          backgroundImage: 'linear-gradient(90deg, var(--tw-gradient-stops)), linear-gradient(90deg, black 25%, transparent 25%, transparent 50%, black 50%, black 75%, transparent 75%, transparent)',
          backgroundSize: '100% 100%, 8px 8px',
        }}></div>
      </div>
      
      <div className="space-y-4">
        {children}
      </div>
    </section>
  )
}

function ResourceCard({ 
  title, 
  description, 
  link, 
  isNew, 
  isHot 
}: { 
  title: string, 
  description: string, 
  link: string,
  isNew?: boolean,
  isHot?: boolean
}) {
  return (
    <div className="group">
      <div className="bg-gradient-to-r from-pink-800/30 to-purple-800/30 p-[2px] rounded-md">
        <div className="bg-black rounded-md p-4 hover:bg-black/80 transition-all duration-200">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold">{title}</h3>
            
            {isNew && (
              <span className="blink px-2 py-0.5 text-xs rounded bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold">
                NEW!
              </span>
            )}
            
            {isHot && (
              <span className="blink px-2 py-0.5 text-xs rounded bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold">
                HOT!
              </span>
            )}
          </div>
          
          <p className="text-gray-300 text-sm mb-4">{description}</p>
          
          <Link 
            href={link} 
            target="_blank" 
            className="inline-flex items-center text-pink-400 hover:text-pink-300 text-sm group-hover:underline"
          >
            <span className="mr-1">→</span>
            <span>enter site</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
