/**
 * Parse SimplyMeet.me date string (dd-mm-yyyy or dd-mm-yyyy HH:MM, 24h)
 * → "Montag, 29. Juni 2026, 14:30 Uhr"
 */
export function formatDate(str: string): string {
  if (!str) return str
  const m = str.match(/^(\d{2})-(\d{2})-(\d{4})(?:[\s,]+(\d{2}):(\d{2}))?/)
  if (!m) return str
  const [, dd, mm, yyyy, hh, min] = m
  const day = +dd, month = +mm, hour = hh ? +hh : 0, minute = min ? +min : 0
  if (month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59) return str
  const d = new Date(+yyyy, month - 1, day, hour, minute)
  if (isNaN(d.getTime())) return str
  const datePart = d.toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return hh ? `${datePart}, ${hh}:${min} Uhr` : datePart
}
