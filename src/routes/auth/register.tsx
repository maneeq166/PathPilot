"use client";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/register")({
  component: Register,
});

function Register() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white">
    <div className="mt-24 mx-auto w-full max-w-md rounded-2xl bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-zinc-800">
      <h2 className="text-2xl font-semibold text-center text-white tracking-tight">
        Welcome to Aceternity
      </h2>
      <p className="mt-2 text-center text-sm text-zinc-400">
        Create your account to continue your journey.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname" className="text-zinc-300">
              First name
            </Label>
            <Input
              id="firstname"
              placeholder="Tyler"
              type="text"
              className="bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500 transition-all"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname" className="text-zinc-300">
              Last name
            </Label>
            <Input
              id="lastname"
              placeholder="Durden"
              type="text"
              className="bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500 transition-all"
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-zinc-300">
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            className="bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500 transition-all"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
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

        <LabelInputContainer className="mb-8">
          <Label htmlFor="twitterpassword" className="text-zinc-300">
            Confirm Password
          </Label>
          <Input
            id="twitterpassword"
            placeholder="••••••••"
            type="password"
            className="bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500 transition-all"
          />
        </LabelInputContainer>

        <Button
          className="group/btn relative block h-11 w-full rounded-md bg-gradient-to-br from-zinc-100 to-zinc-300 text-zinc-900 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:from-white hover:to-zinc-200 transition-all duration-500"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </Button>

        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

        <div className="flex flex-col space-y-4">
          {[
            { icon: IconBrandGithub, label: "GitHub" },
            { icon: IconBrandGoogle, label: "Google" },
            // { icon: IconBrandOnlyfans, label: "OnlyFans" },
          ].map(({ icon: Icon, label }, i) => (
            <button
              key={i}
              className="group/btn relative flex h-10 w-full items-center justify-start space-x-3 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-200 font-medium px-4 hover:bg-zinc-700 transition-all duration-300"
              type="button"
            >
              <Icon className="h-4 w-4 text-zinc-400" />
              <span className="text-sm">{label}</span>
              <BottomGradient />
            </button>
          ))}
        </div>
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
