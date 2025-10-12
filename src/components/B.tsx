'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useRouter } from '@tanstack/react-router'

/* ------------------ HoverBorderGradient (framer-motion) ------------------ */

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = 'div',
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType
    containerClassName?: string
    className?: string
    duration?: number
    clockwise?: boolean
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false)
  const [direction, setDirection] = useState<Direction>('TOP')

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT']
    const currentIndex = directions.indexOf(currentDirection)
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length
    return directions[nextIndex]
  }

  const movingMap: Record<Direction, string> = {
    TOP: 'radial-gradient(20.7% 50% at 50% 0%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
    LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
    BOTTOM:
      'radial-gradient(20.7% 50% at 50% 100%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
    RIGHT:
      'radial-gradient(16.2% 41.2% at 100% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
  }

  const highlight =
    'radial-gradient(75% 181% at 50% 50%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)'

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(
        () => {
          setDirection((prev) => rotateDirection(prev))
        },
        (duration || 1) * 1000,
      )
      return () => clearInterval(interval)
    }
    return
  }, [hovered, duration, clockwise])

  const MotionTag: any = motion(Tag as any)

  return (
    <MotionTag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex rounded-full items-center justify-center overflow-visible p-[1px] w-fit',
        containerClassName,
      )}
      {...props}
      whileHover={{ translateY: -2 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      <div className={cn('relative z-30 rounded-[inherit]', className)}>
        {children}
      </div>

      <motion.div
        className="absolute inset-0 rounded-[inherit] z-0 pointer-events-none"
        style={{ filter: 'blur(6px)' }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ duration: duration ?? 1, ease: 'linear' }}
      />

      <div className="absolute inset-[3px] rounded-[inherit] bg-black  z-20 pointer-events-none" />
    </MotionTag>
  )
}

/* ------------------ Main component ------------------ */

export const BackgroundCellAnimation = () => {
  const router = useRouter()
  return (
    <div className="relative h-screen w-full bg-[#0f0f0f] flex flex-col justify-center items-center overflow-hidden text-white">
      <BackgroundCellCore />

      {/* Floating blur shapes */}
      <motion.div
        className="absolute top-[-8rem] left-[-10rem] w-[25rem] h-[25rem] bg-white/8 rounded-full blur-3xl"
        animate={{ x: [0, 60, -40, 0], y: [0, -40, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-8rem] right-[-10rem] w-[20rem] h-[20rem] bg-white/8 rounded-full blur-3xl"
        animate={{ x: [0, -30, 30, 0], y: [0, 30, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Title */}
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        PathPilot
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-lg md:text-xl text-gray-300 text-center max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        Unlock AI-powered resume insights, job matching, and interview feedback
        — all in one place.
      </motion.p>

      {/* Call to Action Button */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
      >
        <HoverBorderGradient containerClassName="rounded-full" duration={1.2}>
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.98 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
              ease: 'easeInOut',
            }}
          >
            <a href="/auth/login">
              <Button
                size="lg"
                className={cn(
                  'relative overflow-hidden rounded-full px-10 py-6 font-semibold transition-all duration-10000 ease-in-out group',
                  'bg-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.7)] border border-white/20',
                )}
              >
                {/* White overlay slides in on hover */}
                <span
                  aria-hidden
                  className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out pointer-events-none"
                  style={{ zIndex: 5 }}
                />

                {/* Gloss effect */}
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-[1.5s] mix-blend-overlay pointer-events-none"
                  style={{ zIndex: 6 }}
                />

                {/* Button content */}
                <span className="relative z-10 flex items-center gap-3 transition-transform duration-500 ease-in-out">
                  <span
                    className="size-1 rounded-full bg-white transition-all duration-[1.5s] group-hover:opacity-0 group-hover:scale-75"
                    style={{ zIndex: 10 }}
                  />
                  <span
                    className="text-lg font-semibold text-white group-hover:text-black transition-colors duration-[1.5s]"
                    style={{ zIndex: 10 }}
                  >
                    Get Started
                  </span>
                </span>
              </Button>
            </a>
          </motion.div>
        </HoverBorderGradient>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-6 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        © {new Date().getFullYear()} PathPilot — All rights reserved.
      </motion.footer>
    </div>
  )
}

/* ------------------ BackgroundCellCore & Pattern ------------------ */

const BackgroundCellCore = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  const size = 300

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 h-full"
    >
      <div className="absolute h-[20rem] inset-y-0 overflow-hidden">
        <div className="absolute h-full w-full pointer-events-none -bottom-2 z-40 bg-[#0f0f0f] [mask-image:linear-gradient(to_bottom,transparent,black)]" />

        <div
          className="absolute inset-0 z-20 bg-transparent"
          style={{
            maskImage: `radial-gradient(${size / 4}px circle at center, white, transparent)`,
            WebkitMaskImage: `radial-gradient(${size / 4}px circle at center, white, transparent)`,
            WebkitMaskPosition: `${mousePosition.x - size / 2}px ${mousePosition.y - size / 2}px`,
            WebkitMaskSize: `${size}px`,
            maskSize: `${size}px`,
            pointerEvents: 'none',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          }}
        >
          <Pattern cellClassName="border-gray-500/20" />
        </div>

        <Pattern className="opacity-50" cellClassName="border-gray-600/30" />
      </div>
    </div>
  )
}

const Pattern = ({
  className,
  cellClassName,
}: {
  className?: string
  cellClassName?: string
}) => {
  const cols = 47
  const rows = 30
  const matrix = Array.from({ length: rows }, (_, y) =>
    Array.from({ length: cols }, (_, x) => [x, y]),
  )

  return (
    <div className={cn('flex flex-row relative z-30', className)}>
      {matrix.map((row, rowIdx) => (
        <div
          key={`row-${rowIdx}`}
          className="flex flex-col border-b relative z-20"
        >
          {row.map(([x, y]) => (
            <motion.div
              key={`cell-${x}-${y}`}
              className={cn(
                'h-12 w-12 border-l border-b bg-transparent',
                cellClassName,
              )}
              whileHover={{
                backgroundColor: 'rgba(255,255,255,0.25)',
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
