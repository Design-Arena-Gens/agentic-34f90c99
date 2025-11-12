'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const scenes = [
  {
    id: 1,
    title: 'ELEGANCE',
    subtitle: 'Redefined',
    description: 'Exquisite craftsmanship meets timeless design',
    background: 'radial-gradient(circle at 30% 50%, #2d1810 0%, #0a0a0a 100%)',
  },
  {
    id: 2,
    title: 'NEW COLLECTION',
    subtitle: 'Coming Soon',
    description: 'Discover the art of luxury jewelry',
    background: 'radial-gradient(circle at 70% 50%, #1a1a2e 0%, #0a0a0a 100%)',
  },
  {
    id: 3,
    title: 'UNVEILING',
    subtitle: 'Spring 2025',
    description: 'Where brilliance meets beauty',
    background: 'radial-gradient(circle at 50% 50%, #1e1a1a 0%, #0a0a0a 100%)',
  },
]

const Sparkle = ({ delay }: { delay: number }) => {
  const [position] = useState({
    x: Math.random() * 100,
    y: Math.random() * 100,
  })

  return (
    <motion.div
      className="sparkle"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${Math.random() * 4 + 2}px`,
        height: `${Math.random() * 4 + 2}px`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3,
      }}
    />
  )
}

const DiamondIcon = () => (
  <motion.svg
    width="120"
    height="120"
    viewBox="0 0 100 100"
    initial={{ rotate: 0, scale: 0 }}
    animate={{
      rotate: [0, 5, -5, 0],
      scale: [0, 1.2, 1],
    }}
    transition={{
      duration: 2,
      ease: "easeOut",
      repeat: Infinity,
      repeatDelay: 3,
    }}
  >
    <defs>
      <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: '#F5F5DC', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      d="M 50 10 L 80 35 L 70 80 L 30 80 L 20 35 Z"
      fill="url(#diamondGradient)"
      stroke="#D4AF37"
      strokeWidth="2"
    />
    <path d="M 20 35 L 50 50 L 80 35" stroke="#B8941E" strokeWidth="1.5" fill="none" />
    <path d="M 30 80 L 50 50 L 70 80" stroke="#B8941E" strokeWidth="1.5" fill="none" />
    <path d="M 50 10 L 50 50" stroke="#B8941E" strokeWidth="1.5" />
  </motion.svg>
)

export default function Home() {
  const [currentScene, setCurrentScene] = useState(0)
  const [showLogo, setShowLogo] = useState(false)

  useEffect(() => {
    const sceneInterval = setInterval(() => {
      setCurrentScene((prev) => {
        if (prev < scenes.length - 1) {
          return prev + 1
        } else {
          clearInterval(sceneInterval)
          setTimeout(() => setShowLogo(true), 500)
          return prev
        }
      })
    }, 4000)

    return () => clearInterval(sceneInterval)
  }, [])

  const scene = scenes[currentScene]

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Background */}
      <motion.div
        key={`bg-${scene.id}`}
        className="absolute inset-0"
        style={{ background: scene.background }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      />

      {/* Sparkles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Sparkle key={i} delay={i * 0.1} />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <AnimatePresence mode="wait">
          {!showLogo ? (
            <motion.div
              key={`scene-${scene.id}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              {/* Diamond Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex justify-center mb-8"
              >
                <DiamondIcon />
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, letterSpacing: '0.5em' }}
                animate={{ opacity: 1, letterSpacing: '0.2em' }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="font-serif text-6xl md:text-8xl font-bold text-gold tracking-wider"
              >
                {scene.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="font-sans text-2xl md:text-4xl text-cream tracking-wide"
              >
                {scene.subtitle}
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="font-sans text-lg md:text-xl text-cream/80 max-w-2xl mx-auto"
              >
                {scene.description}
              </motion.p>

              {/* Decorative line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '200px' }}
                transition={{ duration: 1.5, delay: 1.2 }}
                className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"
              />
            </motion.div>
          ) : (
            <motion.div
              key="final-logo"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="space-y-12"
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <DiamondIcon />
              </motion.div>

              <div className="space-y-6">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="font-serif text-5xl md:text-7xl font-bold text-gold tracking-widest"
                >
                  LUXE
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="font-sans text-xl md:text-2xl text-cream tracking-[0.3em]"
                >
                  JEWELRY
                </motion.p>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '300px' }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"
                />

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  className="font-sans text-lg text-cream/90 tracking-wide"
                >
                  New Collection
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                  className="font-sans text-2xl md:text-3xl font-light text-gold"
                >
                  Spring 2025
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-12 py-4 border-2 border-gold text-gold font-sans tracking-widest hover:bg-gold hover:text-black transition-all duration-300"
                >
                  NOTIFY ME
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ambient light effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </main>
  )
}
