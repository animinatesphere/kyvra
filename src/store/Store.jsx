import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { seed, uid } from './seed'

const KEY = 'kyvra-store-v1'
const AUTH_KEY = 'kyvra-admin-auth'
const StoreCtx = createContext(null)

// Demo login — replace with a real backend (Supabase, Firebase, Node API) before going live.
export const DEMO_ADMIN = { email: 'admin@kyvra.studio', password: 'admin123' }

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...seed, ...JSON.parse(raw) } : seed
  } catch {
    return seed
  }
}

export function StoreProvider({ children }) {
  const [db, setDb] = useState(load)
  const [authed, setAuthed] = useState(() => {
    try { return localStorage.getItem(AUTH_KEY) === '1' } catch { return false }
  })

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(db)) } catch { /* storage unavailable */ }
  }, [db])

  const api = useMemo(() => ({
    db,
    authed,
    login(email, password) {
      const ok = email.trim().toLowerCase() === DEMO_ADMIN.email && password === DEMO_ADMIN.password
      if (ok) { setAuthed(true); try { localStorage.setItem(AUTH_KEY, '1') } catch {} }
      return ok
    },
    logout() { setAuthed(false); try { localStorage.removeItem(AUTH_KEY) } catch {} },
    add(col, item) { const rec = { ...item, id: uid() }; setDb((d) => ({ ...d, [col]: [rec, ...d[col]] })); return rec },
    update(col, id, patch) { setDb((d) => ({ ...d, [col]: d[col].map((x) => (x.id === id ? { ...x, ...patch } : x)) })) },
    remove(col, id) { setDb((d) => ({ ...d, [col]: d[col].filter((x) => x.id !== id) })) },
    saveSettings(patch) { setDb((d) => ({ ...d, settings: { ...d.settings, ...patch } })) },
    reset() { setDb(seed) },
  }), [db, authed])

  return <StoreCtx.Provider value={api}>{children}</StoreCtx.Provider>
}

export const useStore = () => useContext(StoreCtx)
