'use client'
import { motion } from 'framer-motion'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export const Route = createFileRoute('/auth/login')({
  component: Login,
})

function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={cn(
          'relative bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900',
          'p-6 rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.06)]',
          'border border-white/5 w-full max-w-md backdrop-blur-sm'
        )}
      >
        {/* Glow border animation */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 pointer-events-none"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />

        <h2 className="text-3xl font-semibold mb-5 text-center tracking-tight text-white/90">
          Login to Your Account
        </h2>

        <form className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Email"
            className="bg-neutral-850 border border-white/10 text-white placeholder:text-gray-400 focus:border-white/30 transition-all duration-500"
          />

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="bg-neutral-850 border border-white/10 text-white placeholder:text-gray-400 focus:border-white/30 transition-all duration-500 pr-12"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <Button
              type="submit"
              size="lg"
              className={cn(
                'w-full relative overflow-hidden rounded-full px-10 py-4 font-semibold group transition-all duration-700 ease-in-out',
                'bg-white text-black border border-white/10 shadow-[0_10px_25px_rgba(255,255,255,0.2)]'
              )}
            >
              <span
                aria-hidden
                className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-[1.5s] ease-in-out pointer-events-none"
              />
              <span className="relative z-10 group-hover:text-white transition-colors duration-[1.5s] ease-in-out">
                Login
              </span>
            </Button>
          </motion.div>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          Don’t have an account?{' '}
          <a
            href="/auth/register"
            className="text-white underline underline-offset-4 hover:text-gray-200 transition-colors duration-500"
          >
            Register
          </a>
        </p>
      </motion.div>
    </motion.div>
  )
}
