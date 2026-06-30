import { useState, useEffect, type FormEvent, type ChangeEvent, useRef } from 'react'

interface NicheOption {
  slug: string
  label: string
}

interface Props {
  whatsappUrl?: string
}

interface CardLinks {
  installLink: string | null
  shareLink: string | null
  directInstallLink: { universal: string; apple: string; google: string; pwa: string } | null
  qrLink: string | null
}

type State = 'idle' | 'submitting' | 'success' | 'error'

const inputClass =
  'w-full px-4 py-3 bg-white border border-ink/20 text-ink placeholder-ink/40 text-sm tracking-wide focus:outline-none focus:border-amber focus:bg-white transition-colors'

const labelClass = 'block text-xs font-medium tracking-[0.2em] uppercase text-ink/60 mb-2'

// value MUST be a valid backend slug, label is English
const nicheOptions: NicheOption[] = [
  { slug: 'cafes', label: 'Café' },
  { slug: 'baeckerei', label: 'Bakery' },
  { slug: 'restaurant', label: 'Restaurant' },
  { slug: 'doener', label: 'Kebab shop' },
  { slug: 'pizza', label: 'Pizzeria' },
  { slug: 'eiscafe', label: 'Ice cream shop' },
  { slug: 'friseur', label: 'Hair salon' },
  { slug: 'fitnessstudio', label: 'Gym' },
  { slug: 'yoga', label: 'Yoga studio' },
  { slug: 'blumenladen', label: 'Florist' },
]

export default function LeadFormEn({ whatsappUrl }: Props) {
  const [state, setState] = useState<State>('idle')
  const [card, setCard] = useState<CardLinks | null>(null)
  const [vorname, setVorname] = useState('')
  const [telefon, setTelefon] = useState('')
  const [instagram, setInstagram] = useState('')
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isMobile, setIsMobile] = useState(true)
  const [selectedNiche, setSelectedNiche] = useState('')
  const formStartedRef = useRef(false)

  useEffect(() => {
    setIsMobile(/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent))
  }, [])

  function handleInstagramChange(e: ChangeEvent<HTMLInputElement>) {
    setInstagram(e.target.value.replace(/^@+/, ''))
  }

  function getUtmParams(): Record<string, string> {
    const params = new URLSearchParams(window.location.search)
    const path = window.location.pathname.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'homepage'
    const utm: Record<string, string> = {
      utm_source: params.get('utm_source') || 'bonuskarte.digital',
      utm_medium: params.get('utm_medium') || 'landing-page',
      utm_campaign: params.get('utm_campaign') || path,
    }
    if (params.get('utm_content')) utm.utm_content = params.get('utm_content')!
    if (params.get('utm_term')) utm.utm_term = params.get('utm_term')!
    if (params.get('fbclid')) utm.fbclid = params.get('fbclid')!
    return utm
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setVorname((data.vorname as string) ?? '')
    setTelefon((data.telefon as string) ?? '')
    const cleanInstagram = String(data.instagram ?? '').replace(/^@+/, '')

    try {
      const res = await fetch('/api/submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vorname:   data.vorname,
          instagram: cleanInstagram,
          telefon:   data.telefon,
          email:     (data.email as string) ?? '',
          niche:     selectedNiche.toLowerCase(),
          city:      'international',
          mode:      'standard',
          source:    'standard',
          booking_type: '',
          utm:       getUtmParams(),
        }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        setCard({
          installLink: json.installLink,
          shareLink: json.shareLink,
          directInstallLink: json.directInstallLink,
          qrLink: json.qrLink ?? null,
        })
        setState('success')
        form.reset()
        setInstagram('')
        setEmail('')
      } else {
        setErrorMsg('Something went wrong. Please try again.')
        setState('error')
      }
    } catch {
      setErrorMsg('No connection. Please check your internet and retry.')
      setState('error')
    }
  }

  function handleFirstFocus() {
    if (!formStartedRef.current) {
      formStartedRef.current = true
    }
  }

  if (state === 'success') {
    const universalLink = card?.directInstallLink?.universal ?? card?.installLink ?? null
    const appleLink     = card?.directInstallLink?.apple     ?? universalLink
    const googleLink    = card?.directInstallLink?.google    ?? universalLink

    const waPhone = (() => {
      const digits = telefon.replace(/\D/g, '')
      return digits.startsWith('0') ? '49' + digits.slice(1) : digits
    })()
    const waText = universalLink
      ? encodeURIComponent(`Here is your demo card 👉 ${universalLink}`)
      : null
    const waSelfLink = waPhone && waText ? `https://wa.me/${waPhone}?text=${waText}` : null

    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 border border-amber/40 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className="text-xl font-semibold tracking-wide text-ink mb-3">
          {vorname ? `Your demo card is ready, ${vorname}!` : 'Your demo card is ready'}
        </h3>

        {/* Mobile: install buttons */}
        {isMobile && universalLink && (
          <>
            <p className="text-ink text-sm leading-relaxed max-w-sm mx-auto mb-8">
              Add it to your Wallet now — no download, no app required.
            </p>
            <div className="space-y-3 mb-8">
              <a
                href={universalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group flex items-center justify-center gap-3 bg-amber hover:bg-amber-dark text-black font-bold tracking-[0.15em] uppercase text-sm py-4 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                </svg>
                Add demo card to Wallet
              </a>
              <div className="flex gap-3">
                {appleLink && (
                  <a href={appleLink} target="_blank" rel="noopener noreferrer"
                    className="flex-1 text-center border border-ink/10 hover:border-amber/50 text-ink/40 hover:text-ink/70 text-xs tracking-widest uppercase py-3 transition-all">
                    Apple Wallet
                  </a>
                )}
                {googleLink && (
                  <a href={googleLink} target="_blank" rel="noopener noreferrer"
                    className="flex-1 text-center border border-ink/10 hover:border-amber/50 text-ink/40 hover:text-ink/70 text-xs tracking-widest uppercase py-3 transition-all">
                    Google Wallet
                  </a>
                )}
              </div>
            </div>
          </>
        )}

        {/* Desktop: QR code + WhatsApp self-send */}
        {!isMobile && (
          <>
            <p className="text-ink text-sm leading-relaxed max-w-sm mx-auto mb-6">
              Scan the QR code with your phone — the card lands straight in your Wallet.
            </p>
            <div className="flex flex-col items-center gap-4 mb-8">
              {card?.qrLink && (
                <img
                  src={card.qrLink}
                  alt="QR code for your demo card"
                  width={180}
                  height={180}
                  className="border border-ink/10 p-2 bg-white"
                />
              )}
              {waSelfLink && (
                <a
                  href={waSelfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-ink/20 hover:border-[#25D366]/60 text-ink/60 hover:text-ink text-xs tracking-widest uppercase px-6 py-3 transition-all"
                >
                  <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Send the link to my phone
                </a>
              )}
            </div>
          </>
        )}

        <div className="border-t border-ink/30 pt-7">
          <p className="text-ink text-sm font-medium mb-2">What happens next:</p>
          <ol className="text-ink/70 text-sm space-y-1 mb-4 list-decimal list-inside">
            <li>Add the demo card to your Wallet</li>
            <li>You get a WhatsApp message from us today</li>
            <li>We set up your card with your branding</li>
          </ol>
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-ink font-bold tracking-[0.1em] uppercase text-xs px-8 py-4 transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Message me on WhatsApp
            </a>
          )}
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-xs tracking-[0.2em] uppercase text-ink/55 mb-1">3 required fields · Email optional · 30 seconds</p>

      <div>
        <label htmlFor="niche-select" className={labelClass}>Industry *</label>
        <select
          id="niche-select"
          name="niche-select"
          required
          value={selectedNiche}
          onChange={(e) => setSelectedNiche(e.target.value)}
          className={inputClass}
        >
          <option value="" disabled className="bg-white text-ink">Choose your industry</option>
          {nicheOptions.map((n) => (
            <option key={n.slug} value={n.slug} className="bg-white text-ink">
              {n.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="vorname" className={labelClass}>First name *</label>
        <input id="vorname" name="vorname" type="text" required placeholder="Alex" autoComplete="given-name" onFocus={handleFirstFocus} className={inputClass} />
      </div>

      <div>
        <label htmlFor="telefon" className={labelClass}>Phone *</label>
        <input id="telefon" name="telefon" type="tel" required placeholder="+49 170 …" autoComplete="tel" inputMode="tel" className={inputClass} />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email <span className="text-ink/30 font-normal normal-case tracking-normal">(optional)</span></label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="alex@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
          inputMode="email"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="instagram" className={labelClass}>Instagram or business name <span className="text-ink/30 font-normal normal-case tracking-normal">(optional)</span></label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber text-sm font-medium select-none">@</span>
          <input
            id="instagram"
            name="instagram"
            type="text"
            placeholder="your_shop (optional)"
            value={instagram}
            onChange={handleInstagramChange}
            autoComplete="off"
            autoCapitalize="none"
            className={`${inputClass} pl-8`}
          />
        </div>
        <p className="mt-2 text-xs tracking-wide text-ink/55">
          We use this to build your demo card with your branding.
        </p>
      </div>

      {state === 'error' && (
        <p className="text-sm text-red-400 border border-red-400/30 px-4 py-3">
          {errorMsg || 'Something went wrong. Please try again.'}
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
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            Creating card…
          </>
        ) : (
          <>
            Create demo card
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </>
        )}
      </button>

      <p className="text-xs tracking-widest uppercase text-center text-ink">
        No risk · No credit card · 90 days free
      </p>
    </form>
  )
}
