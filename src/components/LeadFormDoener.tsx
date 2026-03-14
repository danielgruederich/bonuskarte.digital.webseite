import { useState, type FormEvent, type ChangeEvent } from 'react'

interface Props {
  formspreeId?: string
  whatsappUrl: string
  niche?: string
}

interface CardLinks {
  installLink: string | null
  directInstallLink: { universal: string; apple: string; google: string } | null
}

type State = 'idle' | 'submitting' | 'success' | 'error'

const inputClass =
  'w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 text-sm tracking-wide focus:outline-none focus:border-gold-600 focus:bg-white/8 transition-colors'

const labelClass = 'block text-[10px] font-medium tracking-[0.2em] uppercase text-white/60 mb-2'

export default function LeadFormDoener({ whatsappUrl, niche = 'doener' }: Props) {
  const [state, setState] = useState<State>('idle')
  const [card, setCard] = useState<CardLinks | null>(null)
  const [vorname, setVorname] = useState('')
  const [instagram, setInstagram] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  function handleInstagramChange(e: ChangeEvent<HTMLInputElement>) {
    setInstagram(e.target.value.replace(/^@+/, ''))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setVorname((data.vorname as string) ?? '')
    const cleanInstagram = String(data.instagram ?? '').replace(/^@+/, '')

    try {
      const res = await fetch('/api/submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vorname:   data.vorname,
          instagram: cleanInstagram,
          telefon:   data.telefon,
          niche:     niche,
        }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        setCard({
          installLink: json.installLink,
          directInstallLink: json.directInstallLink,
        })
        setState('success')
        form.reset()
        setInstagram('')
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
    const universalLink = card?.directInstallLink?.universal ?? card?.installLink ?? null
    const appleLink     = card?.directInstallLink?.apple     ?? universalLink
    const googleLink    = card?.directInstallLink?.google    ?? universalLink

    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 border border-gold-600/40 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className="text-xl font-semibold tracking-wide text-white mb-3">
          {vorname ? `Deine Demo-Karte ist fertig, ${vorname}!` : 'Deine Demo-Karte ist fertig!'}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed max-w-sm mx-auto mb-8">
          Lade sie jetzt ins Wallet — kein Download, keine App nötig.
        </p>

        {universalLink && (
          <div className="space-y-3 mb-8">
            <a
              href={universalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full group flex items-center justify-center gap-3 bg-gold-600 hover:bg-gold-500 text-black font-black tracking-[0.1em] uppercase text-base py-5 transition-all"
            >
              Demo-Karte ins Wallet laden →
            </a>
            <div className="flex gap-3">
              {appleLink && (
                <a href={appleLink} target="_blank" rel="noopener noreferrer"
                  className="flex-1 text-center border border-white/10 hover:border-gold-600/30 text-white/40 hover:text-white/70 text-xs tracking-widest uppercase py-3 transition-all">
                  Apple Wallet
                </a>
              )}
              {googleLink && (
                <a href={googleLink} target="_blank" rel="noopener noreferrer"
                  className="flex-1 text-center border border-white/10 hover:border-gold-600/30 text-white/40 hover:text-white/70 text-xs tracking-widest uppercase py-3 transition-all">
                  Google Wallet
                </a>
              )}
            </div>
          </div>
        )}

        <div className="border-t border-white/5 pt-7">
          <p className="text-white/50 text-sm mb-4">
            Nächster Schritt: Ich melde mich persönlich bei dir.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold tracking-wide text-sm px-8 py-4 transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Schreib mir auf WhatsApp
          </a>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-1">3 Felder · 30 Sekunden</p>
      <div>
        <label className={labelClass}>Instagram-Kanal *</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-600 text-sm font-medium select-none">@</span>
          <input
            name="instagram"
            type="text"
            required
            placeholder="dein_laden_koeln"
            value={instagram}
            onChange={handleInstagramChange}
            autoComplete="off"
            autoCapitalize="none"
            className={`${inputClass} pl-8`}
          />
        </div>
        <p className="mt-2 text-[10px] tracking-wide text-white/30">
          Wir erstellen daraus deine persönliche Demo-Karte.
        </p>
      </div>

      <div>
        <label className={labelClass}>Dein Vorname *</label>
        <input name="vorname" type="text" required placeholder="Max" autoComplete="given-name" className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Handynummer *</label>
        <input name="telefon" type="tel" required placeholder="+49 170 …" autoComplete="tel" inputMode="tel" className={inputClass} />
      </div>

      {state === 'error' && (
        <p className="text-sm text-red-400 border border-red-400/30 px-4 py-3">
          {errorMsg || 'Etwas ist schiefgelaufen. Versuch es nochmal.'}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="w-full group flex items-center justify-center gap-3 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-black font-bold tracking-[0.15em] uppercase text-sm py-4 transition-all"
      >
        {state === 'submitting' ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            Karte wird erstellt…
          </>
        ) : (
          <>
            Demo-Karte erstellen
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </>
        )}
      </button>

      <p className="text-[10px] tracking-widest uppercase text-center text-white/50">
        Kein Risiko · Keine Kreditkarte · 90 Tage kostenlos
      </p>
    </form>
  )
}
