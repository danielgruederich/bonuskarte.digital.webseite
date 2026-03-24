import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const words = ['Kundenkarte', 'Stempelkarte', 'Clubkarte', 'Communitykarte', 'Couponkarte']

export default function RotatingWord() {
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setWordIndex((i) => (i + 1) % words.length)
    }, 2000)
    return () => clearTimeout(timer)
  }, [wordIndex])

  // Find the longest word to reserve stable height
  const longest = words.reduce((a, b) => (a.length > b.length ? a : b), '')

  return (
    <span className="relative flex w-full justify-start overflow-hidden md:pb-4 md:pt-1">
      {/* Invisible longest word reserves stable width + height */}
      <span className="invisible font-extralight" aria-hidden="true">{longest}</span>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="absolute font-extralight"
          initial={{ opacity: 0, y: '-100%' }}
          transition={{ type: 'spring', stiffness: 50 }}
          animate={
            wordIndex === index
              ? { y: 0, opacity: 1 }
              : { y: wordIndex > index ? '-150%' : '150%', opacity: 0 }
          }
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
