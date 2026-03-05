"use client";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getResume } from "@/apis/api";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

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
        const errorMsg = err?.response?.data?.message || err?.message || "Unable to load resume data.";
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    loadResume();
  }, [isLoggedIn, token]);

  const staticFeedback = [
    "Add 2-3 quantified wins (impact, revenue, performance).",
    "Keep the summary to 2-3 lines with a clear target role.",
    "Group skills by category (Frontend, Backend, Cloud).",
    "Ensure the latest project includes a tech stack line.",
  ];

  return (
    <div className="min-h-screen bg-[#050608] text-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">
              Resume Dashboard
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3">
              Resume Insights
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              Parsed resume data with quick feedback for the next iteration.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="rounded-full bg-cyan-500 text-black hover:bg-cyan-400"
            >
              <Link to="/analysis/upload">Upload New Resume</Link>
            </Button>
            {!isLoggedIn && (
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/20"
              >
                <Link to="/auth/login">Login</Link>
              </Button>
            )}
          </div>
        </div>

        {!isLoggedIn && (
          <div className="mt-10 border border-white/10 rounded-2xl p-6 bg-white/5">
            <p className="text-slate-300">
              Login required to view resume insights.
            </p>
          </div>
        )}

        {isLoggedIn && (
          <>
            {isLoading && (
              <div className="mt-10 border border-white/10 rounded-2xl p-6 bg-white/5 text-slate-400 font-mono text-sm">
                Loading resume data...
              </div>
            )}

            {error && (
              <div className="mt-10 border border-red-500/40 rounded-2xl p-6 bg-red-500/10 text-red-200 font-mono text-sm">
                {error}
              </div>
            )}

            {resume && !isLoading && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <p className="text-slate-400 text-xs uppercase tracking-[0.2em]">
                      Role
                    </p>
                    <p className="text-2xl font-semibold mt-3">
                      {resume?.inferredRole || "Not inferred yet"}
                    </p>
                    <p className="text-slate-500 text-sm mt-2">
                      Parsing status: {resume?.processingStatus || "unknown"}
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <p className="text-slate-400 text-xs uppercase tracking-[0.2em]">
                      Skills
                    </p>
                    <p className="text-2xl font-semibold mt-3">
                      {resume?.parsedData?.skills?.length || 0}
                    </p>
                    <p className="text-slate-500 text-sm mt-2">
                      Recognized skill keywords.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <p className="text-slate-400 text-xs uppercase tracking-[0.2em]">
                      File
                    </p>
                    <p className="text-2xl font-semibold mt-3">
                      {resume?.fileMeta?.fileType?.toUpperCase() || "N/A"}
                    </p>
                    <p className="text-slate-500 text-sm mt-2">
                      {resume?.fileMeta?.originalName || "Unknown filename"}
                    </p>
                  </div>
                </motion.div>

                <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold">Extracted Skills</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(resume?.parsedData?.skills || []).map((skill: string) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full text-xs font-mono text-cyan-200 bg-cyan-500/10 border border-cyan-400/30"
                        >
                          {skill}
                        </span>
                      ))}
                      {(!resume?.parsedData?.skills ||
                        resume.parsedData.skills.length === 0) && (
                        <p className="text-slate-500 text-sm">
                          No skills detected yet.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold">Static Feedback</h2>
                    <div className="mt-4 space-y-3 text-slate-300 text-sm">
                      {staticFeedback.map((tip) => (
                        <div key={tip} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2" />
                          <p>{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold">Education</h2>
                    <div className={cn("mt-4 space-y-2 text-sm text-slate-300")}>
                      {(resume?.parsedData?.education || []).map(
                        (item: string, idx: number) => (
                          <p key={`${item}-${idx}`}>{item}</p>
                        )
                      )}
                      {(!resume?.parsedData?.education ||
                        resume.parsedData.education.length === 0) && (
                        <p className="text-slate-500 text-sm">
                          No education lines extracted.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold">Experience</h2>
                    <div className="mt-4 space-y-2 text-sm text-slate-300">
                      {(resume?.parsedData?.experience || []).map(
                        (item: string, idx: number) => (
                          <p key={`${item}-${idx}`}>{item}</p>
                        )
                      )}
                      {(!resume?.parsedData?.experience ||
                        resume.parsedData.experience.length === 0) && (
                        <p className="text-slate-500 text-sm">
                          No experience lines extracted.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
