// Wysyłka formularzy. Backend (Supabase) podłączymy później: wystarczy ustawić
// VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY oraz założyć tabele `help_requests`, `partner_requests` i `newsletter_subscribers`
// z polityką „tylko insert” dla roli anon. Bez tych zmiennych formularz działa w trybie testowym
// i NIC nie wysyła — strona mówi o tym użytkownikowi wprost.
const URL = import.meta.env.VITE_SUPABASE_URL as string | undefined
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export type FormKind = 'help_requests' | 'partner_requests' | 'newsletter_subscribers'
export type SubmitResult = { ok: true; demo: boolean } | { ok: false }

export const formsLive = Boolean(URL && KEY)

export async function submitForm(kind: FormKind, data: Record<string, unknown>): Promise<SubmitResult> {
  if (!URL || !KEY) {
    await new Promise((r) => setTimeout(r, 500))
    return { ok: true, demo: true }
  }
  try {
    const res = await fetch(`${URL}/rest/v1/${kind}`, {
      method: 'POST',
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify(data),
    })
    return res.ok ? { ok: true, demo: false } : { ok: false }
  } catch {
    return { ok: false }
  }
}
