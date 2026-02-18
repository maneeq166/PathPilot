import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Font used: Space Grotesk (Headlines), JetBrains Mono (Data/UI)

export function FinalCTA() {
  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-white selection:bg-red-500/30 selection:text-red-200 border-t border-white/5">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@100..800&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        .grid-pattern {
          background-size: 60px 60px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
      `}</style>

      {/* Atmospheric Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
        {/* Animated Scanline */}
        <motion.div 
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent w-full"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-5xl px-6 w-full text-center">
        
        {/* Locked Status Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8 px-4 py-2 border border-red-500/20 bg-red-500/5 rounded-full"
        >
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-xs text-red-400 tracking-widest uppercase">
            Metrics_Locked
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-16 text-neutral-200"
        >
          CAREER INTELLIGENCE <br />
          <span className="text-neutral-600">NOT INITIALIZED</span>
        </motion.h2>

        {/* Progress Visualization */}
        <div className="w-full max-w-2xl mb-16 relative">
          <div className="flex justify-between items-end mb-4 font-mono text-xs text-neutral-500 uppercase tracking-widest">
            <span>Analysis_Protocol</span>
            <span>0% Complete</span>
          </div>
          
          {/* Progress Bar Container */}
          <div className="h-12 w-full border border-neutral-800 bg-neutral-900/50 relative overflow-hidden backdrop-blur-sm group">
            {/* Grid overlay on bar */}
            <div className="absolute inset-0" 
                 style={{ backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(0,0,0,1) 50%)', backgroundSize: '4px 100%' }} 
            />
            
            {/* The "Attempting to load" animation */}
            <motion.div 
              animate={{ width: ["0%", "15%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
              className="h-full bg-red-500/20 relative border-r border-red-500/50"
            >
               <div className="absolute inset-0 bg-red-500/10 animate-pulse" />
            </motion.div>

            {/* Locked Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-mono text-sm text-neutral-600 tracking-[0.5em] animate-pulse">
                WAITING_FOR_DATA...
              </span>
            </div>
          </div>
          
          <p className="mt-6 font-mono text-sm text-neutral-400 max-w-lg mx-auto">
            System ready. Upload resume to unlock your Career Intelligence Score and generate baseline matching vectors.
          </p>
        </div>

        {/* CTA Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <a href="/analysis/upload">
            <Button 
              size="lg"
              className="h-20 px-12 bg-white text-black hover:bg-neutral-200 rounded-none relative group overflow-hidden transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-red-500 group-hover:bg-green-500 transition-colors duration-300" />
              <div className="flex flex-col items-start gap-1">
                <span className="font-display font-bold text-xl tracking-tight uppercase">
                  Begin Analysis
                </span>
                <span className="font-mono text-[10px] text-neutral-500 group-hover:text-black/60 transition-colors uppercase tracking-widest">
                  Unlock_Score
                </span>
              </div>
              <div className="ml-8 text-2xl group-hover:translate-x-2 transition-transform duration-300">
                →
              </div>
            </Button>
          </a>
        </motion.div>

        {/* System Footer */}
        <div className="mt-24 w-full flex flex-col md:flex-row justify-between items-center border-t border-neutral-900 pt-8 font-mono text-[10px] text-neutral-600 uppercase tracking-wider">
           <div className="flex gap-4">
             <span>SECURE_UPLOAD</span>
             <span>AES_256</span>
           </div>
           <div className="mt-4 md:mt-0">
             PATHPILOT_SYSTEM_V2
           </div>
        </div>

      </div>
    </section>
  );
}