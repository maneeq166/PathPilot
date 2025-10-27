"use client";
import React from "react";
import { Facebook, Instagram, Mail, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { HoverBorderGradient } from "./B";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function PathPilotCTADemo() {
  return (
    <motion.section
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full flex justify-center items-center py-20 text-white"
    >
      <div className="w-[92%] bg-neutral-900/85 border border-neutral-800 rounded-3xl px-16 py-16 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-xl">
        
        {/* Left Section - Contact & Social */}
        <div className="absolute left-10 top-[10%] flex flex-col items-start gap-4 text-neutral-400 text-sm">
          <p className="text-neutral-300 font-semibold mb-2">Stay Connected</p>
          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-neutral-800 border border-neutral-700 rounded-full px-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 w-38"
            />
            <Button
              size="sm"
              className="rounded-full bg-white text-black font-semibold px-5 hover:bg-neutral-200 transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4 mt-3">
            {[Twitter, Facebook, Instagram].map((Icon, i) => (
              <div key={i} className="hover:scale-110 transition-transform duration-300">
                <Icon className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Routes */}
        <div className="absolute right-10 top-[10%] flex flex-col items-end text-neutral-400 text-sm space-y-3">
          <p className="text-neutral-300 font-semibold mb-2 uppercase tracking-wide">
            Pages
          </p>
          {["Home", "Features", "About", "Login"].map((route, i) => (
            <p
              key={i}
              className="hover:text-white cursor-pointer transition-colors hover:scale-105 transform duration-300"
            >
              {route}
            </p>
          ))}
        </div>

        {/* Center Content */}
        <div className="max-w-xl flex flex-col items-center text-center">
          <h2 className="text-6xl font-bold mb-7">PathPilot</h2>
          <p className="text-neutral-400 text-sm sm:text-base mb-5">
            Discover smarter career growth with AI-powered insights, instant feedback, 
            and personalized opportunities designed to help you land your dream job.
          </p>

          {/* Centered Get Started Button */}
          <motion.div
            className="mt-6 flex justify-center"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          >
            <HoverBorderGradient containerClassName="rounded-full" duration={1.2}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <a href="/auth/login" aria-label="Get started">
                  <Button
                    size="lg"
                    className={cn(
                      "relative overflow-hidden rounded-full px-8 py-4 font-semibold transition-all group",
                      "bg-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.7)] border border-white/20"
                    )}
                  >
                    <span className="relative z-10">Get Started</span>
                  </Button>
                </a>
              </motion.div>
            </HoverBorderGradient>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
