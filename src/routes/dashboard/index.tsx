import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { getResume, updateResume } from "@/apis/api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

// Font used: Space Grotesk, Space Mono

type SkillSectionProps = {
  title: string;
  skills: string[];
  colorClass?: string;
  borderClass?: string;
  editableSkills?: string[];
  onAdd?: () => void;
  onEdit?: (index: number, value: string) => void;
  onRemove?: (index: number) => void;
};

const SkillSection = ({
  title,
  skills,
  colorClass = "text-cyan-400",
  borderClass = "border-cyan-500/30",
  editableSkills = [],
  onAdd,
  onEdit,
  onRemove,
}: SkillSectionProps) => {
  const hasEmptySkill = editableSkills.some(s => !s.trim());
  return (
    <div className={cn("bg-[#0A0A0C] border p-3 relative group transition-colors", borderClass, "hover:border-white/40")}>
      <div className="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={onAdd}
          disabled={hasEmptySkill}
          className={cn("h-8 w-8 rounded-md border text-lg font-mono flex items-center justify-center transition-colors", borderClass, colorClass, "hover:bg-white/[0.05]", hasEmptySkill && "opacity-30 cursor-not-allowed")}
          aria-label={`Add ${title}`}
        >
          +
        </button>
      </div>
      <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
        <span className={colorClass}>◇</span> [{title.toUpperCase()}]
      </h3>
      <div className="flex flex-wrap gap-2 mt-1">
        {skills.map((skill, idx) => (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            key={`${title}-${skill}`}
            className={cn(
              "px-3 py-1.5 bg-white/[0.02] border border-white/10 font-mono text-xs cursor-default transition-colors",
              `hover:${borderClass} hover:bg-white/[0.05]`,
              colorClass
            )}
          >
            <span className="opacity-50 mr-2">▸</span>
            {skill}
          </motion.span>
        ))}
        {skills.length === 0 && (
          <span className="text-xs font-mono text-slate-600 border border-dashed border-slate-800 w-full py-2 text-center">
            NO_DATA_EXTRACTED
          </span>
        )}
        {editableSkills.map((value, idx) => (
          <div key={`${title}-edit-${idx}`} className="flex items-center gap-1">
            <input
              value={value}
              onChange={(event) => onEdit?.(idx, event.target.value)}
              placeholder="Add skill"
              className={cn(
                "px-3 py-1.5 bg-white/[0.03] border border-white/10 font-mono text-xs text-slate-200",
                "focus:outline-none focus:border-white/40",
                "min-w-[120px]"
              )}
            />
            <button
              type="button"
              onClick={() => onRemove?.(idx)}
              className="h-7 w-7 flex items-center justify-center rounded border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs"
              aria-label="Remove"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

function RouteComponent() {
  const token = useMemo(() => localStorage.getItem("token"), []);
  const isLoggedIn = Boolean(token);
  const [isLoading, setIsLoading] = useState(false);
  const [resume, setResume] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [customSkills, setCustomSkills] = useState<Record<string, string[]>>({});
  const [customExperiences, setCustomExperiences] = useState<
    { role: string; company: string; duration: string; description: string }[]
  >([]);
  const [customEducation, setCustomEducation] = useState<
    { degree: string; institution: string; startYear: string; endYear: string }[]
  >([]);
  const [isSaving, setIsSaving] = useState(false);

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

  const parsed = resume?.parsedData ?? resume ?? {};
  const skills = parsed?.skills ?? {};
  const recommendations = parsed?.recommendations ?? {
    shortTermAdvice: [],
    longTermAdvice: [],
    missingSkills: [],
  };
  const education = Array.isArray(parsed?.education) ? parsed.education : [];
  const experience = (() => {
    const candidate =
      parsed?.experience ??
      (resume as any)?.experience ??
      (resume as any)?.parsedData?.experience;

    if (Array.isArray(candidate)) return candidate;
    if (candidate && typeof candidate === "object" && Array.isArray((candidate as any).items)) {
      return (candidate as any).items;
    }
    if (typeof candidate === "string") {
      return candidate
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => ({ role: line }));
    }
    return [];
  })();

  const getCustomSkills = (key: string) => customSkills[key] || [];
  const handleAddSkill = (key: string) => {
    setCustomSkills((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), ""],
    }));
  };
  const handleEditSkill = (key: string, index: number, value: string) => {
    setCustomSkills((prev) => {
      const next = [...(prev[key] || [])];
      next[index] = value;
      return { ...prev, [key]: next };
    });
  };
  const handleRemoveSkill = (key: string, index: number) => {
    setCustomSkills((prev) => {
      const next = [...(prev[key] || [])];
      next.splice(index, 1);
      return { ...prev, [key]: next };
    });
  };

const handleAddExperience = () => {
    setCustomExperiences((prev) => [
      ...prev,
      { role: "", company: "", duration: "", description: "" },
    ]);
  };
  const handleRemoveExperience = (index: number) => {
    setCustomExperiences((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddEducation = () => {
    setCustomEducation((prev) => [
      ...prev,
      { degree: "", institution: "", startYear: "", endYear: "" },
    ]);
  };
  const handleRemoveEducation = (index: number) => {
    setCustomEducation((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const skillsToSave: Record<string, string[]> = {};
      for (const [key, values] of Object.entries(customSkills)) {
        const nonEmpty = values.filter(v => v.trim());
        if (nonEmpty.length > 0) {
          skillsToSave[key] = nonEmpty;
        }
      }

      const expToSave = customExperiences.filter(e => e.role.trim() && e.company.trim());
      const eduToSave = customEducation.filter(e => e.degree.trim() && e.institution.trim());

      await updateResume({
        skills: Object.keys(skillsToSave).length > 0 ? skillsToSave : undefined,
        experience: expToSave.length > 0 ? expToSave : undefined,
        education: eduToSave.length > 0 ? eduToSave : undefined,
      }, token);

      toast.success("Saved successfully!");
      setCustomSkills({});
      setCustomExperiences([]);
      setCustomEducation([]);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

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
                Status: {isLoggedIn ? 'Authorized' : 'Restricted'}
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-white leading-none">
              CAREER <br />
              <span className="text-slate-500">PROFILE</span>
            </h1>
            <p className="font-mono text-slate-500 text-xs mt-4 uppercase tracking-widest">
              Resume Analysis & Career Insights
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <Button
              asChild
              className="rounded-none h-12 px-6 bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500 hover:text-black font-mono text-xs uppercase tracking-widest transition-all group overflow-hidden relative"
            >
              <Link to="/upload">
                 <span className="relative z-10 flex items-center gap-2">
                   <span className="group-hover:animate-ping">⬡</span> Upload Resume
                 </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Link>
            </Button>
            <Button
              asChild
              className="rounded-none h-12 px-6 bg-indigo-500/10 text-indigo-400 border border-indigo-500/50 hover:bg-indigo-500 hover:text-white font-mono text-xs uppercase tracking-widest transition-all group overflow-hidden relative"
            >
              <Link to="/jobs">
                 <span className="relative z-10 flex items-center gap-2">
                    Find Jobs
                 </span>
              </Link>
            </Button>
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
              <div className="text-red-500 mb-6 text-4xl">⚠</div>
              <h2 className="text-xl text-red-400 mb-2 uppercase tracking-widest">Access Denied</h2>
              <p className="text-slate-400 text-sm mb-8">
                Please log in to view your profile.
              </p>
              <Button
                  asChild
                  className="rounded-none h-12 px-8 bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-black font-mono text-xs uppercase tracking-widest transition-all"
              >
                  <Link to="/auth/login">Log In</Link>
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
                  Loading your profile...
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
            {!isLoading && !error && resume && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-12"
              >
                {/* Skills Grid */}
                <section>
                  <div className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-3 border-b border-white/10 pb-4 justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full" />
                      [ SKILLS ]
                    </div>
                    {(Object.values(customSkills).some(arr => arr.some(s => s.trim())) || customExperiences.some(e => e.role.trim() && e.company.trim()) || customEducation.some(e => e.degree.trim() && e.institution.trim())) && (
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-4 py-1.5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500 hover:text-black font-mono text-xs uppercase tracking-widest transition-all disabled:opacity-50"
                      >
                        {isSaving ? "Saving..." : "Save Changes"}
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <SkillSection
                      title="Languages"
                      skills={skills.languages || []}
                      colorClass="text-cyan-400"
                      borderClass="border-cyan-500/20"
                      editableSkills={getCustomSkills("languages")}
                      onAdd={() => handleAddSkill("languages")}
                      onEdit={(idx, value) => handleEditSkill("languages", idx, value)}
                      onRemove={(idx) => handleRemoveSkill("languages", idx)}
                    />
                    <SkillSection
                      title="Frameworks"
                      skills={skills.frameworks || []}
                      colorClass="text-indigo-400"
                      borderClass="border-indigo-500/20"
                      editableSkills={getCustomSkills("frameworks")}
                      onAdd={() => handleAddSkill("frameworks")}
                      onEdit={(idx, value) => handleEditSkill("frameworks", idx, value)}
                      onRemove={(idx) => handleRemoveSkill("frameworks", idx)}
                    />
                    <SkillSection
                      title="Databases"
                      skills={skills.databases || []}
                      colorClass="text-emerald-400"
                      borderClass="border-emerald-500/20"
                      editableSkills={getCustomSkills("databases")}
                      onAdd={() => handleAddSkill("databases")}
                      onEdit={(idx, value) => handleEditSkill("databases", idx, value)}
                      onRemove={(idx) => handleRemoveSkill("databases", idx)}
                    />
                    <SkillSection
                      title="Tools"
                      skills={skills.tools || []}
                      colorClass="text-amber-400"
                      borderClass="border-amber-500/20"
                      editableSkills={getCustomSkills("tools")}
                      onAdd={() => handleAddSkill("tools")}
                      onEdit={(idx, value) => handleEditSkill("tools", idx, value)}
                      onRemove={(idx) => handleRemoveSkill("tools", idx)}
                    />
                    <SkillSection
                      title="Concepts"
                      skills={skills.concepts || []}
                      colorClass="text-purple-400"
                      borderClass="border-purple-500/20"
                      editableSkills={getCustomSkills("concepts")}
                      onAdd={() => handleAddSkill("concepts")}
                      onEdit={(idx, value) => handleEditSkill("concepts", idx, value)}
                      onRemove={(idx) => handleRemoveSkill("concepts", idx)}
                    />
                    <SkillSection
                      title="Soft Skills"
                      skills={skills.softSkills || []}
                      colorClass="text-pink-400"
                      borderClass="border-pink-500/20"
                      editableSkills={getCustomSkills("softSkills")}
                      onAdd={() => handleAddSkill("softSkills")}
                      onEdit={(idx, value) => handleEditSkill("softSkills", idx, value)}
                      onRemove={(idx) => handleRemoveSkill("softSkills", idx)}
                    />
                  </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Experience Timeline */}
                    <motion.section variants={itemVariants}>
                      <div className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-3 border-b border-white/10 pb-4 justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-indigo-500 rounded-full" />
                          [ EXPERIENCE ]
                        </div>
                        <button
                          type="button"
                          onClick={handleAddExperience}
                          disabled={customExperiences.some(e => !e.role.trim() || !e.company.trim())}
                          className="h-8 w-8 rounded-md border border-indigo-500/30 text-indigo-400 font-mono text-lg flex items-center justify-center hover:bg-white/[0.05] disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label="Add experience"
                        >
                          +
                        </button>
                      </div>
                    <div className="space-y-6">
                      {experience.map((exp: any, i: number) => (
                        <div key={`exp-${i}`} className="bg-[#0A0A0C] border border-white/10 rounded-none p-3 relative group hover:border-indigo-500/30 transition-colors">
                          <div className="absolute top-0 left-0 w-[2px] h-0 bg-indigo-500 group-hover:h-full transition-all duration-300" />
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-display text-xl text-white font-medium">{exp.role || "Unknown Position"}</h3>
                            <span className="font-mono text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-1 border border-indigo-500/20 whitespace-nowrap">
                              {exp.duration || "N/A"}
                            </span>
                          </div>
                          <p className="font-mono text-sm text-slate-400 mb-4">{exp.company || "Unknown Company"}</p>
                          {exp.description && (
                            <p className="text-sm text-slate-500 font-mono leading-relaxed border-l border-white/10 pl-4">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ))}
                      {customExperiences.map((exp, i) => (
                        <div
                          key={`exp-custom-${i}`}
                          className="bg-[#0A0A0C] border border-indigo-500/20 rounded-none p-3 space-y-2"
                        >
                          <input
                            value={exp.role}
                            onChange={(event) => {
                              const value = event.target.value;
                              setCustomExperiences((prev) => {
                                const next = [...prev];
                                next[i] = { ...next[i], role: value };
                                return next;
                              });
                            }}
                            placeholder="Role"
                            className="w-full bg-transparent border border-white/10 px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-400/60"
                          />
                          <input
                            value={exp.company}
                            onChange={(event) => {
                              const value = event.target.value;
                              setCustomExperiences((prev) => {
                                const next = [...prev];
                                next[i] = { ...next[i], company: value };
                                return next;
                              });
                            }}
                            placeholder="Company"
                            className="w-full bg-transparent border border-white/10 px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-400/60"
                          />
                          <input
                            value={exp.duration}
                            onChange={(event) => {
                              const value = event.target.value;
                              setCustomExperiences((prev) => {
                                const next = [...prev];
                                next[i] = { ...next[i], duration: value };
                                return next;
                              });
                            }}
                            placeholder="Duration"
                            className="w-full bg-transparent border border-white/10 px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-400/60"
                          />
                          <textarea
                            value={exp.description}
                            onChange={(event) => {
                              const value = event.target.value;
                              setCustomExperiences((prev) => {
                                const next = [...prev];
                                next[i] = { ...next[i], description: value };
                                return next;
                              });
                            }}
                            placeholder="Description"
                            className="w-full bg-transparent border border-white/10 px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-400/60 min-h-[80px]"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveExperience(i)}
                            className="py-1 px-2 border border-red-500/30 text-red-400 font-mono text-xs hover:bg-red-500/20 w-auto inline-block"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      {experience.length + customExperiences.length === 0 && (
                        <div className="font-mono text-xs text-slate-600 border border-dashed border-white/10 p-6 text-center">
                          No records found
                        </div>
                      )}
                    </div>
                  </motion.section>

                  {/* Education & AI Insights */}
                  <div className="space-y-12">
                    <motion.section variants={itemVariants}>
                      <div className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-3 border-b border-white/10 pb-4 justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                          [ EDUCATION ]
                        </div>
                        <button
                          type="button"
                          onClick={handleAddEducation}
                          disabled={customEducation.some(e => !e.degree.trim() || !e.institution.trim())}
                          className="h-8 w-8 rounded-md border border-emerald-500/30 text-emerald-400 font-mono text-lg flex items-center justify-center hover:bg-white/[0.05] disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label="Add education"
                        >
                          +
                        </button>
                      </div>
                      <div className="space-y-4">
                        {education.map((edu: any, i: number) => (
                          <div key={`edu-${i}`} className="bg-[#0A0A0C] border border-white/10 p-3 flex gap-4 items-start group hover:border-emerald-500/30 transition-colors">
                            <div className="font-mono text-emerald-500 opacity-50 mt-1 group-hover:opacity-100 transition-opacity">↳</div>
                            <div>
                              <p className="font-display text-lg text-white font-medium">{edu.degree || "Degree"}</p>
                              <p className="font-mono text-xs text-slate-400 mt-1">{edu.institution || "Unknown Institution"}</p>
                              <p className="font-mono text-[10px] text-slate-500 mt-2 uppercase">
                                {edu.startYear || ""} {edu.startYear || edu.endYear ? "—" : ""} {edu.endYear || "PRESENT"}
                              </p>
                            </div>
                          </div>
                        ))}
                        {customEducation.map((edu, i) => (
                          <div
                            key={`edu-custom-${i}`}
                            className="bg-[#0A0A0C] border border-emerald-500/20 p-3 space-y-2"
                          >
                            <input
                              value={edu.degree}
                              onChange={(event) => {
                                const value = event.target.value;
                                setCustomEducation((prev) => {
                                  const next = [...prev];
                                  next[i] = { ...next[i], degree: value };
                                  return next;
                                });
                              }}
                              placeholder="Degree"
                              className="w-full bg-transparent border border-white/10 px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-400/60"
                            />
                            <input
                              value={edu.institution}
                              onChange={(event) => {
                                const value = event.target.value;
                                setCustomEducation((prev) => {
                                  const next = [...prev];
                                  next[i] = { ...next[i], institution: value };
                                  return next;
                                });
                              }}
                              placeholder="Institution"
                              className="w-full bg-transparent border border-white/10 px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-400/60"
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                value={edu.startYear}
                                onChange={(event) => {
                                  const value = event.target.value;
                                  setCustomEducation((prev) => {
                                    const next = [...prev];
                                    next[i] = { ...next[i], startYear: value };
                                    return next;
                                  });
                                }}
                                placeholder="Start Year"
                                className="w-full bg-transparent border border-white/10 px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-400/60"
                              />
                              <input
                                value={edu.endYear}
                                onChange={(event) => {
                                  const value = event.target.value;
                                  setCustomEducation((prev) => {
                                    const next = [...prev];
                                    next[i] = { ...next[i], endYear: value };
                                    return next;
                                  });
                                }}
                                placeholder="End Year"
                                className="w-full bg-transparent border border-white/10 px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-400/60"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveEducation(i)}
                              className="py-1 px-2 border border-red-500/30 text-red-400 font-mono text-xs hover:bg-red-500/20 w-auto inline-block"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        {education.length + customEducation.length === 0 && (
                          <div className="font-mono text-xs text-slate-600 border border-dashed border-white/10 p-6 text-center">
                            No education records found
                          </div>
                        )}
                      </div>
                    </motion.section>

                    <motion.section variants={itemVariants}>
                      <div className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                        [ AI INSIGHTS ]
                      </div>
                      <div className="bg-[#0A0A0C] border border-amber-500/20 p-6 space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[50px] pointer-events-none" />
                        
                        {/* Missing Skills */}
                        <div>
                          <h3 className="font-mono text-[10px] text-amber-500 uppercase tracking-widest mb-3">
                            <span className="opacity-50">TIP:</span> Skills to Learn
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {(recommendations.missingSkills || []).map((skill: string, i: number) => (
                              <span
                                key={`missing-${i}`}
                                className="px-2 py-1 text-[10px] font-mono bg-red-950/40 text-red-400 border border-red-900/50 uppercase"
                              >
                                ! {skill}
                              </span>
                            ))}
                            {(recommendations.missingSkills || []).length === 0 && (
                              <span className="text-xs font-mono text-slate-500">Looking good! No critical skills missing.</span>
                            )}
                          </div>
                        </div>

                        {/* Short Term */}
                        <div>
                          <h3 className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-3">
                            Quick Wins
                          </h3>
                          <ul className="space-y-3 font-mono text-xs text-slate-300">
                            {(recommendations.shortTermAdvice || []).map((item: string, i: number) => (
                              <li key={`short-${i}`} className="flex gap-3 items-start group">
                                <span className="text-amber-500/50 group-hover:text-amber-400 transition-colors mt-0.5">▌</span>
                                <span>{item}</span>
                              </li>
                            ))}
                            {(recommendations.shortTermAdvice || []).length === 0 && (
                              <li className="text-slate-500">You're on track!</li>
                            )}
                          </ul>
                        </div>

                        {/* Long Term */}
                        <div>
                          <h3 className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-3">
                            Long-term Goals
                          </h3>
                          <ul className="space-y-3 font-mono text-xs text-slate-300">
                            {(recommendations.longTermAdvice || []).map((item: string, i: number) => (
                              <li key={`long-${i}`} className="flex gap-3 items-start group">
                                <span className="text-cyan-500/50 group-hover:text-cyan-400 transition-colors mt-0.5">▌</span>
                                <span>{item}</span>
                              </li>
                            ))}
                            {(recommendations.longTermAdvice || []).length === 0 && (
                              <li className="text-slate-500">Looking good!</li>
                            )}
                          </ul>
                        </div>

                      </div>
                    </motion.section>
                  </div>
                </div>

              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

