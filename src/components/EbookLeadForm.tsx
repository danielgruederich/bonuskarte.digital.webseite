import { useState, type FormEvent, type ChangeEvent, useRef } from 'react'
import { analytics } from '../lib/analytics'

interface Props {
  /** Pfad zur PDF-Datei, die nach Lead-Erfassung freigeschaltet wird. */
  pdfUrl?: string
  /** Dateiname für den Download. */
  pdfName?: string
  /** Salesflare-Tag, um diesen Lead-Magneten zu kennzeichnen. */
  ebookTag?: string
  city?: string
  niche?: string
  submitLabel?: string
}

type State = 'idle' | 'submitting' | 'success' | 'error'

const inputClass =
  'w-full px-4 py-3 bg-ink/20 border border-ink/20 text-ink placeholder-ink/40 text-sm tracking-wide focus:outline-none focus:border-amber focus:bg-ink/8 transition-colors'
const labelClass = 'block text-xs font-medium tracking-[0.2em] uppercase text-ink/60 mb-2'

export default function EbookLeadForm({
  pdfUrl = '/downloads/leitfaden-stammkunden-cafes-koeln.pdf',
  pdfName = 'Leitfaden-Stammkunden-Cafes-Koeln.pdf',
  ebookTag = 'leitfaden-cafes-koeln',
  city = 'koeln',
  niche = 'cafe',
  submitLabel = 'Leitfaden gratis herunterladen',
}: Props) {
  const [state, setState] = useState<State>('idle')
  const [vorname, setVorname] = useState('')
  const [instagram, setInstagram] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const formStartedRef = useRef(false)

  function handleInstagramChange(e: ChangeEvent<HTMLInputElement>) {
    setInstagram(e.target.value.replace(/^@+/, ''))
  }

  function handleFirstFocus() {
    if (!formStartedRef.current) {
      formStartedRef.current = true
      analytics.signupFormStart(niche, city, 'ebook')
    }
  }

  function getUtmParams(): Record<string, string> {
    const params = new URLSearchParams(window.location.search)
    const path = window.location.pathname.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'leitfaden'
    const utm: Record<string, string> = {
      utm_source: params.get('utm_source') || 'bonuskarte.digital',
      utm_medium: params.get('utm_medium') || 'ebook',
      utm_campaign: params.get('utm_campaign') || path,
    }
    if (params.get('utm_content')) utm.utm_content = params.get('utm_content')!
    if (params.get('utm_term')) utm.utm_term = params.get('utm_term')!
    if (params.get('fbclid')) utm.fbclid = params.get('fbclid')!
    return utm
  }

  function triggerDownload() {
    const a = document.createElement('a')
    a.href = pdfUrl
    a.download = pdfName
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setVorname((data.vorname as string) ?? '')
    const cleanInstagram = String(data.instagram ?? '').replace(/^@+/, '')
    analytics.signupSubmitAttempt(niche, city, 'ebook')

    try {
      const res = await fetch('/api/submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'ebook',
          ebook: ebookTag,
          vorname: data.vorname,
          telefon: data.telefon,
          instagram: cleanInstagram,
          niche,
          city,
          source: 'ebook',
          utm: getUtmParams(),
        }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        analytics.signupSubmit(niche, city, 'ebook')
        analytics.leadConversion()
        setState('success')
        form.reset()
        setInstagram('')
        // Download direkt anstoßen
        setTimeout(triggerDownload, 400)
      } else {
        setErrorMsg('Etwas ist schiefgelaufen. Bitte versuche es erneut.')
        setState('error')
      }
    } catch {
      setErrorMsg('Keine Verbindung. Bitte Internetverbindung prüfen und erneut versuchen.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 border border-amber/40 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold tracking-wide text-ink mb-3">
          {vorname ? `Viel Spaß beim Lesen, ${vorname}!` : 'Dein Leitfaden ist fertig!'}
        </h3>
        <p className="text-ink text-sm leading-relaxed max-w-sm mx-auto mb-7">
          Der Download startet automatisch. Falls nicht, klick einfach hier:
        </p>
        <a
          href={pdfUrl}
          download={pdfName}
          onClick={triggerDownload}
          className="inline-flex items-center justify-center gap-3 bg-amber hover:bg-amber-dark text-black font-bold tracking-[0.15em] uppercase text-sm px-8 py-4 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          Leitfaden als PDF öffnen
        </a>
        <p className="mt-7 text-xs tracking-widest uppercase text-ink/50">
          Wir melden uns in Kürze per WhatsApp bei dir.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-xs tracking-[0.2em] uppercase text-ink/55 mb-1">
        3 Felder · 30 Sekunden · sofortiger Download
      </p>

      <div>
        <label htmlFor="vorname" className={labelClass}>Dein Vorname *</label>
        <input id="vorname" name="vorname" type="text" required placeholder="Max" autoComplete="given-name" onFocus={handleFirstFocus} className={inputClass} />
      </div>

      <div>
        <label htmlFor="telefon" className={labelClass}>Handynummer *</label>
        <input id="telefon" name="telefon" type="tel" required placeholder="+49 170 …" autoComplete="tel" inputMode="tel" className={inputClass} />
      </div>

      <div>
        <label htmlFor="instagram" className={labelClass}>Instagram-Account *</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber text-sm font-medium select-none">@</span>
          <input
            id="instagram"
            name="instagram"
            type="text"
            required
            placeholder="dein_laden"
            value={instagram}
            onChange={handleInstagramChange}
            autoComplete="off"
            autoCapitalize="none"
            className={`${inputClass} pl-8`}
          />
        </div>
      </div>

      {state === 'error' && (
        <p className="text-sm text-red-400 border border-red-400/30 px-4 py-3">
          {errorMsg || 'Etwas ist schiefgelaufen. Bitte versuche es erneut.'}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="w-full group flex items-center justify-center gap-3 bg-amber hover:bg-amber-dark disabled:opacity-50 text-black font-bold tracking-[0.15em] uppercase text-sm py-4 transition-all"
      >
        {state === 'submitting' ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Wird vorbereitet…
          </>
        ) : (
          <>
            {submitLabel}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </button>

      <p className="text-xs tracking-widest uppercase text-center text-ink/70">
        Kostenlos · Kein Spam · DSGVO-konform
      </p>
    </form>
  )
}
