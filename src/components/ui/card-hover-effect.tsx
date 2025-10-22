// 'use client'
// import { cn } from '@/lib/utils'
// import { AnimatePresence, motion } from 'framer-motion'
// import { useState } from 'react'

// export const HoverEffect = ({
//   items,
//   className,
// }: {
//   items: {
//     title: string
//     description: string
//     link: string
//     icon?: React.ReactNode
//   }[]
//   className?: string
// }) => {
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

//   return (
//     <div
//       className={cn(
//         'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-8',
//         className
//       )}
//     >
//       {items.map((item, idx) => (
//         <a
//           href={item.link}
//           key={item.link}
//           className="relative group block p-2 h-full w-full"
//           onMouseEnter={() => setHoveredIndex(idx)}
//           onMouseLeave={() => setHoveredIndex(null)}
//         >
//           <AnimatePresence>
//             {hoveredIndex === idx && (
//               <motion.span
//                 className="absolute inset-0 h-full w-full bg-gradient-to-br from-slate-900 via-black to-gray-900 block rounded-3xl border border-white/10 shadow-[0_0_25px_rgba(255,255,255,0.05)]"
//                 layoutId="hoverBackground"
//                 initial={{ opacity: 0, scale: 0.98 }}
//                 animate={{
//                   opacity: 1,
//                   scale: 1,
//                   transition: { duration: 0.35, ease: 'easeOut' },
//                 }}
//                 exit={{
//                   opacity: 0,
//                   scale: 0.98,
//                   transition: { duration: 0.25, ease: 'easeIn' },
//                 }}
//               />
//             )}
//           </AnimatePresence>

//           <Card>
//             {item.icon && <div className="mb-4 text-white">{item.icon}</div>}
//             <CardTitle>{item.title}</CardTitle>
//             <CardDescription>{item.description}</CardDescription>
//           </Card>
//         </a>
//       ))}
//     </div>
//   )
// }

// /* ---------------- Card Components ---------------- */

// export const Card = ({
//   className,
//   children,
// }: {
//   className?: string
//   children: React.ReactNode
// }) => (
//   <motion.div
//     whileHover={{ y: -6, scale: 1.02 }}
//     transition={{ duration: 0.35, ease: 'easeOut' }}
//     className={cn(
//       'rounded-3xl h-full w-full p-6 overflow-hidden bg-[#0f0f0f] border border-white/10 relative z-20 shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_35px_rgba(255,255,255,0.05)] transition-all duration-300',
//       className
//     )}
//   >
//     <div className="relative z-50">
//       <div className="p-2">{children}</div>
//     </div>
//   </motion.div>
// )

// export const CardTitle = ({
//   className,
//   children,
// }: {
//   className?: string
//   children: React.ReactNode
// }) => (
//   <h4
//     className={cn(
//       'text-zinc-100 font-semibold text-lg tracking-wide mt-2 mb-2',
//       className
//     )}
//   >
//     {children}
//   </h4>
// )

// export const CardDescription = ({
//   className,
//   children,
// }: {
//   className?: string
//   children: React.ReactNode
// }) => (
//   <p
//     className={cn(
//       'text-zinc-400 text-sm tracking-wide leading-relaxed',
//       className
//     )}
//   >
//     {children}
//   </p>
// )
'use client'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description: string
    link: string
    icon?: React.ReactNode
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-12 gap-8',
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.link}
          className="relative group block h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-900 via-black to-gray-900 border border-white/10 shadow-[0_0_25px_rgba(255,255,255,0.05)]"
                layoutId="hoverBackground"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.35, ease: 'easeOut' },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.98,
                  transition: { duration: 0.25, ease: 'easeIn' },
                }}
                style={{ margin: '0.5rem' }} // matches card padding offset
              />
            )}
          </AnimatePresence>

          <Card>
            {item.icon && <div className="mb-4 text-white">{item.icon}</div>}
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
            <div className="mt-6">
              <a href={item.link}>
                <Button
                  size="sm"
                  variant="outline"
                  className={cn(
                    'text-xs rounded-full border-white/20 text-black hover:bg-gray-500 hover:text-white transition-all duration-300'
                  )}
                >
                  Learn More
                </Button>
              </a>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}

/* ---------------- Card Components ---------------- */

export const Card = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.02 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    className={cn(
      'relative z-10 rounded-3xl h-full w-full p-6 bg-[#0f0f0f] border border-white/10 overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_35px_rgba(255,255,255,0.05)] transition-all duration-300',
      className
    )}
  >
    <div className="relative z-20 flex flex-col justify-between h-full">
      {children}
    </div>
  </motion.div>
)

export const CardTitle = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => (
  <h4
    className={cn(
      'text-zinc-100 font-semibold text-lg tracking-wide mb-2 leading-snug',
      className
    )}
  >
    {children}
  </h4>
)

export const CardDescription = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => (
  <p
    className={cn(
      'text-zinc-400 text-sm leading-relaxed tracking-wide',
      className
    )}
  >
    {children}
  </p>
)
