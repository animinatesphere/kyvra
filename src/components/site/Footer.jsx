import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useStore } from '../../store/Store'
import { links } from './Navbar'

export default function Footer() {
  const { db } = useStore()
  const s = db.settings
  const socials = [['Instagram', s.instagram], ['X / Twitter', s.twitter], ['LinkedIn', s.linkedin], ['Dribbble', s.dribbble]].filter(([, u]) => u)

  return (
    <footer className="border-t border-white/10 bg-ink pt-20">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="eyebrow mb-4">Got a project?</p>
            <Link to="/contact" className="h-display group inline-flex items-end gap-4 text-6xl md:text-8xl">
              Let's talk <ArrowUpRight className="mb-2 h-12 w-12 transition-transform group-hover:-translate-y-2 group-hover:translate-x-2 md:h-16 md:w-16" />
            </Link>
            <p className="mt-6 text-bone/60">{s.email} · {s.phone}</p>
          </div>
          <div className="md:col-span-3">
            <p className="label">Sitemap</p>
            <ul className="space-y-2">{links.map((l) => <li key={l.to}><Link to={l.to} className="text-bone/80 hover:text-lime">{l.label}</Link></li>)}</ul>
          </div>
          <div className="md:col-span-3">
            <p className="label">Follow</p>
            <ul className="space-y-2">{socials.map(([n, u]) => <li key={n}><a href={u} target="_blank" rel="noreferrer" className="text-bone/80 hover:text-lime">{n}</a></li>)}</ul>
            <p className="label mt-6">Studio</p>
            <p className="text-bone/80">{s.address}</p>
          </div>
        </div>
        <div className="h-display mt-20 select-none overflow-hidden whitespace-nowrap text-[18vw] leading-none text-white/[0.04]">{s.agencyName}</div>
        <div className="flex flex-col justify-between gap-3 border-t border-white/10 py-6 text-xs text-bone/50 md:flex-row">
          <p>© {new Date().getFullYear()} {s.agencyName}. All rights reserved.</p>
          <div className="flex gap-6"><a href="#" className="hover:text-bone">Privacy policy</a><Link to="/admin" className="hover:text-bone">Admin</Link></div>
        </div>
      </div>
    </footer>
  )
}
