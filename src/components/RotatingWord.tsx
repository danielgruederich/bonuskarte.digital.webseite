import { useEffect, useState } from 'react'

const words = ['Stempelkarte', 'Bonuskarte', 'Kundenkarte', 'Clubkarte', 'Communitykarte']

export default function RotatingWord() {
  const [wordIndex, setWordIndex] = useState(0)
  const [animState, setAnimState] = useState<'enter' | 'visible' | 'exit'>('visible')

  useEffect(() => {
    if (animState === 'visible') {
      const timer = setTimeout(() => {
        setAnimState('exit')
      }, 2000)
      return () => clearTimeout(timer)
    }

    if (animState === 'exit') {
      const timer = setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length)
        setAnimState('enter')
      }, 300)
      return () => clearTimeout(timer)
    }

    if (animState === 'enter') {
      // Force a reflow so the enter keyframe starts from the initial state
      const raf = requestAnimationFrame(() => {
        setAnimState('visible')
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [animState])

  return (
    <span className="inline-block relative font-bold text-gold-600">
      <style>{`
        .rotating-word-enter {
          opacity: 0;
          transform: translateY(20px);
        }
        .rotating-word-visible {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .rotating-word-exit {
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
      `}</style>
      <span
        className={`inline-block rotating-word-${animState}`}
      >
        {words[wordIndex]}
      </span>
    </span>
  )
}
