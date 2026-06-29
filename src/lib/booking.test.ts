import { describe, it, expect } from 'vitest'
import { formatDate } from './booking'

describe('formatDate', () => {
  it('formats dd-mm-yyyy with time', () => {
    expect(formatDate('29-06-2026 14:30')).toBe('Montag, 29. Juni 2026, 14:30 Uhr')
  })

  it('formats dd-mm-yyyy without time', () => {
    expect(formatDate('29-06-2026')).toBe('Montag, 29. Juni 2026')
  })

  it('handles comma-separated format (dd-mm-yyyy, HH:MM)', () => {
    expect(formatDate('29-06-2026, 14:30')).toBe('Montag, 29. Juni 2026, 14:30 Uhr')
  })

  it('returns empty string unchanged', () => {
    expect(formatDate('')).toBe('')
  })

  it('returns unrecognized strings unchanged', () => {
    expect(formatDate('foobar')).toBe('foobar')
  })

  it('formats midnight as 00:00 Uhr', () => {
    expect(formatDate('01-01-2026 00:00')).toBe('Donnerstag, 1. Januar 2026, 00:00 Uhr')
  })

  it('handles single-digit day and month correctly (leading zeros)', () => {
    expect(formatDate('05-03-2026 09:00')).toBe('Donnerstag, 5. März 2026, 09:00 Uhr')
  })

  it('returns invalid date strings unchanged', () => {
    expect(formatDate('99-99-2026 14:30')).toBe('99-99-2026 14:30')
  })
})
