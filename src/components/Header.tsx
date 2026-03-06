// components/Header.tsx

import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";

export default function Header() {
  const navItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Upload",
      link: "/analysis/upload",
    },
    {
      name: "Settings",
      link: "/dashboard/settings",
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
