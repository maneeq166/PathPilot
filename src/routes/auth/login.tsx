import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/auth/login')({
  component: Login,
})

// Font used: JetBrains Mono (System/Data), Space Grotesk (Headlines)

/* -------------------------------------------------------------------------- */
/* SUB-COMPONENTS                              */
/* -------------------------------------------------------------------------- */

const Label = ({ children, className }) => {
  return (
    <label className={cn("text-xs font-mono uppercase tracking-widest text-emerald-500 mb-2 block", className)}>
      {children}
    </label>
  );
};

const Input = ({ className, ...props }) => {
  return (
    <motion.div 
      initial={{ opacity: 0.8 }}
      whileFocus={{ opacity: 1 }}
      className="p-[1px] rounded-sm bg-gradient-to-b from-neutral-700 to-neutral-900 focus-within:from-emerald-500 focus-within:to-emerald-900 transition-colors duration-300"
    >
      <input
        className={cn(
          "flex h-12 w-full bg-[#050505] border-none text-neutral-200 shadow-input px-4 py-2 text-sm font-mono file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-700 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </motion.div>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
    </>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                              */
/* -------------------------------------------------------------------------- */

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("System Access Requested", { email, password });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030303] text-gray-200 flex overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-50 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@100..800&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        .grid-bg {
          background-size: 30px 30px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
        }
      `}</style>

      {/* 1. ATMOSPHERIC BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03),transparent_60%)]" />
        
        {/* Animated Intelligence Shapes */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-900/10 blur-[120px] rounded-full mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            x: [0, -50, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/10 blur-[100px] rounded-full mix-blend-screen"
        />
      </div>

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2">
        
        {/* 2. LEFT PANEL: SYSTEM IDENTITY */}
        <div className="hidden lg:flex flex-col justify-center px-12 xl:px-24 relative border-r border-white/5 bg-black/20 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-20"
          >
             {/* System Tag */}
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-900/10 mb-8">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
               <span className="font-mono text-[10px] text-emerald-400 tracking-widest uppercase">Secure Gateway v4.0</span>
             </div>

             <h1 className="font-display text-6xl xl:text-7xl font-bold tracking-tighter leading-[0.9] text-white mb-8">
               PATHPILOT <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-neutral-700">AUTHENTICATION</span> <br />
               SYSTEM
             </h1>

             <div className="space-y-6 font-mono text-sm text-neutral-400 max-w-md border-l border-neutral-800 pl-6">
               <p>
                 Secure access to your career intelligence profile.
               </p>
               <ul className="space-y-2 text-xs uppercase tracking-wider text-neutral-500">
                 <li className="flex items-center gap-3">
                   <span className="text-emerald-500">[✓]</span> Resume Analysis Engine
                 </li>
                 <li className="flex items-center gap-3">
                   <span className="text-emerald-500">[✓]</span> Match Tracking Log
                 </li>
                 <li className="flex items-center gap-3">
                   <span className="text-emerald-500">[✓]</span> Interview Feedback Loop
                 </li>
               </ul>
             </div>
          </motion.div>

          {/* Decorative Grid Overlay on Left */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        </div>

        {/* 3. RIGHT PANEL: AUTHENTICATION CONSOLE */}
        <div className="flex flex-col items-center justify-center p-6 lg:p-12 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-md"
          >
            {/* Console Panel Container */}
            <div className="relative bg-[#080808] border border-white/10 p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
               {/* Top Bar Decoration */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-900 via-emerald-500 to-emerald-900 opacity-50" />
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

               <div className="mb-8 text-center">
                 <h2 className="font-display text-2xl text-white font-medium tracking-tight">SYSTEM LOGIN</h2>
                 <p className="font-mono text-xs text-neutral-500 mt-2 uppercase tracking-widest">Identify to proceed</p>
               </div>

               <form className="space-y-6" onSubmit={handleSubmit}>
                 <LabelInputContainer>
                   <Label htmlFor="email">User_Designator (Email)</Label>
                   <Input 
                     id="email" 
                     placeholder="ENTER EMAIL ADDRESS..." 
                     type="email" 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                   />
                 </LabelInputContainer>

                 <LabelInputContainer>
                   <Label htmlFor="password">Access_Key (Password)</Label>
                   <Input 
                     id="password" 
                     placeholder="ENTER SECURE TOKEN..." 
                     type="password" 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                   />
                 </LabelInputContainer>

                 <div className="pt-4">
                   <Button 
                     className="w-full h-12 bg-white text-black rounded-sm font-mono font-bold tracking-wider hover:bg-emerald-400 hover:text-black transition-all group/btn relative overflow-hidden"
                     type="submit"
                   >
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                     <span className="relative z-10 flex items-center justify-center gap-2">
                       INITIALIZE SESSION
                       <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                     </span>
                     <BottomGradient />
                   </Button>
                 </div>
               </form>

               {/* Footer Links */}
               <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center font-mono text-[10px] text-neutral-600 uppercase">
                 <Link to="/auth/recover" className="hover:text-emerald-500 transition-colors">
                   Reset_Key
                 </Link>
                 <Link to="/auth/register" className="hover:text-emerald-500 transition-colors">
                   New_User_Protocol
                 </Link>
               </div>

               {/* Corner Markers */}
               <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-emerald-500/30" />
               <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-emerald-500/30" />
               <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-emerald-500/30" />
               <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-emerald-500/30" />
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}