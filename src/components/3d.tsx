"use client";
import React from "react";
import { PinContainer } from "../components/ui/3d-pin";
import { Button } from "@/components/ui/button";

export function PathPilotCTADemo() {
  return (
    <div className="w-full min-h-[40rem] flex items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950 px-6 py-24">
      <PinContainer title="/pathpilot.com" href="/get-started">
        <div className="flex basis-full flex-col p-6 tracking-tight text-white sm:basis-1/2 w-[24rem] h-[24rem]">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold text-xl text-cyan-400">
            Start Your Career Journey
          </h3>
          <div className="text-base !m-0 !p-0 font-normal text-zinc-300 mt-2">
            Upload your resume and experience smarter job matching, instant
            interview feedback, and one unified dashboard for your career growth.
          </div>
          <Button
            size="lg"
            className="mt-6 rounded-full px-10 py-4 font-semibold bg-gradient-to-r from-cyan-500 to-indigo-500 text-white hover:from-cyan-400 hover:to-indigo-400 transition-all duration-500 hover:scale-105"
          >
            Get Started Now
          </Button>
          <div className="flex flex-1 w-full rounded-lg mt-6 bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-500" />
        </div>
      </PinContainer>
    </div>
  );
}
