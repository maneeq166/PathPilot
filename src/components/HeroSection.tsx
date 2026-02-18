import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Font used: IBM Plex Mono (Technical/Code), IBM Plex Sans (UI/Human)

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] text-[#e1e1e1] font-sans overflow-hidden flex items-center justify-center px-6 md:px-12 lg:px-24 pt-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,600;1,400&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        .font-sans { font-family: 'IBM Plex Sans', sans-serif; }
      `}</style>

      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* LEFT COLUMN: Typography & Action */}
        <motion.div style={{ y: y1, opacity }} className="flex flex-col gap-8">
          
          <div className="inline-flex items-center gap-2 border-l-2 border-green-500 pl-4">
             <span className="font-mono text-xs uppercase tracking-widest text-green-400">System Ready</span>
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          </div>

          <h1 className="font-mono text-5xl md:text-7xl font-light tracking-tighter leading-[0.9]">
            RESUME <br/>
            <span className="font-bold text-white">INTELLIGENCE</span> <br/>
            <span className="text-gray-500">PROTOCOL</span>
          </h1>

          <div className="space-y-4 max-w-md font-sans text-gray-400 text-lg leading-relaxed">
            <p>
              <strong className="text-white">PathPilot</strong> ingests your professional history, extracts key competency vectors, and algorithmically matches your profile to high-probability roles.
            </p>
            <ul className="space-y-2 font-mono text-sm text-gray-500 border-t border-gray-800 pt-4 mt-4">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> PARSE PDF/DOCX STRUCTURE
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> EXTRACT SKILL ENTITIES
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> CALCULATE ROLE FIT SCORE
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <button className="group relative px-8 py-4 bg-white text-black font-mono font-bold text-sm uppercase tracking-wider overflow-hidden">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Initiate Analysis</span>
              <div className="absolute inset-0 bg-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            <p className="mt-3 font-mono text-[10px] text-gray-600">
              * SECURE UPLOAD ENCRYPTED VIA AES-256
            </p>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Analysis Simulation Panel */}
        <div className="relative h-[600px] w-full flex items-center justify-center">
          <AnalysisTerminal />
        </div>

      </div>
    </section>
  );
};

const AnalysisTerminal = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Sequence orchestration
    const timers = [
      setTimeout(() => setStep(1), 1000), // Start scan
      setTimeout(() => setStep(2), 2500), // Extract Skills
      setTimeout(() => setStep(3), 4500), // Match Roles
      setTimeout(() => setStep(4), 6000), // Finalize
    ];

    // Score counter animation
    const scoreInterval = setInterval(() => {
        setScore(prev => {
            if (prev >= 94) {
                clearInterval(scoreInterval);
                return 94;
            }
            return prev + Math.floor(Math.random() * 5);
        });
    }, 150);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(scoreInterval);
    };
  }, []);

  return (
    <div className="w-full max-w-md bg-[#0f0f0f] border border-[#333] rounded-sm shadow-2xl overflow-hidden font-mono text-xs relative">
      {/* Terminal Header */}
      <div className="bg-[#1a1a1a] border-b border-[#333] p-2 flex justify-between items-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
        <div className="text-gray-500">user_resume.pdf — Analysis</div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 space-y-6 relative h-[500px]">
        
        {/* File Indicator */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div className="flex items-center gap-3">
                <div className="w-8 h-10 border border-gray-600 bg-gray-800 flex items-center justify-center text-[10px] text-gray-400">PDF</div>
                <div>
                    <div className="text-gray-200">jordan_smith_cv_v4.pdf</div>
                    <div className="text-gray-600">1.4 MB • Uploaded</div>
                </div>
            </div>
            <div className="text-green-500 animate-pulse">● PROCESSING</div>
        </div>

        {/* Process Steps */}
        <div className="space-y-4">
            <ProcessItem 
                label="TEXT_PARSING" 
                status={step >= 1 ? "COMPLETE" : "PENDING"} 
                active={step === 0}
                delay={0}
            />
            <ProcessItem 
                label="ENTITY_EXTRACTION (SKILLS)" 
                status={step >= 2 ? "COMPLETE" : step === 1 ? "RUNNING..." : "WAITING"} 
                active={step === 1}
                delay={0.2}
            />
            <ProcessItem 
                label="EXPERIENCE_NORMALIZATION" 
                status={step >= 3 ? "COMPLETE" : step === 2 ? "RUNNING..." : "WAITING"} 
                active={step === 2}
                delay={0.4}
            />
             <ProcessItem 
                label="ROLE_ALIGNMENT_VECTOR" 
                status={step >= 4 ? "COMPLETE" : step === 3 ? "CALCULATING..." : "WAITING"} 
                active={step === 3}
                delay={0.6}
            />
        </div>

        {/* Extracted Data Visualization (Conditional Render) */}
        <AnimatePresence>
            {step >= 2 && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-black/50 border border-gray-800 p-3 mt-2"
                >
                    <div className="text-gray-500 mb-2">// EXTRACTED_TOKENS</div>
                    <div className="flex flex-wrap gap-2">
                        {['React', 'Node.js', 'System Design', 'TypeScript', 'AWS'].map((skill, i) => (
                            <motion.span 
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-green-900/20 text-green-400 px-2 py-0.5 border border-green-900/50"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Final Result Card */}
        <AnimatePresence>
            {step >= 3 && (
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute bottom-6 left-6 right-6 bg-[#1a1a1a] border border-green-500/30 p-4 shadow-[0_0_30px_rgba(34,197,94,0.1)]"
                >
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="text-gray-500 text-[10px] uppercase mb-1">Target Role Identified</div>
                            <div className="text-xl text-white font-bold">SENIOR FRONTEND ENGINEER</div>
                        </div>
                        <div className="text-right">
                             <div className="text-3xl font-bold text-green-400">{step >= 4 ? 94 : score}%</div>
                             <div className="text-[10px] text-green-600 uppercase">Match Confidence</div>
                        </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-800 h-1 mt-3 overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${step >= 4 ? 94 : score}%` }}
                            className="h-full bg-green-500"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
      
      {/* Scan Line Animation */}
      <motion.div 
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.5)] z-20 pointer-events-none"
      />
    </div>
  );
};

const ProcessItem = ({ label, status, active, delay }) => {
    return (
        <div className="flex justify-between items-center group">
            <div className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-yellow-400 animate-pulse' : status === 'COMPLETE' ? 'bg-green-500' : 'bg-gray-700'}`}></div>
                <span className={`${active ? 'text-white' : status === 'COMPLETE' ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span>
            </div>
            <span className={`font-mono text-[10px] ${status === 'COMPLETE' ? 'text-green-500' : 'text-gray-600'}`}>
                [{status}]
            </span>
        </div>
    )
}

export default HeroSection;