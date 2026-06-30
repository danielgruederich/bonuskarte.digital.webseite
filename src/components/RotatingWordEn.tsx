import { useEffect, useState } from 'react'

const branches = [
  'Bakeries', 'Cafés', 'Restaurants', 'Hair salons', 'Kebab shops',
  'Pizzerias', 'Ice cream shops', 'Florists', 'Gyms', 'Beauty salons',
]

export default function RotatingWordEn() {
  const [index, setIndex] = useState(0)
  const [animState, setAnimState] = useState<'enter' | 'visible' | 'exit'>('visible')

  useEffect(() => {
    if (animState === 'visible') {
      const timer = setTimeout(() => setAnimState('exit'), 2000)
      return () => clearTimeout(timer)
    }
    if (animState === 'exit') {
      const timer = setTimeout(() => {
        setIndex((i) => (i + 1) % branches.length)
        setAnimState('enter')
      }, 300)
      return () => clearTimeout(timer)
    }
    if (animState === 'enter') {
      const raf = requestAnimationFrame(() => setAnimState('visible'))
      return () => cancelAnimationFrame(raf)
    }
  }, [animState])

  const cls = `inline-block rotating-word-${animState}`

  return (
    <>
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
      <span className="font-bold text-amber block">card</span>
      <span className="font-bold text-ink block">for your</span>
      <span className="block">
        <span className={`${cls} font-bold text-amber`}>{branches[index]}</span>
      </span>
    </>
  )
}
