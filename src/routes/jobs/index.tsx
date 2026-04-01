import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { scrapeJobs } from "@/apis/api";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/jobs/")({
  component: RouteComponent,
});

// Font used: Space Grotesk, Space Mono

type Job = {
  job_title?: string;
  company_name?: string;
  location?: string;
  job_url?: string;
  source?: string;
  job_description?: string;
  matchScore?: {
    overall: number;
    skillMatch: number;
    experienceMatch: number;
    matchedSkills: string[];
  };
};

/* --- Upgraded JobCard --- */
const JobCard = ({ job, index }: { job: Job; index: number }) => {
  const matchScore = job.matchScore;
  const isLinkedIn = job.source?.toLowerCase() === "linkedin";
  const matchColor = (matchScore?.overall ?? 0) >= 70 ? "text-emerald-400" : 
                     (matchScore?.overall ?? 0) >= 50 ? "text-amber-400" : "text-red-400";
  const matchBg = (matchScore?.overall ?? 0) >= 70 ? "bg-emerald-500/10 border-emerald-500/30" : 
                  (matchScore?.overall ?? 0) >= 50 ? "bg-amber-500/10 border-amber-500/30" : "bg-white/[0.02]";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={`bg-[#0A0A0C] border p-6 relative group hover:bg-white/[0.02] transition-all flex flex-col justify-between ${
        isLinkedIn ? "border-blue-500/30 hover:border-blue-500/60" : "border-white/10 hover:border-cyan-500/40"
      }`}
    >
      {/* Animated Edge Highlight */}
      <div className={`absolute left-0 top-0 w-[2px] h-0 group-hover:h-full transition-all duration-300 ${isLinkedIn ? "bg-blue-500" : "bg-cyan-500"}`} />
      
      {/* Header Info */}
      <div className="mb-4">
        <div className="flex justify-between items-start mb-3">
          <div className={`font-mono text-[10px] uppercase tracking-widest px-2 py-1 border ${
            isLinkedIn ? "text-blue-400 bg-blue-500/10 border-blue-500/20" : "text-cyan-500 bg-cyan-500/10 border-cyan-500/20"
          }`}>
            {isLinkedIn && <span className="mr-1">🔗</span>}
            {job.source || "Unknown"}
          </div>
          {matchScore && (
            <div className={`${matchBg} border px-2 py-1 ${matchColor} font-mono text-[10px] flex items-center gap-1`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {matchScore.overall}% Match
            </div>
          )}
        </div>
        <h3 className="font-display text-xl text-white font-medium leading-tight mb-2 group-hover:text-cyan-50 transition-colors">
          {job.job_title || "Position"}
        </h3>
        <div className="font-mono text-xs text-slate-400 space-y-1">
          <p className="flex items-center gap-2">
            <span className="text-slate-600">Company:</span> {job.company_name || "Unknown Company"}
          </p>
          <p className="flex items-center gap-2">
            <span className="text-slate-600">Location:</span> {job.location || "Remote"}
          </p>
        </div>
      </div>

      {/* Match Details */}
      {matchScore && (
        <div className={`mb-4 p-3 border ${matchBg}`}>
          <div className="flex gap-4 text-[10px] font-mono mb-2">
            <div>
              <span className="text-slate-500">Skills:</span>{" "}
              <span className="text-emerald-400">{matchScore.skillMatch}%</span>
            </div>
            <div>
              <span className="text-slate-500">Exp:</span>{" "}
              <span className="text-cyan-400">{matchScore.experienceMatch}%</span>
            </div>
          </div>
          {matchScore.matchedSkills?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {matchScore.matchedSkills.slice(0, 4).map((skill, i) => (
                <span key={i} className="text-[9px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {skill}
                </span>
              ))}
              {matchScore.matchedSkills.length > 4 && (
                <span className="text-[9px] px-1.5 py-0.5 text-slate-500">
                  +{matchScore.matchedSkills.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Description Snippet */}
      {job.job_description && (
        <p className="font-mono text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4 border-l border-white/10 pl-3">
          {job.job_description}
        </p>
      )}

      {/* Action Footer */}
      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
        <div className={`font-mono text-[10px] ${(matchScore?.overall ?? 0) >= 70 ? "text-emerald-400" : "text-slate-600"} uppercase tracking-widest`}>
          {(matchScore?.overall ?? 0) >= 70 ? "✓ Great Match" : "Partial Match"}
        </div>
        {job.job_url ? (
          <a
            href={job.job_url}
            target="_blank"
            rel="noreferrer"
            className={`font-mono text-xs uppercase tracking-widest flex items-center gap-2 group/btn ${
              isLinkedIn ? "text-blue-400 hover:text-blue-300" : "text-cyan-400 hover:text-cyan-300"
            }`}
          >
            [ Apply ]
            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
          </a>
        ) : (
          <span className="font-mono text-[10px] text-slate-600 uppercase">NO_URL_PROVIDED</span>
        )}
      </div>
    </motion.div>
  );
};

/* --- Main Component --- */
type JobSummary = {
  total: number;
  bySource: Record<string, number>;
  avgMatchScore: number;
  hasResumeMatch: boolean;
  userExperienceLevel: string | null;
};

function RouteComponent() {
  const token = useMemo(() => localStorage.getItem("token"), []);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [summary, setSummary] = useState<JobSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a job title or keyword.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setJobs([]);
    setSummary(null);

    try {
      const response = await scrapeJobs(
        { query: query.trim(), location: location.trim() },
        token
      );
      const data = response?.data ?? response;
      setJobs(Array.isArray(data?.jobs) ? data.jobs : []);
      if (data?.summary) {
        setSummary(data.summary);
      }
      if (!data?.jobs || data.jobs.length === 0) {
        toast.info("No jobs found. Try different keywords.");
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Search failed. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
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
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.2, 0.1], scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-900/10 blur-[100px] rounded-full mix-blend-screen"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-24">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-b border-cyan-900/30 pb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
              <span className="font-mono text-[10px] text-cyan-400 tracking-[0.3em] uppercase">
                Job Search
              </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-none">
            FIND <br />
            <span className="text-slate-500">JOBS</span>
          </h1>
          <p className="font-mono text-slate-400 text-xs mt-6 uppercase tracking-widest max-w-xl leading-relaxed border-l-2 border-cyan-900/50 pl-4">
            Search for jobs that match your skills. Enter your search parameters below.
          </p>
        </motion.div>

        {/* Command Interface (Search Box) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0A0A0C] border border-white/10 p-6 relative overflow-hidden group mb-12"
        >
          {/* Animated Top Border */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 relative">
              <label className="font-mono text-[10px] text-slate-500 uppercase tracking-widest absolute -top-2 left-3 bg-[#0A0A0C] px-1">Job Title</label>
              <input
                placeholder="e.g. Software Engineer"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 text-white font-mono text-sm px-4 py-4 focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-slate-700"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <div className="md:col-span-4 relative">
              <label className="font-mono text-[10px] text-slate-500 uppercase tracking-widest absolute -top-2 left-3 bg-[#0A0A0C] px-1">Location</label>
              <input
                placeholder="e.g. Bangalore"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 text-white font-mono text-sm px-4 py-4 focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-slate-700"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            <div className="md:col-span-3 flex items-end">
              <Button 
                onClick={handleSearch} 
                disabled={isLoading}
                className="w-full h-[52px] rounded-none bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500 hover:text-black font-mono text-xs uppercase tracking-widest transition-all disabled:opacity-30 relative overflow-hidden group/btn"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                    Searching...
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Search Jobs
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
              </Button>
            </div>
          </div>


          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 border border-red-500/40 bg-red-950/20 p-3 font-mono text-xs text-red-300 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-red-500" />
                <span className="text-red-500 font-bold mr-2">[!]</span> {error}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Section */}
        <div className="relative min-h-[400px]">
          {/* Loading Overlay */}
          <AnimatePresence>
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#030304]/80 backdrop-blur-sm"
              >
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 border-t-2 border-cyan-500 rounded-full animate-spin" />
                  <div className="absolute inset-2 border-r-2 border-indigo-500 rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
                  <div className="absolute inset-4 border-b-2 border-white/20 rounded-full animate-pulse" />
                </div>
                <div className="font-mono text-xs text-cyan-400 uppercase tracking-[0.3em] animate-pulse text-center">
                  Finding jobs for you...<br/>
                  <span className="text-slate-500 text-[10px]">Please wait</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State / Initial State */}
          {!isLoading && jobs.length === 0 && !error && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="w-full py-20 flex flex-col items-center justify-center border border-dashed border-white/10 bg-white/[0.01]"
            >
              <div className="font-mono text-4xl text-slate-800 mb-4">⬡</div>
              <p className="font-mono text-sm text-slate-500 uppercase tracking-widest">
                {query ? "NO JOBS FOUND" : "ENTER A SEARCH TERM"}
              </p>
            </motion.div>
          )}

          {/* Results Summary */}
          {summary && jobs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
            >
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-2xl font-bold text-white">{summary.total}</span>
                  <span className="text-slate-400 text-sm">Jobs Found</span>
                </div>
                
                {summary.avgMatchScore > 0 && (
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xl font-bold ${
                      summary.avgMatchScore >= 70 ? "text-emerald-400" : 
                      summary.avgMatchScore >= 50 ? "text-amber-400" : "text-slate-400"
                    }`}>
                      {summary.avgMatchScore}%
                    </span>
                    <span className="text-slate-400 text-sm">Avg Match</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {summary.bySource["LinkedIn"] && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-mono">
                      🔗 {summary.bySource["LinkedIn"]} LinkedIn
                    </span>
                  )}
                  {summary.bySource["JSearch"] && (
                    <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-mono">
                      {summary.bySource["JSearch"]} JSearch
                    </span>
                  )}
                  {summary.bySource["TheMuse"] && (
                    <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-mono">
                      {summary.bySource["TheMuse"]} TheMuse
                    </span>
                  )}
                </div>

                {summary.hasResumeMatch && summary.userExperienceLevel && (
                  <div className="ml-auto text-right">
                    <span className="text-slate-500 text-xs">Matched for your profile:</span>
                    <span className="block text-cyan-400 text-sm font-mono capitalize">{summary.userExperienceLevel}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {jobs.map((job, i) => (
              <JobCard key={`${job.job_url || job.job_title}-${i}`} job={job} index={i} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
