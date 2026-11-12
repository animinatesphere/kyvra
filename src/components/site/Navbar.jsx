import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useStore } from '../../store/Store'

export const links = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'What we do' },
  { to: '/about', label: 'About us' },
  { to: '/blog', label: 'Journal' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { db } = useStore()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 200 && !open)
    setScrolled(y > 30)
  })

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-110%' : 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled ? 'bg-ink/80 backdrop-blur-md' : ''}`}
      >
        <div className="container-x flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-lime font-display text-xl text-ink">K</span>
            <span className="font-display text-2xl uppercase tracking-wide">{db.settings.agencyName}</span>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end className="group relative text-sm font-medium uppercase tracking-wider">
                {({ isActive }) => (
                  <>
                    <span className={isActive ? 'text-lime' : 'text-bone/80 group-hover:text-bone'}>{l.label}</span>
                    {isActive && <motion.span layoutId="nav-dot" className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-lime" />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/contact" className="btn-lime hidden md:inline-flex">Start a project <ArrowUpRight size={16} /></Link>
            <button onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full border border-white/20 lg:hidden" aria-label="Menu">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-lime px-8 text-ink"
          >
            {links.map((l, i) => (
              <motion.div key={l.to} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.06 }}>
                <Link to={l.to} className="h-display block py-1 text-6xl sm:text-7xl">{l.label}</Link>
              </motion.div>
            ))}
            <p className="mt-10 text-sm font-semibold">{db.settings.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
