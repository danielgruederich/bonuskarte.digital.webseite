import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const words = ['Kundenkarte', 'Stempelkarte', 'Clubkarte', 'Communitykarte', 'Couponkarte']

export default function RotatingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % words.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="inline-block relative overflow-hidden align-bottom" style={{ height: '1.15em' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
