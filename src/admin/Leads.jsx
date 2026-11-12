import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, List, Mail, Trash2, UserPlus, ChevronRight } from 'lucide-react'
import { useStore } from '../store/Store'
import { Badge, Modal, PageHeader, toCSV, download } from './ui'

const stages = ['New', 'Contacted', 'Proposal', 'Won', 'Lost']

export default function Leads() {
  const { db, update, remove, add } = useStore()
  const [view, setView] = useState('board')
  const [open, setOpen] = useState(null)
  const [dragId, setDragId] = useState(null)

  const move = (id, status) => update('leads', id, { status })
  const toClient = (l) => {
    if (!db.clients.some((c) => c.name === (l.company || l.name))) add('clients', { name: l.company || l.name, contact: l.name, email: l.email, phone: '', status: 'Active', since: new Date().toISOString().slice(0, 10) })
    move(l.id, 'Won'); setOpen(null)
  }

  return (
    <div>
      <PageHeader title="Leads" subtitle="Enquiries from your website contact form. Drag cards between stages.">
        <div className="flex rounded-full border border-white/10 p-1">
          {[['board', LayoutGrid], ['list', List]].map(([v, I]) => (
            <button key={v} onClick={() => setView(v)} className={`relative rounded-full px-3 py-1.5 ${view === v ? 'text-ink' : 'text-white/60'}`}>
              {view === v && <motion.span layoutId="lv" className="absolute inset-0 rounded-full bg-lime" />}<I size={16} className="relative" />
            </button>
          ))}
        </div>
        <button onClick={() => download('leads.csv', toCSV(db.leads, ['name', 'email', 'company', 'service', 'budget', 'status', 'date', 'message'].map((k) => ({ key: k, label: k }))))} className="btn-ghost py-2">Export</button>
      </PageHeader>

      {view === 'board' ? (
        <div className="grid gap-4 pb-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
          {stages.map((st) => {
            const items = db.leads.filter((l) => l.status === st)
            return (
              <div key={st} onDragOver={(e) => e.preventDefault()} onDrop={() => { if (dragId) move(dragId, st); setDragId(null) }}
                className={`min-h-[18rem] rounded-2xl border p-3 transition-colors ${dragId ? 'border-dashed border-lime/40' : 'border-white/10'} bg-coal`}>
                <div className="mb-3 flex items-center justify-between px-1"><Badge value={st} /><span className="text-xs text-white/40">{items.length}</span></div>
                <div className="space-y-2">
                  <AnimatePresence>
                    {items.map((l) => (
                      <motion.div key={l.id} layout layoutId={l.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        draggable onDragStart={() => setDragId(l.id)} onDragEnd={() => setDragId(null)} onClick={() => setOpen(l)}
                        className="cursor-grab rounded-xl border border-white/5 bg-ink p-3 hover:border-white/20 active:cursor-grabbing">
                        <p className="text-sm font-medium">{l.name}</p>
                        <p className="text-xs text-white/40">{l.company}</p>
                        <div className="mt-2 flex justify-between text-xs text-white/50"><span>{l.service}</span><span>{l.budget}</span></div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-white/40"><tr>{['Name', 'Company', 'Service', 'Budget', 'Date', 'Status', ''].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr></thead>
            <tbody>{db.leads.map((l) => (
              <tr key={l.id} onClick={() => setOpen(l)} className="cursor-pointer border-t border-white/5 hover:bg-white/[0.02]">
                <td className="px-4 py-3">{l.name}</td><td className="px-4 py-3 text-white/60">{l.company}</td><td className="px-4 py-3">{l.service}</td>
                <td className="px-4 py-3">{l.budget}</td><td className="px-4 py-3 text-white/60">{l.date}</td><td className="px-4 py-3"><Badge value={l.status} /></td>
                <td className="px-4 py-3"><ChevronRight size={16} className="text-white/30" /></td>
              </tr>))}</tbody>
          </table>
        </div>
      )}

      <Modal open={!!open} onClose={() => setOpen(null)} title="Lead details">
        {open && (() => {
          const l = db.leads.find((x) => x.id === open.id) || open
          return (
            <div>
              <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
                {[['Name', l.name], ['Email', l.email], ['Company', l.company], ['Service', l.service], ['Budget', l.budget], ['Received', l.date]].map(([k, v]) => (
                  <div key={k}><p className="label">{k}</p><p>{v || '—'}</p></div>
                ))}
              </div>
              <p className="label">Message</p>
              <p className="mb-6 rounded-xl bg-ink p-4 text-sm text-white/80">{l.message}</p>
              <p className="label">Stage</p>
              <div className="mb-6 flex flex-wrap gap-2">{stages.map((s) => (
                <button key={s} onClick={() => move(l.id, s)} className={`rounded-full border px-3 py-1.5 text-xs ${l.status === s ? 'border-lime bg-lime text-ink' : 'border-white/15 text-white/70'}`}>{s}</button>
              ))}</div>
              <div className="flex flex-wrap justify-between gap-2">
                <button onClick={() => { remove('leads', l.id); setOpen(null) }} className="btn border border-red-500/30 py-2 text-red-300 hover:bg-red-500/10"><Trash2 size={15} /> Delete</button>
                <div className="flex gap-2">
                  <a href={`mailto:${l.email}?subject=Your project with ${db.settings.agencyName}`} className="btn-ghost py-2"><Mail size={15} /> Reply</a>
                  <button onClick={() => toClient(l)} className="btn-lime py-2"><UserPlus size={15} /> Convert to client</button>
                </div>
              </div>
            </div>
          )
        })()}
      </Modal>
    </div>
  )
}
