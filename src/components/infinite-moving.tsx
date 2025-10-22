'use client'

import React from 'react'
import { InfiniteMovingCards } from '../components/ui/infinite-moving-cards'
import { Button } from '@/components/ui/button'

export function InfiniteMovingCardsDemo() {
  return (
    <div className="mt-24 h-[40rem] w-full flex items-center justify-center overflow-hidden">
      <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
    </div>
  )
}

const testimonials = [
  {
    quote:
      'PathPilot helped me find and prepare for my dream job in just two weeks.',
    name: 'Aarav Sharma',
    title: 'Software Engineer',
  },
  {
    quote:
      'The AI resume analyzer gave me insights I never would’ve noticed myself!',
    name: 'Neha Verma',
    title: 'Product Manager',
  },
  {
    quote:
      'Finally, a platform that connects skills to opportunities. Brilliant.',
    name: 'Rohit Mehta',
    title: 'UX Designer',
  },
  {
    quote:
      'Interview feedback was instant and detailed — made my prep 10x better.',
    name: 'Ishita Patel',
    title: 'Data Analyst',
  },
]
