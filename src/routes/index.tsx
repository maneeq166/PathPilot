import { createFileRoute, useRouter } from '@tanstack/react-router'
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import HeroSection from '@/components/HeroSection'
import { FinalCTA } from '@/components/FinalCTA'
import { ProgressTracking } from '@/components/ProgressTracking'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

// Font used: Space Grotesk (Display), Space Mono (Technical)

function LandingPage() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div 
      className="min-h-screen bg-[#030304] text-gray-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-100 overflow-x-hidden relative"
      onMouseMove={handleMouseMove}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }
        .grid-bg {
          background-size: 50px 50px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
      `}</style>

      {/* Interactive Background System */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_400px_at_var(--x)_var(--y),rgba(6,182,212,0.1),transparent_80%)]"
          style={{
            '--x': useMotionTemplate`${mouseX}px`,
            '--y': useMotionTemplate`${mouseY}px`,
          }}
        />
        {/* Floating Atmospheric Shapes */}
        <motion.div 
          animate={{ 
            y: [0, -50, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-900/20 blur-[100px] rounded-full mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            y: [0, 50, 0],
            x: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/20 blur-[120px] rounded-full mix-blend-screen"
        />
      </div>

      {/* Navigation HUD */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center border-b border-white/5 bg-[#030304]/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-cyan-500 rounded-sm animate-pulse" />
          <span className="font-display font-bold text-xl tracking-tight text-white">PathPilot</span>
        </div>
        <div className="hidden md:flex gap-8 font-mono text-xs uppercase tracking-widest text-gray-500">
          <span>Sys.Status: Online</span>
          <span>Build: v2.4.0</span>
        </div>
        <Button 
          variant="outline" 
          className="rounded-none border-cyan-900/50 text-cyan-500 hover:bg-cyan-950/30 hover:text-cyan-400 font-mono text-xs uppercase tracking-wider"
        >
          Access Terminal
        </Button>
      </nav>

      <main className="relative z-10 pt-0">
        <HeroSection />
        <ResumeIntelligence />
        <JobMatchSystem />
        <InterviewTelemetry />
        <ProgressTracking />
        <FinalCTA />
      </main>

      {/* Fixed UI Overlay */}
      <div className="fixed bottom-8 left-8 hidden lg:block z-40 mix-blend-difference">
        <div className="flex flex-col gap-1 font-mono text-[10px] text-gray-500 uppercase">
          <span>Coords: 34.0522° N, 118.2437° W</span>
          <span>Mem: 42%</span>
          <span>Net: Secure</span>
        </div>
      </div>
    </div>
  )
}



function ResumeIntelligence() {
  return (
    <section className="py-32 border-t border-white/5 relative">
      <div className="px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="order-2 md:order-1 relative group">
           {/* Code/JSON visual */}
           <div className="bg-[#0A0A0B] border border-white/10 p-6 font-mono text-xs text-gray-500 overflow-hidden relative rounded-lg">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-transparent" />
             <pre className="opacity-70 group-hover:opacity-100 transition-opacity">
{`{
  "candidate_id": "usr_892",
  "parsing_status": "COMPLETE",
  "extracted_entities": {
    "skills": ["React", "TypeScript", "Node.js"],
    "experience_vectors": [
      { "role": "Frontend Dev", "duration": "2y" }
    ],
    "gaps_identified": true
  },
  "ats_score": 88
}`}
             </pre>
             <div className="absolute bottom-4 right-4 text-green-500 animate-pulse">● PARSED</div>
           </div>
           {/* Overlapping Element */}
           <motion.div 
             initial={{ x: 50, opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
             viewport={{ once: true }}
             className="absolute -bottom-6 -right-6 bg-white text-black p-6 w-48 shadow-2xl z-10"
           >
             <div className="font-display font-bold text-xl mb-1">Structured Profile</div>
             <div className="font-mono text-[10px] leading-tight text-gray-600">RAW DATA CONVERTED TO ACTIONABLE INSIGHTS</div>
           </motion.div>
        </div>

        <div className="order-1 md:order-2 flex flex-col justify-center">
          <SectionTag>RESUME INTELLIGENCE</SectionTag>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-6">
            Beyond Keywords. <br />
            <span className="text-gray-600">Deep Extraction.</span>
          </h2>
          <p className="font-mono text-gray-400 text-sm leading-loose max-w-md">
            The system doesn't just read; it understands. Upload your resume to extract skills, 
            experience, and role alignment data into a structured profile optimized for 
            modern ATS algorithms.
          </p>
        </div>
      </div>
    </section>
  )
}

function JobMatchSystem() {
  const jobs = [
    { role: "Frontend Engineer", company: "Vercel", match: 98 },
    { role: "UI/UX Designer", company: "Linear", match: 85 },
    { role: "Product Engineer", company: "Raycast", match: 92 },
  ]

  return (
    <section className="py-32 bg-white/[0.02] border-y border-white/5">
      <div className="px-6 md:px-12 lg:px-24">
        <div className="mb-16">
          <SectionTag>ALGORITHMIC MATCHING</SectionTag>
          <h2 className="font-display text-4xl md:text-6xl text-white max-w-3xl">
            Focus on relevance. <br/>
            Ignore the noise.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {jobs.map((job, i) => (
            <motion.div 
              key={i}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black/40 border border-white/10 p-6 hover:border-cyan-500/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-display text-xl text-white">{job.role}</h3>
                  <p className="font-mono text-xs text-gray-500">{job.company}</p>
                </div>
                <div className="text-right">
                  <span className="block font-mono text-2xl text-cyan-400">{job.match}%</span>
                  <span className="text-[10px] text-gray-600 uppercase">Fit Score</span>
                </div>
              </div>

              <div className="w-full bg-gray-800 h-1 mt-4 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${job.match}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-cyan-500" 
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function InterviewTelemetry() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-900/10 to-transparent pointer-events-none" />
      
      <div className="px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <SectionTag>VOCAL TELEMETRY</SectionTag>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-8">
            Quantify your <br/>
            communication.
          </h2>
          <ul className="space-y-6 font-mono text-sm text-gray-400">
            <li className="flex items-center gap-4">
              <span className="w-2 h-2 bg-cyan-500 rounded-full" />
              Real-time Speech-to-Text conversion
            </li>
            <li className="flex items-center gap-4">
              <span className="w-2 h-2 bg-indigo-500 rounded-full" />
              Pace & Clarity Analysis (WPM)
            </li>
            <li className="flex items-center gap-4">
              <span className="w-2 h-2 bg-purple-500 rounded-full" />
              Filler Word Detection ("Um", "Like")
            </li>
          </ul>
        </div>

        <div className="lg:col-span-7 relative">
          {/* Audio Visualization */}
          <div className="border border-white/10 bg-black/50 backdrop-blur-sm p-8 rounded-xl relative overflow-hidden">
            <div className="flex items-end justify-between gap-1 h-32 mb-6 opacity-80">
              {[...Array(20)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: ["20%", "80%", "40%"] }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    delay: i * 0.05,
                    repeatType: "reverse" 
                  }}
                  className="w-full bg-gradient-to-t from-cyan-500 to-indigo-500 rounded-t-sm opacity-60"
                />
              ))}
            </div>
            
            <div className="flex justify-between items-center border-t border-white/10 pt-4 font-mono text-xs">
              <span className="text-red-400">DETECTED: "Umm" (3x)</span>
              <span className="text-green-400">CLARITY: High</span>
              <span className="text-cyan-400">PACE: 135 WPM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --- Utility Components --- */

function SectionTag({ children }) {
  return (
    <div className="font-mono text-xs text-cyan-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
      <span className="w-4 h-px bg-cyan-500" />
      {children}
    </div>
  )
}

function GlassCard({ className, label, value, color, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={cn(
        "bg-black/40 backdrop-blur-md border border-white/10 px-6 py-4 rounded-lg shadow-xl", 
        className
      )}
    >
      <div className="font-mono text-[10px] text-gray-500 uppercase mb-1">{label}</div>
      <div className={cn("font-display text-xl font-bold", color)}>{value}</div>
    </motion.div>
  )
}