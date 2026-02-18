// components/Header.tsx

import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";

export default function Header() {
  const navItems = [
    {
      name: "Features",
      link: "/#features",
    },
    {
      name: "Pricing",
      link: "/pricing",
    },
    {
      name: "Register",
      link: "/auth/register",
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}