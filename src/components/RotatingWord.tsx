import { useState, useEffect, useCallback } from 'react'

const words = ['Kundenkarte', 'Stempelkarte', 'Clubkarte', 'Communitykarte', 'Couponkarte']

const TYPING_SPEED = 80
const DELETING_SPEED = 50
const PAUSE_AFTER_TYPING = 2000
const PAUSE_AFTER_DELETING = 300

export default function RotatingWord() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const tick = useCallback(() => {
    const currentWord = words[wordIndex]

    if (!isDeleting) {
      // Typing
      const next = currentWord.slice(0, displayed.length + 1)
      setDisplayed(next)

      if (next === currentWord) {
        // Finished typing — pause, then start deleting
        setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPING)
        return
      }
    } else {
      // Deleting
      const next = currentWord.slice(0, displayed.length - 1)
      setDisplayed(next)

      if (next === '') {
        setIsDeleting(false)
        setWordIndex(i => (i + 1) % words.length)
        return
      }
    }
  }, [displayed, isDeleting, wordIndex])

  useEffect(() => {
    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED
    // Don't schedule if we just finished typing (pause handles it)
    if (!isDeleting && displayed === words[wordIndex]) return

    const timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [tick, displayed, isDeleting, wordIndex])

  // Start typing after deleting pause
  useEffect(() => {
    if (!isDeleting && displayed === '') {
      const timer = setTimeout(tick, PAUSE_AFTER_DELETING)
      return () => clearTimeout(timer)
    }
  }, [isDeleting, displayed, tick])

  return (
    <span className="inline-block">
      {displayed}
      <span className="inline-block w-[3px] h-[0.85em] bg-gold-600 ml-1 align-middle animate-blink" />
    </span>
  )
}
