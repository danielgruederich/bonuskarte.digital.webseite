import { useState, type FormEvent, type ChangeEvent, useRef } from 'react'
import { analytics } from '../lib/analytics'

interface Props {
  niche: string  // display label, e.g. "Boulangerie"
  arr: string    // arrondissement name, e.g. "Paris 11e"
}

type State = 'idle' | 'submitting' | 'success' | 'error'

const WA_NUMBER = '491705594140'

const inputClass =
  'w-full px-4 py-3 bg-white border border-ink/20 text-ink placeholder-ink/40 text-sm tracking-wide focus:outline-none focus:border-amber focus:bg-white transition-colors'

const labelClass = 'block text-xs font-medium tracking-[0.2em] uppercase text-ink/60 mb-2'

function buildWaText(prenom: string, phone: string, niche: string, arr: string): string {
  const name = prenom.trim() || 'Bonjour'
  return encodeURIComponent(
    `${name} souhaite tester la carte de fidélité numérique pour son ${niche} à ${arr} (${phone}). Merci de me recontacter !`
  )
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
  if (params.get('utm_term'))    utm.utm_term    = params.get('utm_term')!
  if (params.get('fbclid'))      utm.fbclid      = params.get('fbclid')!
  return utm
}

export default function LeadFormFr({ niche, arr }: Props) {
  const [state, setState]         = useState<State>('idle')
  const [prenom, setPrenom]       = useState('')
  const [phone, setPhone]         = useState('')
  const [instagram, setInstagram] = useState('')
  const [errorMsg, setErrorMsg]   = useState('')
  const formStartedRef            = useRef(false)

  function handleInstagramChange(e: ChangeEvent<HTMLInputElement>) {
    setInstagram(e.target.value.replace(/^@+/, ''))
  }

  function handleFirstFocus() {
    if (!formStartedRef.current) {
      formStartedRef.current = true
      analytics.signupFormStart(niche, arr, 'fr_paris')
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    const cleanInstagram = String(data.instagram ?? '').replace(/^@+/, '')
    const currentPrenom = String(data.prenom ?? '')
    const currentPhone  = String(data.phone  ?? '')
    setPrenom(currentPrenom)
    setPhone(currentPhone)
    analytics.signupSubmitAttempt(niche, arr, 'fr_paris')

    try {
      const res = await fetch('/api/submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vorname:   currentPrenom,
          telefon:   currentPhone,
          instagram: cleanInstagram,
          niche:     niche,
          lang:      'fr',
          mode:      'lead',
          arr:       arr,
          utm:       getUtmParams(),
        }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        analytics.signupSubmit(niche, arr, 'fr_paris')
        setState('success')
        form.reset()
        setInstagram('')
      } else {
        analytics.signupSubmitError(niche, arr, 'api_error', 'fr_paris')
        setErrorMsg('Une erreur est survenue. Veuillez réessayer.')
        setState('error')
      }
    } catch {
      analytics.signupSubmitError(niche, arr, 'network_error', 'fr_paris')
      setErrorMsg('Pas de connexion. Veuillez vérifier votre connexion internet.')
      setState('error')
    }
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (state === 'success') {
    const waText = buildWaText(prenom, phone, niche, arr)
    const waHref = `https://wa.me/${WA_NUMBER}?text=${waText}`
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 border border-amber/40 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold tracking-wide text-ink mb-3">
          {prenom ? `Merci, ${prenom} !` : 'Merci !'}
        </h3>
        <p className="text-ink/70 text-sm leading-relaxed max-w-sm mx-auto mb-8">
          Nous vous recontactons rapidement pour lancer votre carte de fidélité.
        </p>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => analytics.whatsappClicked('success')}
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-ink font-bold tracking-wide text-sm px-8 py-4 transition-all"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Nous écrire sur WhatsApp
        </a>
      </div>
    )
  }

  // ── Idle / error state ─────────────────────────────────────────────────────
  const waText = buildWaText(prenom || 'Bonjour', phone, niche, arr)
  const waHref = `https://wa.me/${WA_NUMBER}?text=${waText}`

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-xs tracking-[0.2em] uppercase text-ink/55 mb-1">2 champs requis · 30 secondes</p>

      {/* Prénom */}
      <div>
        <label className={labelClass}>Prénom *</label>
        <input
          name="prenom"
          type="text"
          required
          placeholder="Marie"
          autoComplete="given-name"
          onFocus={handleFirstFocus}
          className={inputClass}
        />
      </div>

      {/* Téléphone */}
      <div>
        <label className={labelClass}>Téléphone *</label>
        <input
          name="phone"
          type="tel"
          required
          placeholder="+33 6 …"
          autoComplete="tel"
          inputMode="tel"
          className={inputClass}
        />
      </div>

      {/* Instagram (optional) */}
      <div>
        <label className={labelClass}>Instagram ou nom de l'établissement</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber text-sm font-medium select-none">@</span>
          <input
            name="instagram"
            type="text"
            placeholder="votre_enseigne (optionnel)"
            value={instagram}
            onChange={handleInstagramChange}
            autoComplete="off"
            autoCapitalize="none"
            className={`${inputClass} pl-8`}
          />
        </div>
        <p className="mt-2 text-xs tracking-wide text-ink/55">
          Pour personnaliser votre carte avec votre branding.
        </p>
      </div>

      {state === 'error' && (
        <p className="text-sm text-red-400 border border-red-400/30 px-4 py-3">
          {errorMsg || 'Une erreur est survenue. Veuillez réessayer.'}
        </p>
      )}

      {/* Submit */}
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
            Envoi en cours…
          </>
        ) : (
          <>
            Tester 90 jours gratuitement
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </>
        )}
      </button>

      {/* WhatsApp alternative */}
      <div className="flex items-center gap-3 my-4">
        <div className="h-px flex-1 bg-ink/10"></div>
        <span className="text-ink/30 text-xs tracking-widest uppercase">ou</span>
        <div className="h-px flex-1 bg-ink/10"></div>
      </div>

      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => analytics.whatsappClicked('hero')}
        className="w-full group flex items-center justify-center gap-3 border border-[#25D366]/30 hover:border-[#25D366]/60 text-ink/70 hover:text-ink px-6 py-3.5 text-xs font-medium tracking-[0.15em] uppercase transition-all"
      >
        <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Contacter par WhatsApp
      </a>

      <p className="text-xs tracking-widest uppercase text-center text-ink/40">
        Sans engagement · Sans carte bancaire · 90 jours offerts
      </p>
    </form>
  )
}
