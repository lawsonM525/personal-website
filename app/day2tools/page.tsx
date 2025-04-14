'use client'

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Day2Tools() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showTrail, setShowTrail] = useState(false);
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
                ★彡 vibe coding 彡★ ⋆｡°✩ day 2 tools ✩°｡⋆ ★彡 vibe coding 彡★ ⋆｡°✩ have a fun day! ✩°｡⋆
              </h1>
            </div>
          </div>
        </div>
        
        {/* Main content with Y2K aesthetic */}
        <div className="bg-gradient-to-r p-[2px] from-pink-500/40 to-purple-500/40 rounded-lg">
          <div className="bg-black/80 backdrop-blur-sm p-8 rounded-lg">
            <div className="mb-6 text-lg text-gray-300 leading-relaxed">
              <p className="mb-4 text-center text-xl text-pink-400 font-bold">hey love,</p>
              <p className="mb-6">you asked for the tools i used — here's the full list with links and how i used each one to build my lil app:</p>
              <hr className="border-pink-500/30 my-6" />

              <div className="space-y-8">
                <Tool 
                  name="lovable"
                  url="https://lovable.dev"
                  description="i use this for frontend *but* it's honestly good for way more than that. it helps you whip up a super quick MVP for almost any idea. and it just… looks good. like i'll be tweaking the code and seeing live previews and i'm like oh okayyy. it gives &quot;cute, functioning, and ready to demo.&quot;"
                />
                
                <Tool 
                  name="windsurf"
                  url="https://codeium.com/windsurf"
                  description="this is my code editor. it's clean, ai-powered, and tracks how much you've been coding which is lowkey motivating (and kinda exposing). you could use Cursor instead, but windswept me prefers windsurf."
                  isHot={true}
                />
                
                <Tool 
                  name="mistral 7b"
                  url="https://mistral.ai"
                  description="i use this for my AI model — especially for bots and chat features. it's free, open-source, and light enough to actually run fast. perfect if you want your app to say things that sound like a person and not like a weird robot."
                />
                
                <Tool 
                  name="huggingface"
                  url="https://huggingface.co"
                  description="this is where i grab my models. i got mistral here, but you can also find models like Deepseek, LLama, and a bunch of other open-source options. great for experimenting with different AI brains till you find *your guy*."
                />
                
                <Tool 
                  name="cron-job.org"
                  url="https://cron-job.org"
                  description="super simple tool to run cron jobs — like &quot;send a reminder email every morning&quot; or &quot;ping my API once a day.&quot; no frills, just functional."
                />
                
                <Tool 
                  name="claude (via anthropic)"
                  url="https://www.anthropic.com"
                  description="i used Claude to help me figure out my database schema. it was actually so helpful — i just described what my app does and it gave me the whole schema layout, normalized and everything. like… okay architect!!"
                  isNew={true}
                />
                
                <Tool 
                  name="supabase"
                  url="https://supabase.com"
                  description="this is where my actual database lives. super dev-friendly, realtime features, works well with Claude's schema suggestions. it's giving postgres, but make it ✨modern✨."
                />
                
                <Tool 
                  name="giphy api"
                  url="https://developers.giphy.com"
                  description="because what is life without gifs??? i used the Giphy API to sprinkle a lil joy into the app. great for reaction gifs, mood boards, or just making your interface feel alive."
                />
              </div>
              
              <hr className="border-pink-500/30 my-6" />
              
              <p className="mb-4">if you want to build something like this or just wanna vibe-code together, lemme know. i'll send you links, tips, and whatever else you need.</p>
              
              <p className="text-pink-400 mt-8">
                talk soon,<br />
                michelle 🦩
              </p>
            </div>
          </div>
        </div>
        
        {/* Y2K Footer */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-pink-900/40 to-purple-900/40 p-[2px] rounded-lg">
            <div className="bg-black/80 px-5 py-3 rounded-lg">
              <div className="flex items-center gap-1 text-xs text-gray-400 justify-center">
                <img src="data:image/gif;base64,R0lGODlhEAAQAPcAAAAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBVZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDVmQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMrzDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YrAGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaqM2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmAmZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9VM/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//VZv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAACH5BAEAAPwALAAAAAAQABAAAAhuAPcJHDjQgcGDCA0mPLjQ4MKGDgke9AKRy6GLGDNq3DhwikaOHC2CHEmypEaLJ1GuFKmS4kuVMGPKnAlzps2XNHPS3JnTJk+ZMH/qDEpT6NCiPpMSTbp0qVOmTJ8ytRmSatWrWLNq3cq1q9d8AQEAOw==" alt="Y2K icon" width="16" height="16" className="mr-1" />
                <span className="blink">~*~*~ secret page ~*~*~</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

function Tool({ 
  name, 
  url, 
  description,
  isNew,
  isHot
}: { 
  name: string; 
  url: string; 
  description: string;
  isNew?: boolean;
  isHot?: boolean;
}) {
  return (
    <div className="group">
      <div className="bg-gradient-to-r from-pink-800/30 to-purple-800/30 p-[2px] rounded-md">
        <div className="bg-black/60 rounded-md p-5 hover:bg-black/40 transition-all duration-200">
          <div className="flex flex-wrap justify-between items-start mb-2 gap-3">
            <h3 className="text-xl font-bold text-white glitch">{name}</h3>
            
            <div className="flex items-center gap-2">
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
              
              <Link 
                href={url} 
                target="_blank" 
                className="inline-flex items-center text-pink-400 hover:text-pink-300 text-sm px-2 py-1 bg-black/50 rounded-md hover:bg-black/70 transition-colors"
              >
                <span className="mr-1">→</span>
                <span>visit</span>
              </Link>
            </div>
          </div>
          
          <p className="text-gray-300 text-base">{description}</p>
        </div>
      </div>
    </div>
  )
}
