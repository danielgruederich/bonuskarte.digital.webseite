import { useState, useEffect, useRef } from 'react'

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
  const [labelVisible, setLabelVisible] = useState(true)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = (next: number) => {
    if (next === current) return
    setLabelVisible(false)
    setTimeout(() => {
      setCurrent(next)
      setLabelVisible(true)
    }, 150)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setLabelVisible(false)
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % screens.length)
        setLabelVisible(true)
      }, 150)
    }, 3000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return (
    <>
      <style>{`
        .phone-mockup-wrap {
          --phone-w: 260px;
          --phone-h: 530px;
        }
        @media (min-width: 768px) {
          .phone-mockup-wrap {
            --phone-w: min(260px, 100%);
            --phone-h: auto;
            aspect-ratio: 260 / 580;
          }
        }
        .phone-label {
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .phone-label-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .phone-label-hidden {
          opacity: 0;
          transform: translateY(-4px);
        }
      `}</style>
      <div className="phone-mockup-wrap relative flex flex-col items-center gap-3 w-full max-w-[260px]">

      {/* Phone frame – aspect ratio preserves proportions */}
      <div className="relative w-full" style={{ aspectRatio: '260 / 530' }}>

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
            <img
              src={screens[current]}
              alt={labels[current]}
              loading="lazy"
              decoding="async"
              width={254}
              height={482}
              className="w-full h-full object-cover object-top transition-opacity duration-500 ease-in-out"
            />
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
            onClick={() => goTo(i)}
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
      <p
        className={`text-[10px] tracking-[0.25em] uppercase text-white phone-label ${
          labelVisible ? 'phone-label-visible' : 'phone-label-hidden'
        }`}
      >
        {labels[current]}
      </p>

    </div>
    </>
  )
}
