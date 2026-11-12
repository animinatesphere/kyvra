import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TrendingUp, Inbox, FolderKanban, Users, ArrowUpRight, Wallet } from 'lucide-react'
import { useStore } from '../store/Store'
import { Badge, PageHeader, Progress } from './ui'

const fade = (i) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.06 } })

function RevenueChart({ data, cur }) {
  const max = Math.max(...data.map((d) => d.value)) || 1
  return (
    <div className="flex h-56 items-end gap-3">
      {data.map((d, i) => (
        <div key={d.month} className="group flex h-full flex-1 flex-col items-center gap-2">
          <span className="text-xs text-white/0 transition-colors group-hover:text-white/70">{cur}{(d.value / 1000).toFixed(1)}k</span>
          <div className="flex w-full flex-1 items-end"><motion.div initial={{ height: 0 }} animate={{ height: `${(d.value / max) * 100}%` }} transition={{ delay: 0.2 + i * 0.08, type: 'spring', damping: 20 }}
            className={`w-full rounded-t-lg ${i === data.length - 1 ? 'bg-lime' : 'bg-white/15 group-hover:bg-white/25'}`} style={{ minHeight: 4 }} /></div>
          <span className="text-xs text-white/40">{d.month}</span>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const { db } = useStore()
  const cur = db.settings.currency
  const paid = db.invoices.filter((i) => i.status === 'Paid').reduce((a, i) => a + Number(i.amount), 0)
  const outstanding = db.invoices.filter((i) => i.status !== 'Paid' && i.status !== 'Draft').reduce((a, i) => a + Number(i.amount), 0)
  const active = db.projects.filter((p) => p.status !== 'Completed')
  const newLeads = db.leads.filter((l) => l.status === 'New')
  const won = db.leads.filter((l) => l.status === 'Won').length
  const conv = db.leads.length ? Math.round((won / db.leads.length) * 100) : 0

  const kpis = [
    { l: 'Revenue collected', v: `${cur}${paid.toLocaleString()}`, s: `${cur}${outstanding.toLocaleString()} outstanding`, i: Wallet, to: '/admin/invoices' },
    { l: 'Active projects', v: active.length, s: `${db.projects.length} total`, i: FolderKanban, to: '/admin/projects' },
    { l: 'New leads', v: newLeads.length, s: `${conv}% conversion rate`, i: Inbox, to: '/admin/leads' },
    { l: 'Active clients', v: db.clients.filter((c) => c.status === 'Active').length, s: `${db.clients.length} in CRM`, i: Users, to: '/admin/clients' },
  ]

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Here's what's happening at the studio today.">
        <Link to="/admin/projects" className="btn-lime py-2">New project</Link>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k, i) => (
          <motion.div key={k.l} {...fade(i)}>
            <Link to={k.to} className="card group block transition-colors hover:border-lime/40">
              <div className="flex items-center justify-between"><p className="text-sm text-white/50">{k.l}</p><k.i size={18} className="text-lime" /></div>
              <p className="mt-3 text-3xl font-bold">{k.v}</p>
              <p className="mt-1 text-xs text-white/40">{k.s}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <motion.div {...fade(4)} className="card xl:col-span-2">
          <div className="mb-6 flex items-center justify-between"><div><p className="font-semibold">Revenue</p><p className="text-xs text-white/40">Last 6 months</p></div>
            <span className="badge bg-lime/15 text-lime"><TrendingUp size={12} className="mr-1" /> +18%</span></div>
          <RevenueChart data={db.revenue} cur={cur} />
        </motion.div>

        <motion.div {...fade(5)} className="card">
          <div className="mb-4 flex items-center justify-between"><p className="font-semibold">Lead pipeline</p><Link to="/admin/leads" className="text-xs text-lime">Open</Link></div>
          {['New', 'Contacted', 'Proposal', 'Won', 'Lost'].map((s) => {
            const n = db.leads.filter((l) => l.status === s).length
            return (
              <div key={s} className="mb-3">
                <div className="mb-1 flex justify-between text-sm"><span className="text-white/70">{s}</span><span>{n}</span></div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div initial={{ width: 0 }} animate={{ width: `${db.leads.length ? (n / db.leads.length) * 100 : 0}%` }} className="h-full bg-lime" /></div>
              </div>
            )
          })}
        </motion.div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <motion.div {...fade(6)} className="card">
          <div className="mb-4 flex items-center justify-between"><p className="font-semibold">Active projects</p><Link to="/admin/projects" className="text-xs text-lime">View all</Link></div>
          <div className="space-y-3">
            {active.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-4 rounded-xl bg-white/[0.03] p-3">
                <div className="min-w-0"><p className="truncate text-sm font-medium">{p.name}</p><p className="text-xs text-white/40">{p.client} · due {p.deadline}</p></div>
                <div className="flex shrink-0 items-center gap-3"><Badge value={p.status} /><Progress value={p.progress} /></div>
              </div>
            ))}
            {!active.length && <p className="text-sm text-white/40">No active projects.</p>}
          </div>
        </motion.div>

        <motion.div {...fade(7)} className="card">
          <div className="mb-4 flex items-center justify-between"><p className="font-semibold">Latest enquiries</p><Link to="/admin/leads" className="text-xs text-lime">View all</Link></div>
          <div className="space-y-3">
            {db.leads.slice(0, 5).map((l) => (
              <div key={l.id} className="flex items-center justify-between gap-4 rounded-xl bg-white/[0.03] p-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-semibold">{l.name[0]}</div>
                  <div className="min-w-0"><p className="truncate text-sm font-medium">{l.name} <span className="text-white/40">· {l.company}</span></p><p className="truncate text-xs text-white/40">{l.service} · {l.budget}</p></div>
                </div>
                <Badge value={l.status} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div {...fade(8)} className="mt-4 grid gap-4 md:grid-cols-3">
        {[['Edit homepage text', '/admin/settings'], ['Add a case study', '/admin/portfolio'], ['Write a blog post', '/admin/posts']].map(([t, to]) => (
          <Link key={t} to={to} className="card group flex items-center justify-between hover:border-lime/40"><span className="text-sm">{t}</span><ArrowUpRight size={16} className="text-lime transition-transform group-hover:rotate-45" /></Link>
        ))}
      </motion.div>
    </div>
  )
}
