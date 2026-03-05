// components/ui/floating-navbar.tsx

import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const isLoggedIn = useMemo(() => Boolean(token), [token]);

  const decodeJwtUsername = (tokenValue: string): string | null => {
    try {
      const payload = tokenValue.split(".")[1];
      if (!payload || typeof atob !== "function") return null;
      let base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
      const pad = base64.length % 4;
      if (pad) {
        base64 += "=".repeat(4 - pad);
      }
      const json = atob(base64);
      return JSON.parse(json)?.username ?? null;
    } catch {
      return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.dispatchEvent(new Event("auth:changed"));
    window.location.href = "/";
  };

  useEffect(() => {
    const syncAuth = () => {
      const nextToken = localStorage.getItem("token");
      let nextUsername = localStorage.getItem("username");

      if (!nextUsername && nextToken) {
        const decoded = decodeJwtUsername(nextToken);
        if (decoded) {
          nextUsername = decoded;
          localStorage.setItem("username", decoded);
        }
      }

      setToken(nextToken);
      setUsername(nextUsername);
    };

    syncAuth();

    const handleAuthChange = () => syncAuth();
    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("auth:changed", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("auth:changed", handleAuthChange);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.1] rounded-full bg-black/50 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-6 py-2 items-center justify-between space-x-4",
          className
        )}
      >
        {/* Brand / Logo Area */}
        <Link 
            to="/" 
            className="flex items-center gap-2 font-bold text-white mr-4 hover:text-cyan-400 transition-colors"
        >
             <div className="h-3 w-3 bg-cyan-500 rounded-sm" />
             <span className="font-sans tracking-tight text-sm">PathPilot</span>
        </Link>

        {/* Nav Items */}
        {navItems.map((navItem, idx) => (
          <Link
            key={`link=${idx}`}
            to={isLoggedIn ? navItem.link : "/auth/register"}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-300 dark:hover:text-neutral-300 hover:text-neutral-500 font-mono text-xs uppercase tracking-wider"
            )}
          >
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        
        {/* Auth Buttons or User Info */}
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-cyan-300">
              {username || "User"}
            </span>
            <button 
              onClick={handleLogout}
              className="border text-xs font-mono font-medium relative border-red-500/70 bg-red-500/30 dark:border-white/[0.2] text-red-300 dark:text-white px-4 py-2 rounded-full hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-colors"
            >
              <span>Logout</span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-red-500 to-transparent h-px" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/auth/login">
                <button className="border text-xs font-mono font-medium relative border-cyan-500/70 bg-cyan-500/30 dark:border-white/[0.2] text-cyan-300 dark:text-white px-4 py-2 rounded-full hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors">
                <span>Login</span>
                <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px" />
                </button>
            </Link>
            <Link to="/auth/register">
                <button className="border text-xs font-mono font-medium relative border-neutral-500/70 bg-neutral-500/30 dark:border-white/[0.2] text-neutral-300 dark:text-white px-4 py-2 rounded-full hover:bg-neutral-500/10 hover:border-neutral-500/50 hover:text-neutral-400 transition-colors">
                <span>Register</span>
                <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent h-px" />
                </button>
            </Link>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
