"use client";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { motion } from "framer-motion";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login submitted");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden">
      {/* Animated login card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-24 mx-auto w-full max-w-md rounded-3xl bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 p-8 shadow-[0_0_40px_rgba(0,0,0,0.6)] border border-zinc-800 backdrop-blur-sm"
      >
        <h2 className="text-3xl font-semibold text-center text-white/90 tracking-tight">
          Login to Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-400">
          Welcome back! Please enter your details.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email" className="text-zinc-300">
              Email Address
            </Label>
            <Input
              id="email"
              placeholder="your@email.com"
              type="email"
              className="bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500 transition-all"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-6">
            <Label htmlFor="password" className="text-zinc-300">
              Password
            </Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              className="bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500 transition-all"
            />
          </LabelInputContainer>

          {/* Animated glowing button */}
          {/* <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "decay", stiffness: 200, damping: 15 }}
          > */}
            <Button
              type="submit"
              className="group/btn relative block h-11 w-full rounded-full bg-gradient-to-br from-zinc-100 to-zinc-300 text-zinc-900 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:from-white hover:to-zinc-200 transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 group-hover/btn:text-white transition-colors duration-500">
                Login →
              </span>
              <span
                aria-hidden
                className="absolute inset-0 bg-black transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-[1.2s] ease-in-out"
              />
              <BottomGradient />
            </Button>
          {/* </motion.div> */}

          <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

          <p className="text-center text-sm text-zinc-400">
            Don’t have an account?{" "}
            <a
              href="/auth/register"
              className="text-white underline underline-offset-4 hover:text-zinc-200 transition-colors duration-500"
            >
              Register
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
