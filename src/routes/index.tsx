import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button';
import { BackgroundCellAnimation } from '@/components/B'

export const Route = createFileRoute('/')({
  component: LandingPage,
})


function LandingPage() {
  return (
    <div className="z-0 relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/20 to-foreground text-foreground">
      <BackgroundCellAnimation>
      </BackgroundCellAnimation>
      
    </div>
  )
}
