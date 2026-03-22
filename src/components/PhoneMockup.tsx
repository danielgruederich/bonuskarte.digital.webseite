import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const screens = [
  '/screens/screen-1.webp',
  '/screens/screen-2.webp',
  '/screens/screen-3.webp',
  '/screens/screen-4.webp',
  '/screens/screen-5.webp',
  '/screens/screen-6.webp',
  '/screens/screen-7.webp',
  '/screens/screen-8.webp',
  '/screens/screen-9.webp',
  '/screens/screen-10.webp',
  '/screens/screen-11.webp',
  '/screens/screen-12.webp',
  '/screens/screen-13.webp',
]

const labels = [
  "Bambule's Chili",
  'Formula Uno',
  'AWB Coffee',
  'Pizza Karte',
  'Tastyy Döner',
  'MeinDentist',
  'Bullet Shop',
  'Goldjunge · Köln',
  "Sam's Cheesesteak",
  'Caruso · Focaccia Bar',
  'Reinigung',
  'Ojalá Poke',
  'Underluxx',
]

export default function PhoneMockup() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % screens.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative flex flex-col items-center gap-5">

      {/* Phone frame */}
      <div className="relative w-[260px] h-[530px]">

        {/* Outer shell */}
        <div className="absolute inset-0 rounded-[44px] bg-[#E8530E] shadow-[0_0_0_2px_#FF6B2B,0_40px_80px_rgba(0,0,0,0.6)]" />

        {/* Side buttons */}
        <div className="absolute -left-[3px] top-[100px] w-[3px] h-[32px] bg-[#FF6B2B] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[145px] w-[3px] h-[56px] bg-[#FF6B2B] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[212px] w-[3px] h-[56px] bg-[#FF6B2B] rounded-l-sm" />
        <div className="absolute -right-[3px] top-[160px] w-[3px] h-[72px] bg-[#FF6B2B] rounded-r-sm" />

        {/* Screen area */}
        <div className="absolute inset-[3px] rounded-[41px] overflow-hidden bg-white">

          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-black rounded-full z-30" />

          {/* Card image — starts below Dynamic Island */}
          <div className="absolute left-0 right-0 bottom-0" style={{ top: '48px' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={screens[current]}
                alt={labels[current]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="w-full h-full object-cover object-top"
              />
            </AnimatePresence>
          </div>

          {/* Bottom fade — hides page dots + grey area */}
          <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-white to-transparent z-20" />

          {/* Bottom home bar */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-black/10 rounded-full z-30" />
        </div>

        {/* Gold glow under phone */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[180px] h-[40px] bg-[#E8530E] blur-[40px] opacity-25 rounded-full" />
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-2">
        {screens.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-5 h-1.5 bg-yellow-600'
                : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Zeige Screen ${i + 1}`}
          />
        ))}
      </div>

      {/* Label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={current}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
          className="text-[10px] tracking-[0.25em] uppercase text-white/50"
        >
          {labels[current]}
        </motion.p>
      </AnimatePresence>

    </div>
  )
}
