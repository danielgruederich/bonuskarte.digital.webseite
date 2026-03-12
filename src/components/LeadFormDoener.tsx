import { useState, type FormEvent } from 'react'

interface Props {
  formspreeId: string
  whatsappUrl: string
}

type State = 'idle' | 'submitting' | 'success' | 'error'

const inputClass =
  'w-full px-4 py-4 bg-white/5 border border-white/20 text-white placeholder-white/40 text-base focus:outline-none focus:border-gold-600 focus:bg-white/8 transition-colors rounded-none'

export default function LeadFormDoener({ formspreeId, whatsappUrl }: Props) {
  const [state, setState] = useState<State>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    const form = e.currentTarget
    const data = new FormData(form)
    data.append('_subject', 'Neue Anfrage – Döner Köln')
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
      <div className="text-center py-10">
        <div className="text-5xl mb-6">🤝</div>
        <h3 className="text-2xl font-bold text-white mb-4">
          Danke, Chef!
        </h3>
        <p className="text-white/50 text-base leading-relaxed max-w-sm mx-auto mb-8">
          Wir melden uns in Kürze per WhatsApp bei Dir.
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
          Direkt per WhatsApp melden
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          name="ladenname"
          type="text"
          required
          placeholder="Ladenname (z.B. Ehrenfeld Grill)"
          className={inputClass}
        />
      </div>

      <div>
        <input
          name="kontakt"
          type="text"
          required
          placeholder="Handy oder E-Mail (für WhatsApp oder Infos)"
          className={inputClass}
        />
      </div>

      <div>
        <input
          name="instagram"
          type="text"
          placeholder="Instagram (optional) – @deinladen"
          className={inputClass}
        />
      </div>

      {state === 'error' && (
        <p className="text-sm text-red-400 border border-red-400/30 px-4 py-3">
          Etwas ist schiefgelaufen. Versuch es nochmal.
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="w-full group flex items-center justify-center gap-3 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-black font-black tracking-[0.1em] uppercase text-base py-5 transition-all"
      >
        {state === 'submitting' ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            Wird gesendet…
          </>
        ) : (
          'Kostenlos starten →'
        )}
      </button>

      <p className="text-xs text-center text-white/25 tracking-wide">
        Kein Vertrag. Keine Kreditkarte nötig.
      </p>
    </form>
  )
}
