"use client";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white">
      <div className="mt-24 mx-auto w-full max-w-md rounded-2xl bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-zinc-800">
        <h2 className="text-2xl font-semibold text-center text-white tracking-tight">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-400">
          Login to your PathPilot account.
        </p>

        <form className="my-6 space-y-5" onSubmit={handleSubmit}>
          <LabelInputContainer>
            <Label htmlFor="email" className="text-zinc-300">
              Email Address
            </Label>
            <Input
              id="email"
              placeholder="you@example.com"
              type="email"
              className="bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500 transition-all"
            />
          </LabelInputContainer>

          <LabelInputContainer>
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

          <Button
            className="group/btn relative block h-11 w-full rounded-md bg-gradient-to-br from-zinc-100 to-zinc-300 text-zinc-900 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:from-white hover:to-zinc-200 transition-all duration-500"
            type="submit"
          >
            Log in &rarr;
            <BottomGradient />
          </Button>
        </form>
      </div>
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
