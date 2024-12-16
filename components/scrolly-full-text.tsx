"use client"

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ScrollyFullTextProps {
  children: React.ReactNode
}

export function ScrollyFullText({ children }: ScrollyFullTextProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <div ref={sectionRef} className="min-h-screen flex items-center justify-center relative">
      <motion.div 
        style={{ opacity, scale }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  )
} 