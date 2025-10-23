"use client";
import React from "react";
import { PinContainer } from "../components/ui/3d-pin";
import { Button } from "@/components/ui/button";

export function PathPilotCTADemo() {
  return (
    <div className="w-full flex items-center justify-center py-20">
      <PinContainer title="/pathpilot.com" href="/get-started">
        <div className="relative flex items-center justify-between p-10 tracking-tight text-white w-[77rem] h-[16rem] bg-neutral-600 rounded-3xl backdrop-blur-md border border-neutral-800 shadow-2xl overflow-hidden">

          {/* 💫 Slim animated glowing border */}
          <div className="absolute inset-0 rounded-3xl border border-transparent animate-border-glow pointer-events-none"></div>

          {/* 🧠 Left Content */}
          <div className="relative z-10 flex flex-col max-w-3xl">
            <h3 className="text-3xl font-bold text-neutral-100 mb-3">
              Your Path to the Perfect Career Starts Here
            </h3>

            <p className="text-base text-neutral-300 leading-relaxed mb-5">
              At <span className="text-white font-semibold">PathPilot</span>,
              we help you take control of your career. Upload your resume, get
              AI-powered feedback, and unlock tailored job matches designed to
              help you grow.
            </p>

            <ul className="text-sm text-neutral-400 space-y-1 list-disc pl-5">
              <li>Instant AI Resume Analysis</li>
              <li>Smart Job Recommendations</li>
              <li>Interview Preparation Tools</li>
              <li>Personalized Career Dashboard</li>
            </ul>
          </div>

          {/* 🚀 Right-side Button */}
          <div className="relative z-10 flex-shrink-0 self-center">
            <Button
              size="lg"
              className="rounded-full px-10 py-4 font-semibold bg-neutral-100 text-black hover:bg-neutral-300 transition-all duration-500 hover:scale-105"
            >
              Get Started
            </Button>
          </div>
        </div>
      </PinContainer>

      {/* ✨ Border animation keyframes */}
      <style jsx>{`
        @keyframes border-glow {
          0% {
            border-image: linear-gradient(0deg, #33bfff, #80cfff, #33bfff) 1;
          }
          50% {
            border-image: linear-gradient(180deg, #80cfff, #33bfff, #80cfff) 1;
          }
          100% {
            border-image: linear-gradient(360deg, #33bfff, #80cfff, #33bfff) 1;
          }
        }

        .animate-border-glow {
          border: 1px solid transparent;
          border-radius: 1.5rem;
          background: linear-gradient(#000, #000) padding-box,
            linear-gradient(90deg, #33bfff, #80cfff, #33bfff) border-box;
          animation: border-glow 6s linear infinite;
        }
      `}</style>
    </div>
  );
}
