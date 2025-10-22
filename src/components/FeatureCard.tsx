'use client'
import React from 'react'
import { FileText, Mic, Search } from 'lucide-react'
import { HoverEffect } from '@/components/ui/card-hover-effect' // adjust import path if needed

export function FeatureCards() {
  return (
    <section className="mt-24 mb-20 w-full">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-14">
        Features Overview
      </h2>

      <div className="max-w-6xl mx-auto px-8">
        <HoverEffect items={features} />
      </div>
    </section>
  )
}

export const features = [
  {
    title: 'Resume Analyzer',
    description:
      'Upload your resume and get your skills, education, and experience automatically extracted. AI-powered parsing saves time and helps tailor your job search.',
    icon: <FileText className="text-white w-8 h-8 mb-2" />,
    link: '/features/resume-analyzer',
  },
  {
    title: 'Job Matcher',
    description:
      'Get job recommendations based on your profile and interests. Filter by skills, location, and job type to find your best fit.',
    icon: <Search className="text-white w-8 h-8 mb-2" />,
    link: '/features/job-matcher',
  },
  {
    title: 'AI Interview Coach',
    description:
      'Record mock interviews and receive instant feedback on tone, pace, and vocabulary. Practice and improve before your real interview.',
    icon: <Mic className="text-white w-8 h-8 mb-2" />,
    link: '/features/ai-interview-coach',
  },
]
