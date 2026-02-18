import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// Font used: Space Grotesk (Display), JetBrains Mono (Data)

const timelineEvents = [
  {
    id: "LOG_001",
    event: "INITIAL_RESUME_UPLOAD",
    date: "2023-10-12 09:42:00",
    score: 42,
    details: "Raw data ingestion. Structure unstructured. Keywords missing.",
    status: "ANALYZED",
  },
  {
    id: "LOG_002",
    event: "MOCK_INTERVIEW_SESSION_1",
    date: "2023-10-14 14:20:15",
    score: 55,
    details: "Voice telemetry captured. Filler words detected. Pace adjustment needed.",
    status: "PROCESSED",
  },
  {
    id: "LOG_003",
    event: "SKILL_GAP_OPTIMIZATION",
    date: "2023-10-18 11:05:33",
    score: 68,
    details: "Market vector alignment. Missing entities injected. Syntax corrected.",
    status: "OPTIMIZED",
  },
  {
    id: "LOG_004",
    event: "MOCK_INTERVIEW_SESSION_5",
    date: "2023-10-25 16:45:00",
    score: 84,
    details: "Confidence metric varied. Clarity high. Response structure optimal.",
    status: "VALIDATED",
  },
  {
    id: "LOG_005",
    event: "FINAL_RESUME_COMPILE",
    date: "2023-11-01 08:30:00",
    score: 92,
    details: "ATS Compliance: 100%. Role match probability maximized.",
    status: "READY",
  },
];

export function ProgressTracking() {
  const containerRef = useRef(null);
  
  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#080808] text-gray-300 py-24 px-6 md:px-12 lg:px-24 overflow-hidden selection:bg-emerald-900/50 selection:text-emerald-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@100..800&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        .grid-bg {
            background-size: 40px 40px;
            background-image:
                linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
      `}</style>

      {/* Atmospheric Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#080808] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#080808] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Left Column: Context & Typography */}
        <div className="flex flex-col justify-center lg:sticky lg:top-24 h-fit">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             <span className="font-mono text-xs text-emerald-500 uppercase tracking-widest">
               System_Log_v2.4
             </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] text-white tracking-tighter mb-8"
          >
            INTELLIGENCE <br />
            <span className="text-gray-600">EVOLUTION</span> <br />
            TIMELINE
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-mono text-sm text-gray-400 space-y-6 max-w-md border-l border-gray-800 pl-6"
          >
            <p>
              PathPilot is not static. It is a longitudinal tracking system. 
              We store every resume version, interview transcript, and match result 
              to visualize your career readiness trajectory.
            </p>
            <ul className="space-y-2 text-xs uppercase tracking-wide text-gray-500">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500">[✓]</span> Version Control
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500">[✓]</span> Delta Analysis
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500">[✓]</span> Predictive Scoring
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Right Column: Timeline Visualization */}
        <div className="relative pl-4 lg:pl-0">
           <Timeline />
        </div>

      </div>
    </section>
  );
}

function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative py-8">
      {/* Vertical Line */}
      <div className="absolute left-[19px] top-0 bottom-0 w-[1px] bg-gray-800 h-full z-0" />
      <motion.div 
        style={{ height }}
        className="absolute left-[19px] top-0 w-[1px] bg-emerald-500 z-10 origin-top"
      />

      <div className="space-y-12 relative z-20">
        {timelineEvents.map((item, index) => (
          <TimelineNode key={item.id} data={item} index={index} />
        ))}
      </div>
    </div>
  );
}

function TimelineNode({ data, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-8 group"
    >
      {/* Node Dot */}
      <div className="flex-shrink-0 relative mt-1">
        <div className="w-10 h-10 rounded-full border border-gray-800 bg-[#080808] flex items-center justify-center relative z-20 group-hover:border-emerald-500/50 transition-colors duration-500">
            <motion.div 
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.1 + 0.2 }}
                className="w-3 h-3 bg-gray-600 rounded-full group-hover:bg-emerald-400 transition-colors duration-500" 
            />
        </div>
      </div>

      {/* Content Card */}
      <div className="flex-grow">
        <div className="border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors duration-300 relative overflow-hidden group/card">
          
          {/* Active Highlight Line */}
          <div className="absolute top-0 left-0 w-[2px] h-0 bg-emerald-500 group-hover/card:h-full transition-all duration-500 ease-in-out" />

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-white/5 pb-4">
            <div>
                <span className="font-mono text-[10px] text-gray-500 block mb-1">{data.id} // {data.date}</span>
                <h3 className="font-display text-lg text-white font-medium tracking-wide">{data.event.replace(/_/g, " ")}</h3>
            </div>
            <div className="text-right">
                <div className="flex items-end justify-end gap-1">
                    <span className="font-mono text-sm text-gray-500 mb-1">SCORE:</span>
                    <span className="font-display text-3xl font-bold text-white group-hover/card:text-emerald-400 transition-colors">
                        <CountUp end={data.score} trigger={isInView} />%
                    </span>
                </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex justify-between items-end">
            <p className="font-mono text-xs text-gray-400 leading-relaxed max-w-sm">
                {data.details}
            </p>
            <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-white/10 rounded-sm text-gray-500 group-hover/card:text-white group-hover/card:border-emerald-500/30 transition-all">
                {data.status}
            </span>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

function CountUp({ end, trigger }) {
    const [count, setCount] = React.useState(0);
    
    React.useEffect(() => {
        if (!trigger) return;
        
        let start = 0;
        const duration = 1500; // ms
        const increment = end / (duration / 16); // 60fps
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        
        return () => clearInterval(timer);
    }, [end, trigger]);

    return <>{count}</>;
}