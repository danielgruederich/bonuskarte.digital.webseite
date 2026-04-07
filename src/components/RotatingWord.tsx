import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const words = ['Stempelkarte', 'Bonuskarte', 'Kundenkarte', 'Clubkarte', 'Communitykarte']

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
    <div className="relative w-full overflow-hidden text-gold-600 font-bold text-5xl sm:text-6xl tracking-tighter">
      {/* Invisible longest word reserves stable height */}
      <span className="invisible block" aria-hidden="true">{longest}</span>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="absolute top-0 left-0"
          initial={index === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: '150%' }}
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
    </div>
  )
}
