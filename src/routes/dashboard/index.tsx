"use client";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { getResume } from "@/apis/api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

// Font used: Space Grotesk, Space Mono

function RouteComponent() {
  const token = useMemo(() => localStorage.getItem("token"), []);
  const isLoggedIn = Boolean(token);
  const [isLoading, setIsLoading] = useState(false);
  const [resume, setResume] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) return;

    const loadResume = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getResume(token);
        setResume(response?.data ?? response);
      } catch (err: any) {
        const errorMsg =
          err?.response?.data?.message || err?.message || "Unable to load resume data.";
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    loadResume();
  }, [isLoggedIn, token]);

  const aiData = resume?.parsedData || {};
  const aiEnhanced = Boolean(aiData?.aiEnhanced);
  const enhancedSkills: string[] = Array.isArray(aiData?.enhancedSkills) ? aiData.enhancedSkills : [];
  const missingSkills: string[] = Array.isArray(aiData?.missingSkills) ? aiData.missingSkills : [];
  const experienceSummary: string | null = aiData?.experienceSummary || null;
  const aiConfidence =
    typeof aiData?.confidence === "number" ? Math.max(0, Math.min(1, aiData.confidence)) : null;

  const feedback = useMemo(() => {
    const tips: string[] = [];

    if (experienceSummary) {
      tips.push(`Experience summary: ${experienceSummary}`);
    } else {
      tips.push("Add a concise experience summary with role, scope, and impact.");
    }

    if ((resume?.parsedData?.experience || []).length === 0) {
      tips.push("Add structured experience entries with dates, role, and quantified impact.");
    }

    if ((resume?.parsedData?.skills || []).length === 0) {
      tips.push("Add a focused skills section (Languages, Frameworks, Tools, Cloud).");
    } else {
      tips.push("Group skills by category and prioritize the top 10-15 most relevant.");
    }

    if (missingSkills.length) {
      tips.push(`Missing skills suggested: ${missingSkills.slice(0, 12).join(", ")}`);
    }

    if (enhancedSkills.length) {
      tips.push(`Additional skills detected: ${enhancedSkills.slice(0, 12).join(", ")}`);
    }

    return tips;
  }, [experienceSummary, enhancedSkills, missingSkills, resume]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className="min-h-screen bg-[#030304] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-100 overflow-x-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }
        
        .grid-bg {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
        
        .scanline {
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(6,182,212,0.1) 50%, rgba(6,182,212,0.1));
          background-size: 100% 4px;
        }
      `}</style>

      {/* Atmospheric Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.08),transparent_50%)]" />
        <div className="absolute inset-0 scanline opacity-30 mix-blend-overlay" />
        
        {/* Floating Intelligence Shapes */}
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-900/20 blur-[100px] rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{ y: [0, 40, 0], x: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-900/20 blur-[120px] rounded-full mix-blend-screen"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
        {/* Header / Command Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-cyan-900/30 pb-8 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
              <span className="font-mono text-[10px] text-cyan-400 tracking-[0.3em] uppercase">
                System_Status: {isLoggedIn ? 'Authorized' : 'Restricted'}
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-white leading-none">
              CAREER INTELLIGENCE <br />
              <span className="text-slate-500">COMMAND CENTER</span>
            </h1>
            <p className="font-mono text-slate-500 text-xs mt-4 uppercase tracking-widest">
              Telemetry & Data Visualization Console
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
             {isLoggedIn ? (
                <Button
                  asChild
                  className="rounded-none h-12 px-6 bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500 hover:text-black font-mono text-xs uppercase tracking-widest transition-all group overflow-hidden relative"
                >
                  <Link to="/analysis/upload">
                    <span className="relative z-10 flex items-center gap-2">
                       <span className="group-hover:animate-ping">&gt;&gt;</span> INGEST DOCUMENT
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </Link>
                </Button>
             ) : (
                <Button
                  asChild
                  variant="outline"
                  className="rounded-none h-12 px-8 border-slate-700 bg-black/50 text-slate-300 hover:bg-white hover:text-black font-mono text-xs uppercase tracking-widest transition-all"
                >
                  <Link to="/auth/login">AUTHENTICATE</Link>
                </Button>
             )}
          </div>
        </motion.div>

        {/* Not Logged In State */}
        {!isLoggedIn && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-20 flex justify-center"
          >
            <div className="border border-red-500/30 bg-red-950/10 p-8 md:p-12 text-center font-mono max-w-2xl w-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
              
              <div className="text-red-500 mb-6 text-4xl">!</div>
              <h2 className="text-xl text-red-400 mb-2 uppercase tracking-widest">Access Denied</h2>
              <p className="text-slate-400 text-sm mb-8">
                Authentication required to access career telemetry and intelligence modules. 
                Please establish identity to proceed.
              </p>
              <Button
                  asChild
                  className="rounded-none h-12 px-8 bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-black font-mono text-xs uppercase tracking-widest transition-all"
              >
                  <Link to="/auth/login">INITIALIZE LOGIN SEQUENCE</Link>
              </Button>
            </div>
          </motion.div>
        )}

        {isLoggedIn && (
          <>
            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-32 space-y-6 font-mono">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-t-2 border-cyan-500 rounded-full animate-spin" />
                  <div className="absolute inset-2 border-r-2 border-indigo-500 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
                  <div className="absolute inset-4 border-b-2 border-white/20 rounded-full animate-pulse" />
                </div>
                <div className="text-cyan-400 text-xs tracking-[0.3em] uppercase animate-pulse">
                  Scanning Data Vectors...
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="border border-red-500/40 p-6 bg-red-950/20 text-red-300 font-mono text-sm relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                <span className="text-red-500 mr-2">[ERROR]</span> {error}
              </motion.div>
            )}

            {/* Dashboard Content */}
            {resume && !isLoading && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-8"
              >
                {/* Top Row: Core Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {/* Role Classification */}
                  <motion.div variants={itemVariants} className="bg-[#0A0A0C] border border-white/10 p-6 relative group hover:border-cyan-500/30 transition-colors">
                    <div className="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                    <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="text-cyan-500">*</span> CANDIDATE CLASSIFICATION
                    </div>
                    <div className="font-display text-2xl text-white font-medium break-words leading-tight">
                      {resume?.inferredRole || "PENDING CLASSIFICATION"}
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 font-mono text-[10px] text-slate-400 uppercase">
                      STATUS: <span className="text-green-400">{resume?.processingStatus || "ACTIVE"}</span>
                    </div>
                  </motion.div>

                  {/* Skill Count */}
                  <motion.div variants={itemVariants} className="bg-[#0A0A0C] border border-white/10 p-6 relative group hover:border-indigo-500/30 transition-colors">
                    <div className="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
                       <span className="font-mono text-xs text-indigo-400">SUM</span>
                    </div>
                    <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <span className="text-indigo-500">*</span> DETECTED VECTORS
                    </div>
                    <div className="font-display text-5xl text-white font-bold my-2">
                      {resume?.parsedData?.skills?.length || 0}
                    </div>
                    <div className="pt-2 border-t border-white/5 font-mono text-[10px] text-slate-400 uppercase">
                      Recognized Skill Entities
                    </div>
                  </motion.div>

                  {/* File Info */}
                  <motion.div variants={itemVariants} className="bg-[#0A0A0C] border border-white/10 p-6 relative group hover:border-slate-500/50 transition-colors">
                     <div className="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
                       <span className="font-mono text-xs text-slate-400">./</span>
                    </div>
                    <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="text-slate-400">&gt;&gt;</span> SOURCE DOCUMENT
                    </div>
                    <div className="font-mono text-xl text-white font-medium truncate">
                      {resume?.fileMeta?.fileType?.toUpperCase() || "UNKNOWN"}
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 font-mono text-[10px] text-slate-400 truncate">
                      FILE: {resume?.fileMeta?.originalName || "unnamed_file"}
                    </div>
                  </motion.div>

                  {/* AI Confidence */}
                  <motion.div variants={itemVariants} className="bg-[#0A0A0C] border border-white/10 p-6 relative group hover:border-emerald-500/30 transition-colors">
                    <div className="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    </div>
                    <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="text-emerald-400">*</span> AI ENHANCEMENT
                    </div>
                    <div className="font-display text-2xl text-white font-medium break-words leading-tight">
                      {aiEnhanced ? "ENABLED" : "OFFLINE"}
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 font-mono text-[10px] text-slate-400 uppercase">
                      CONFIDENCE:{" "}
                      <span className="text-emerald-400">
                        {aiConfidence !== null ? `${Math.round(aiConfidence * 100)}%` : "N/A"}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Middle Row: Skills & Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Skill Vector Map */}
                  <motion.div variants={itemVariants} className="lg:col-span-7 bg-[#0A0A0C] border border-white/10 p-6 relative group">
                     <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="flex justify-between items-center mb-6">
                        <div className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                          [ SKILL_VECTOR_MAP ]
                        </div>
                        <div className="font-mono text-[10px] text-cyan-500">MAPPED</div>
                     </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {(resume?.parsedData?.skills || []).map((skill: string, idx: number) => (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          key={skill}
                          className="px-3 py-1.5 bg-cyan-950/30 border border-cyan-900/50 text-cyan-300 font-mono text-xs group/skill hover:bg-cyan-900/50 hover:border-cyan-500/50 transition-colors cursor-default"
                        >
                          <span className="text-cyan-600 mr-2 group-hover/skill:text-cyan-400">&gt;</span>
                          {skill}
                        </motion.div>
                      ))}
                      {(!resume?.parsedData?.skills || resume.parsedData.skills.length === 0) && (
                        <div className="w-full py-8 text-center border border-dashed border-white/10 font-mono text-sm text-slate-600">
                          NO SIGNAL DETECTED
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Intelligence Analysis (Feedback) */}
                  <motion.div variants={itemVariants} className="lg:col-span-5 bg-[#0A0A0C] border border-white/10 p-6 relative group">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                        <div className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                          [ INTELLIGENCE_ANALYSIS ]
                        </div>
                        <div className="font-mono text-[10px] text-indigo-400 animate-pulse">ACTIVE</div>
                     </div>
                    
                    <div className="space-y-4">
                      {(feedback.length ? feedback : ["No insights available yet."]).map((tip, index) => (
                        <div key={tip} className="flex items-start gap-3 font-mono text-xs leading-relaxed group/tip">
                          <span className="text-indigo-500/50 mt-0.5 group-hover/tip:text-indigo-400 transition-colors">-</span>
                          <div>
                            <span className="text-slate-500 block mb-1">REC_{String(index + 1).padStart(3, '0')}</span>
                            <span className="text-slate-300 group-hover/tip:text-white transition-colors">{tip}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Bottom Row: History */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Experience Timeline */}
                  <motion.div variants={itemVariants} className="bg-[#0A0A0C] border border-white/10 p-6 relative">
                    <div className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                      [ CAREER_TIMELINE ]
                    </div>
                    <div className="space-y-4 font-mono text-xs text-slate-300">
                      {(resume?.parsedData?.experience || []).map((item: string, idx: number) => (
                        <div key={`${item}-${idx}`} className="relative pl-4 border-l border-slate-800 pb-4 last:pb-0">
                          <div className="absolute w-2 h-2 bg-slate-800 rounded-full -left-[5px] top-1" />
                          <p className="leading-relaxed">{item}</p>
                        </div>
                      ))}
                      {(!resume?.parsedData?.experience || resume.parsedData.experience.length === 0) && (
                        <div className="text-slate-600">NULL_RECORD</div>
                      )}
                    </div>
                  </motion.div>

                  {/* Academic Records */}
                  <motion.div variants={itemVariants} className="bg-[#0A0A0C] border border-white/10 p-6 relative">
                    <div className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                      [ ACADEMIC_RECORDS ]
                    </div>
                    <div className="space-y-4 font-mono text-xs text-slate-300">
                      {(resume?.parsedData?.education || []).map((item: string, idx: number) => (
                        <div key={`${item}-${idx}`} className="flex gap-3 bg-white/[0.02] p-3 border border-white/5">
                           <span className="text-slate-600">-&gt;</span>
                           <p className="leading-relaxed">{item}</p>
                        </div>
                      ))}
                      {(!resume?.parsedData?.education || resume.parsedData.education.length === 0) && (
                        <div className="text-slate-600">NULL_RECORD</div>
                      )}
                    </div>
                  </motion.div>

                  {/* AI Skill Gaps / Enhancements */}
                  <motion.div variants={itemVariants} className="bg-[#0A0A0C] border border-white/10 p-6 relative">
                    <div className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                      [ AI_INSIGHTS ]
                    </div>
                    <div className="space-y-4 font-mono text-xs text-slate-300">
                      <div>
                        <div className="text-slate-500 mb-2">Missing Skills</div>
                        <div className="flex flex-wrap gap-2">
                          {(missingSkills || []).slice(0, 14).map((skill) => (
                            <span
                              key={`missing-${skill}`}
                              className="px-2 py-1 border border-amber-500/30 text-amber-300 bg-amber-950/20"
                            >
                              {skill}
                            </span>
                          ))}
                          {missingSkills.length === 0 && (
                            <span className="text-slate-600">NONE DETECTED</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-slate-500 mb-2">Additional Skills</div>
                        <div className="flex flex-wrap gap-2">
                          {(enhancedSkills || []).slice(0, 14).map((skill) => (
                            <span
                              key={`enhanced-${skill}`}
                              className="px-2 py-1 border border-emerald-500/30 text-emerald-300 bg-emerald-950/20"
                            >
                              {skill}
                            </span>
                          ))}
                          {enhancedSkills.length === 0 && (
                            <span className="text-slate-600">NONE DETECTED</span>
                          )}
                        </div>
                      </div>

                      {!aiEnhanced && (
                        <div className="text-slate-500">
                          AI enhancement is offline. Set `GEMINI_API_KEY` on the backend to enable richer feedback.
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

