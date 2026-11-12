import { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, ArrowLeft } from 'lucide-react'
import { useStore, DEMO_ADMIN } from '../store/Store'

export default function Login() {
  const { login, authed, db } = useStore()
  const navigate = useNavigate()
  const [email, setEmail] = useState(DEMO_ADMIN.email)
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  if (authed) return <Navigate to="/admin" replace />

  const submit = (e) => { e.preventDefault(); login(email, password) ? navigate('/admin') : setErr('Wrong email or password') }

  return (
    <div className="grid min-h-screen bg-ink text-bone lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-lime p-12 text-ink lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold"><ArrowLeft size={16} /> Back to website</Link>
        <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="h-display text-8xl">Run the<br />whole studio<br />from here.</motion.h1>
        <p className="text-sm text-ink/60">{db.settings.agencyName} · Admin</p>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="absolute -right-32 top-1/3 h-96 w-96 rounded-full border-[4rem] border-ink/10" />
      </div>
      <div className="grid place-items-center p-6">
        <motion.form onSubmit={submit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="mb-8 grid h-12 w-12 place-items-center rounded-xl bg-lime text-ink"><Lock size={22} /></div>
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="mb-8 mt-1 text-sm text-white/50">Sign in to manage your agency.</p>
          <label className="label">Email</label>
          <input className="input mb-4" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="label">Password</label>
          <input className="input mb-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          {err && <motion.p initial={{ x: -8 }} animate={{ x: [8, -6, 4, 0] }} className="mb-2 text-sm text-red-300">{err}</motion.p>}
          <button className="btn-lime mt-4 w-full justify-center py-3">Sign in</button>
          <p className="mt-6 rounded-xl border border-white/10 p-3 text-xs text-white/50">Demo login: <b className="text-white">{DEMO_ADMIN.email}</b> / <b className="text-white">{DEMO_ADMIN.password}</b></p>
        </motion.form>
      </div>
    </div>
  )
}
