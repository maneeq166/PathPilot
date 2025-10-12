"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: { name: string; link?: string; icon?: JSX.Element }[];
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (current > lastScroll && current > 50) {
      setVisible(false); // scroll down
    } else if (current < lastScroll) {
      setVisible(true); // scroll up
    }
    setLastScroll(current);
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "flex fixed top-8 inset-x-0 mx-auto max-w-fit z-[5000] items-center justify-center space-x-4 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] px-6 py-3",
          className
        )}
      >
        {/* Logo P with smooth hover */}
        <a
          href="/"
          className={cn(
            "flex items-center justify-center size-8 rounded-md text-2xl font-bold shadow-md transition-all duration-500 ease-in-out",
            "bg-white text-black "
          )}
        >
          P
        </a>

        {/* Nav Items */}
        {navItems.map((item, idx) => (
          <a
            key={`nav-${idx}`}
            href={item.link}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium"
          >
            {item.icon && <span className="block sm:hidden">{item.icon}</span>}
            <span className="hidden sm:block">{item.name}</span>
          </a>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
