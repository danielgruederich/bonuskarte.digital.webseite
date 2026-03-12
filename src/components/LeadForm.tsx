import { useState, type FormEvent } from 'react'

interface Props {
  niche: string
  city: string
  formspreeId: string
}

type State = 'idle' | 'submitting' | 'success' | 'error'

const inputClass =
  'w-full px-4 py-3 bg-black border border-white/10 text-white placeholder-white/20 text-sm tracking-wide focus:outline-none focus:border-gold-600 transition-colors'

const labelClass = 'block text-[10px] font-medium tracking-[0.2em] uppercase text-white/40 mb-2'

export default function LeadForm({ niche, city, formspreeId }: Props) {
  const [state, setState] = useState<State>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    const form = e.currentTarget
    const data = new FormData(form)
    data.append('_subject', `Neue Anfrage – ${niche} in ${city}`)
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      setState(res.ok ? 'success' : 'error')
      if (res.ok) form.reset()
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 border border-gold-600/40 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold tracking-wide text-white mb-3">Danke – wir melden uns.</h3>
        <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto">
          Wir erstellen deine Demo-Stempelkarte und melden uns innerhalb von 24 Stunden.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="branche" value={niche} />
      <input type="hidden" name="stadt" value={city} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Vorname *</label>
          <input name="vorname" type="text" required placeholder="Max" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Nachname *</label>
          <input name="nachname" type="text" required placeholder="Mustermann" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Name deines {niche}s *</label>
        <input name="business" type="text" required placeholder="z.B. Café Sonnenblume" className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Instagram-Handle *</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-600 text-sm font-medium select-none">@</span>
          <input name="instagram" type="text" required placeholder="dein_cafe_koeln"
            className={`${inputClass} pl-8`} />
        </div>
        <p className="mt-2 text-[10px] tracking-wide text-white/20">
          Wir nutzen dein Profil für Logo und Farben der Demo-Karte.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>E-Mail *</label>
          <input name="email" type="email" required placeholder="max@cafe.de" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Telefon</label>
          <input name="telefon" type="tel" placeholder="+49 221 …" className={inputClass} />
        </div>
      </div>

      {state === 'error' && (
        <p className="text-sm text-red-400 border border-red-400/30 px-4 py-3">
          Etwas ist schiefgelaufen. Bitte versuche es erneut.
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
            Wird gesendet…
          </>
        ) : (
          <>
            Kostenlose Demo anfordern
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </>
        )}
      </button>

      <p className="text-[10px] tracking-widest uppercase text-center text-white/20">
        Kein Risiko · Keine Kreditkarte · 90 Tage kostenlos
      </p>
    </form>
  )
}
