import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { z } from 'zod'
import { Button } from '@/components/ui/button'
import { registerSchema } from '@/validators/auth'
// eslint-disable-next-line import/order
import { zodResolver } from '@hookform/resolvers/zod'
import { register as registerUser } from '@/apis/api'

export const Route = createFileRoute('/auth/register')({
  component: Register,
})

// Font used: JetBrains Mono (System/Data), Space Grotesk (Headlines)

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
  })
  const nav = useNavigate()
  const [isHovering, setIsHovering] = useState(false)

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const res = await registerUser(
        values.username,
        values.email,
        values.password,
      )

      if (!res || !res.success) {
        toast.error(res?.message || 'Registration Failed')

        return
      }

      toast.success('Identity Established')

      nav({ to: '/auth/login' })
    } catch (error) {
      toast.error('Something went wrong')

      return null
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-[#e0e0e0] flex items-center justify-center overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@100..800&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        .scanline {
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0),
            rgba(255,255,255,0) 50%,
            rgba(0,0,0,0.2) 50%,
            rgba(0,0,0,0.2)
          );
          background-size: 100% 4px;
        }
      `}</style>

      {/* Atmospheric Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent_70%)]" />
        <div className="absolute inset-0 opacity-20 scanline pointer-events-none" />
        <motion.div
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Floating Shapes */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-900/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 px-6">
        {/* Left Column: System Messaging */}
        <div className="hidden lg:flex flex-col justify-center h-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="font-mono text-xs text-emerald-500 uppercase tracking-widest">
                Secure_Gateway_v4.2
              </span>
            </div>

            <h1 className="font-display text-7xl font-bold tracking-tighter leading-[0.9] text-white mb-8">
              PATHPILOT <br />
              <span className="text-neutral-500">INTELLIGENCE</span> <br />
              ONBOARDING
            </h1>

            <div className="font-mono text-sm text-neutral-400 max-w-md border-l border-neutral-800 pl-6 space-y-4">
              <p>
                Initialize a new neural node to begin career telemetry tracking.
                Establish identity to access analysis protocols.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs uppercase tracking-wide text-neutral-600">
                <div>Protocol: NEW_USER</div>
                <div>Encryption: AES-256</div>
                <div>Capacity: AVAILABLE</div>
                <div>Latency: 24ms</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Register Interface */}
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md"
          >
            <div className="bg-[#0a0a0a] border border-neutral-800 p-8 md:p-12 relative overflow-hidden group">
              {/* Animated Border Gradient */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

              <div className="mb-10 text-center">
                <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-[0.3em] mb-2">
                  Create Identity
                </div>
                <h2 className="font-display text-2xl text-white">
                  SYSTEM REGISTRATION
                </h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name Input */}
                <div className="space-y-2">
                  <label className="font-mono text-xs text-emerald-500 uppercase tracking-wider block">
                    Full_Designation
                  </label>
                  <input
                    type="text"
                    {...register('username')}
                    placeholder="ENTER FULL NAME..."
                    className="w-full bg-[#050505] border border-neutral-800 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-emerald-500/50 focus:bg-[#0f0f0f] transition-all placeholder:text-neutral-700"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs font-mono">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="font-mono text-xs text-emerald-500 uppercase tracking-wider block">
                    User_Email_ID
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="ENTER DESIGNATOR..."
                    className="w-full bg-[#050505] border border-neutral-800 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-emerald-500/50 focus:bg-[#0f0f0f] transition-all placeholder:text-neutral-700"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs font-mono">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="font-mono text-xs text-emerald-500 uppercase tracking-wider block">
                    Create_Key
                  </label>
                  <input
                    type="password"
                    {...register('password')}
                    placeholder="SET SECURE KEY..."
                    className="w-full bg-[#050505] border border-neutral-800 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-emerald-500/50 focus:bg-[#0f0f0f] transition-all placeholder:text-neutral-700"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs font-mono">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  <Button
                    className="w-full h-14 bg-white text-black hover:bg-emerald-400 hover:text-black rounded-none font-display font-bold text-lg tracking-wide transition-all relative overflow-hidden group/btn"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      ESTABLISH_IDENTITY
                      <motion.span
                        animate={{ x: isHovering ? 4 : 0 }}
                        className="text-xl"
                      >
                        ›
                      </motion.span>
                    </span>
                  </Button>
                </div>
              </form>

              <div className="mt-8 flex justify-center items-center font-mono text-[10px] text-neutral-600 uppercase">
                <span className="mr-2">Existing_Node?</span>
                <Link
                  to="/auth/login"
                  className="text-emerald-500 hover:text-emerald-400 hover:underline transition-colors"
                >
                  Access_Terminal
                </Link>
              </div>

              {/* Decorative Corner Elements */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-500/30" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-500/30" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-emerald-500/30" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-500/30" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

type RegisterFormValues = z.infer<typeof registerSchema>
