"use client";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bell, User, Settings } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 p-6 border-r border-zinc-800 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8 tracking-tight text-white">
            PathPilot
          </h1>
          <nav className="space-y-4">
            {["Overview", "Analytics", "Projects", "Team"].map((item) => (
              <button
                key={item}
                className="block w-full text-left text-zinc-400 hover:text-white hover:bg-zinc-800 px-3 py-2 rounded-md transition-all duration-300"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="border-t border-zinc-800 pt-6 space-y-2">
          <button className="w-full flex items-center gap-2 text-zinc-400 hover:text-white transition">
            <User size={18} /> Profile
          </button>
          <button className="w-full flex items-center gap-2 text-zinc-400 hover:text-white transition">
            <Settings size={18} /> Settings
          </button>
        </div>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Dashboard</h2>
            <p className="text-zinc-400 text-sm">Welcome back to PathPilot 👋</p>
          </div>
          <div className="flex items-center gap-4">
            <Button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center gap-2">
              <Bell size={16} />
              Notifications
            </Button>
            <Button className="bg-gradient-to-br from-zinc-100 to-zinc-300 text-zinc-900 font-semibold hover:from-white hover:to-zinc-200 transition-all">
              + New Project
            </Button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { title: "Active Projects", value: "12" },
            { title: "Pending Tasks", value: "48" },
            { title: "Team Members", value: "8" },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-black/20"
            >
              <h3 className="text-zinc-400 text-sm">{card.title}</h3>
              <p className="text-2xl font-semibold mt-2">{card.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Recent Activity Section */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <ul className="space-y-3 text-zinc-300">
              <li>✅ Project “Orbit UI” completed successfully.</li>
              <li>⚙️ Server maintenance scheduled for tomorrow.</li>
              <li>🧠 Analytics module updated with new insights.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
