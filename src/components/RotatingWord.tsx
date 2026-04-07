import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const words = ['Stempelkarte', 'Bonuskarte', 'Kundenkarte', 'Clubkarte', 'Communitykarte']

export default function RotatingWord() {
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setWordIndex((i) => (i + 1) % words.length)
    }, 2000)
    return () => clearTimeout(timer)
  }, [wordIndex])

  return (
    <span className="inline-block relative font-bold text-gold-600">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[wordIndex]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          {words[wordIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
