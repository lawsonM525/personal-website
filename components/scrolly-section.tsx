"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ScrollySectionProps {
  children: React.ReactNode
  illustration: React.ReactNode
}

export function ScrollySection({ children, illustration }: ScrollySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [sectionHeight, setSectionHeight] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  useEffect(() => {
    if (sectionRef.current) {
      setSectionHeight(sectionRef.current.offsetHeight)
    }
  }, [])

  return (
    <div ref={sectionRef} className="min-h-screen flex items-center justify-center relative">
      <div className="w-full max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div style={{ opacity, scale }}>
            {children}
          </motion.div>
          <motion.div style={{ opacity, scale }} className="hidden md:block">
            {illustration}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

