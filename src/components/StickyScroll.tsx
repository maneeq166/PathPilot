"use client";
import React from "react";
import {
  BarChart3,
  Brain,
  Briefcase,
  FileUp,
  Mic,
} from "lucide-react"; // icons for steps
import { StickyScroll } from "./ui/sticky-scroll-reveal";



const content = [
  {
    title: "1. Upload Resume",
    description:
      "Start by uploading your resume in PDF or DOCX format. Our system begins analyzing your details instantly.",
    content: (
      <div className="flex h-full w-full items-center justify-center flex-col gap-4 bg-[linear-gradient(to_bottom_right,var(--slate-900),var(--gray-800))] text-white">
        <FileUp size={64} className="text-cyan-400" />
        <p className="text-lg font-medium">Upload your resume to begin</p>
      </div>
    ),
  },
  {
    title: "2. AI Parsing",
    description:
      "Our system extracts your key skills, education, and experience with precision using AI parsing.",
    content: (
      <div className="flex h-full w-full items-center justify-center flex-col gap-4 bg-[linear-gradient(to_bottom_right,var(--indigo-700),var(--violet-600))] text-white">
        <Brain size={64} className="text-purple-300" />
        <p className="text-lg font-medium">Smart parsing of your data</p>
      </div>
    ),
  },
  {
    title: "3. Job Matching",
    description:
      "You receive a personalized list of job opportunities that align with your profile and skills.",
    content: (
      <div className="flex h-full w-full items-center justify-center flex-col gap-4 bg-[linear-gradient(to_bottom_right,var(--emerald-700),var(--green-600))] text-white">
        <Briefcase size={64} className="text-emerald-300" />
        <p className="text-lg font-medium">Get job matches instantly</p>
      </div>
    ),
  },
  {
    title: "4. Interview Practice",
    description:
      "Record your responses to common interview questions and simulate real interview conditions.",
    content: (
      <div className="flex h-full w-full items-center justify-center flex-col gap-4 bg-[linear-gradient(to_bottom_right,var(--sky-800),var(--blue-700))] text-white">
        <Mic size={64} className="text-sky-300" />
        <p className="text-lg font-medium">Practice your interviews</p>
      </div>
    ),
  },
  {
    title: "5. AI Feedback",
    description:
      "Receive a detailed report with actionable insights on your speaking and communication skills.",
    content: (
      <div className="flex h-full w-full items-center justify-center flex-col gap-4 bg-[linear-gradient(to_bottom_right,var(--rose-800),var(--pink-700))] text-white">
        <BarChart3 size={64} className="text-rose-300" />
        <p className="text-lg font-medium">Get personalized AI feedback</p>
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-0">
      <h2 className="text-center text-3xl font-semibold text-white mb-12">
        How It Works
      </h2>
      <StickyScroll content={content} />
    </div>
  );
}