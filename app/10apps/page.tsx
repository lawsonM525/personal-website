'use client'

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import Link from 'next/link'
import { links } from "@/data/links"
import { useState, useEffect } from 'react'

export default function TenApps() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showTrail, setShowTrail] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const completed = 1;
  const total = 10;

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
                ★彡 mia's 10 apps challenge 彡★ ⋆｡°✩ 10 apps in 10 weeks ✩°｡⋆ ★彡 mia's 10 apps challenge 彡★ ⋆｡°✩ 10 apps in 10 weeks ✩°｡⋆
              </h1>
            </div>
          </div>

          <div className="pixel-border mb-6 p-4 bg-gradient-to-r from-pink-900/30 to-purple-900/30">
            <p className="text-center text-lg">
              launching 10 apps in 10 weeks. currently <span className="text-pink-300 font-semibold">{completed}/{total}</span> shipped.
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/10 rounded h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-3"
              style={{ width: `${(completed/total)*100}%` }}
            />
          </div>
        </div>

        {/* Featured Section */}
        <div className="mb-12">
          <ResourceSection 
            title="Featured (latest)" 
            emoji="🚀" 
            textColor="text-yellow-300"
            borderColor="pink"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResourceCard 
                title="Future U"
                description="A very personalized quiz to help you go from your current self to… your future self — with exact steps to get there."
                link="https://www.future-u.app" 
                isNew={true}
              />
              <ResourceCard 
                title="Sprite Sheet Generator (mini app)"
                description="Make sprite sheets for simple web app animations. Also useful for game development (not fully optimized for games yet)."
                link="https://www.sprite-sheet-generator.com"
              />
            </div>
          </ResourceSection>
        </div>

        {/* All Apps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column */}
          <div>
            <ResourceSection 
              title="Weeks 1–5" 
              emoji="📆" 
              textColor="text-blue-300"
              borderColor="pink"
            >
              <ResourceCard 
                title="Week 1 — Future U"
                description="A personalized quiz that maps your path from current self to future self."
                link="https://www.future-u.app"
                isNew={true}
              />
            </ResourceSection>
            
            <ResourceSection 
              title="Bonus" 
              emoji="✨" 
              textColor="text-pink-300"
              borderColor="purple"
            >
              <ResourceCard 
                title="Sprite Sheet Generator (bonus mini app)"
                description="Make sprite sheets for simple web app animations. Also useful for game development (not fully optimized for games yet)."
                link="https://www.sprite-sheet-generator.com"
              />
            </ResourceSection>
          </div>

          {/* Right column */}
          <div>
            <ResourceSection 
              title="Suggest an App Idea" 
              emoji="💡" 
              textColor="text-green-300"
              borderColor="purple"
            >
              <ResourceCard 
                title="Have an idea?"
                description="Suggest what I should build next for this challenge."
                link="https://lwsnlabs.featurebase.app/?b=68b520696af10edb0d45857c"
                isHot={true}
              />
            </ResourceSection>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-16 mb-8">
          <div className="bg-black border-2 border-dashed border-pink-500/50 p-4 rounded-lg">
            <div className="text-center">
              <p className="text-lg mb-2 font-bold">~*~*~ follow along each week! ~*~*~</p>
              <div className="mt-4 flex justify-center gap-4 flex-wrap">
                <div className="pixel-border bg-black/50 px-4 py-2">
                  <p className="text-sm text-gray-400">
                    Progress: <span className="text-pink-400 font-mono">{String(completed).padStart(2, '0')}/{total}</span>
                  </p>
                </div>
                <div className="pixel-border bg-black/50 px-4 py-2">
                  <Link
                    href={links.social_media.Instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-pink-400 hover:text-pink-300"
                  >
                    Follow on Instagram
                  </Link>
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
