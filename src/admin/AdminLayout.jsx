import { useState } from 'react'
import { NavLink, Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LayoutDashboard, Inbox, FolderKanban, Users, Briefcase, Layers, UserSquare2, MessageSquareQuote, FileText, Receipt, Settings, LogOut, ExternalLink, Menu, X, Megaphone } from 'lucide-react'
import { useStore } from '../store/Store'

const nav = [
  { group: 'Overview', items: [{ to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true }] },
  { group: 'Sales', items: [
    { to: '/admin/leads', label: 'Leads', icon: Inbox, badge: 'leads' },
    { to: '/admin/clients', label: 'Clients', icon: Users },
    { to: '/admin/invoices', label: 'Invoices', icon: Receipt },
  ] },
  { group: 'Delivery', items: [{ to: '/admin/projects', label: 'Projects', icon: FolderKanban }] },
  { group: 'Website', items: [
    { to: '/admin/portfolio', label: 'Portfolio', icon: Briefcase },
    { to: '/admin/services', label: 'Services', icon: Layers },
    { to: '/admin/team', label: 'Team', icon: UserSquare2 },
    { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { to: '/admin/posts', label: 'Blog', icon: FileText },
    { to: '/admin/jobs', label: 'Careers', icon: Megaphone },
  ] },
  { group: 'System', items: [{ to: '/admin/settings', label: 'Settings', icon: Settings }] },
]

function Sidebar({ onNav }) {
  const { db, logout } = useStore()
  const navigate = useNavigate()
  const newLeads = db.leads.filter((l) => l.status === 'New').length
  return (
    <div className="flex h-full flex-col">
      <Link to="/admin" className="mb-8 flex items-center gap-2 px-2">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-lime font-display text-xl text-ink">K</span>
        <div><p className="font-display text-lg uppercase leading-none">{db.settings.agencyName}</p><p className="text-[10px] uppercase tracking-widest text-white/40">Admin</p></div>
      </Link>
      <nav className="flex-1 space-y-6 overflow-y-auto">
        {nav.map((g) => (
          <div key={g.group}>
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">{g.group}</p>
            {g.items.map(({ to, label, icon: I, end, badge }) => (
              <NavLink key={to} to={to} end={end} onClick={onNav} className="relative mb-0.5 flex items-center gap-3 rounded-xl px-3 py-2 text-sm">
                {({ isActive }) => (
                  <>
                    {isActive && <motion.span layoutId="adm-active" className="absolute inset-0 rounded-xl bg-white/[0.07]" transition={{ type: 'spring', stiffness: 400, damping: 35 }} />}
                    <I size={17} className={`relative ${isActive ? 'text-lime' : 'text-white/50'}`} />
                    <span className={`relative flex-1 ${isActive ? 'text-white' : 'text-white/70'}`}>{label}</span>
                    {badge && newLeads > 0 && <span className="relative rounded-full bg-lime px-2 text-[10px] font-bold text-ink">{newLeads}</span>}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <div className="mt-6 space-y-1 border-t border-white/10 pt-4">
        <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/70 hover:bg-white/5"><ExternalLink size={17} /> View website</a>
        <button onClick={() => { logout(); navigate('/admin/login') }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/70 hover:bg-red-500/10 hover:text-red-300"><LogOut size={17} /> Log out</button>
      </div>
    </div>
  )
}

export default function AdminLayout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen bg-ink text-bone">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-white/10 bg-coal p-4 lg:block"><Sidebar /></aside>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-black/60 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside className="fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-coal p-4 lg:hidden" initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}>
              <button onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-lg p-1 hover:bg-white/10"><X size={18} /></button>
              <Sidebar onNav={() => setOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-ink/80 px-4 backdrop-blur md:px-8">
          <button onClick={() => setOpen(true)} className="rounded-lg p-2 hover:bg-white/10 lg:hidden"><Menu size={20} /></button>
          <p className="hidden text-sm text-white/40 lg:block">{new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <div className="flex items-center gap-3"><div className="text-right text-sm"><p className="font-medium">Admin</p><p className="text-xs text-white/40">Owner</p></div><div className="grid h-9 w-9 place-items-center rounded-full bg-lime font-bold text-ink">A</div></div>
        </header>
        <motion.main key={pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="p-4 md:p-8">
          <Outlet />
        </motion.main>
      </div>
    </div>
  )
}
