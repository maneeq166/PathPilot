'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { FileText, Search, Mic } from 'lucide-react' // lucide-react icons

type Feature = {
  title: string
  description: string
  support: string
  icon: React.ReactNode
  link?: string
}

const features: Feature[] = [
  {
    title: 'Resume Analyzer',
    description: 'Upload your resume and get your skills, education, and experience automatically extracted.',
    support: 'AI-powered parsing saves time and helps tailor your job search.',
    icon: <FileText size={32} />,
    link: '/features/resume-analyzer',
  },
  {
    title: 'Job Matcher',
    description: 'Get job recommendations based on your profile and interests.',
    support: 'Filter by skills, location, and job type.',
    icon: <Search size={32} />,
    link: '/features/job-matcher',
  },
  {
    title: 'AI Interview Coach',
    description: 'Record mock interviews and receive instant feedback on tone, pace, and vocabulary.',
    support: 'Practice and improve before your real interview.',
    icon: <Mic size={32} />,
    link: '/features/ai-interview-coach',
  },
]

export const FeatureCards = () => {
  return (
    <section className="mt-20 w-full max-w-6xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
        Features Overview
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="bg-gray-900/50 p-6 rounded-2xl shadow-lg flex flex-col items-start gap-4 hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <div className="text-white mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
            <p className="text-gray-400 italic">{feature.support}</p>
            {feature.link && (
              <a href={feature.link}>
                <Button
                  size="sm"
                  className={cn(
                    'mt-4 bg-black text-white hover:bg-white hover:text-black border border-white/20 transition-all duration-300'
                  )}
                >
                  Learn More
                </Button>
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
