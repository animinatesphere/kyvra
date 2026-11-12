import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Pencil, Trash2, Download, Check } from 'lucide-react'
import { useStore } from '../store/Store'
import { Badge, Modal, PageHeader, Progress, toCSV, download } from './ui'

function Cell({ f, v, currency }) {
  if (f.type === 'money') return <span>{currency}{Number(v || 0).toLocaleString()}</span>
  if (f.type === 'progress') return <Progress value={Number(v || 0)} />
  if (f.type === 'checkbox') return v ? <Check size={16} className="text-lime" /> : <span className="text-white/30">—</span>
  if (f.type === 'color') return <span className="inline-block h-5 w-5 rounded-md border border-white/20" style={{ background: v }} />
  if (f.key === 'status') return <Badge value={v} />
  if (f.type === 'textarea') return <span className="line-clamp-1 max-w-xs text-white/60">{v}</span>
  return <span>{v}</span>
}

function Field({ f, value, onChange, db }) {
  const opts = f.options || (f.optionsFrom ? db[f.optionsFrom].map((x) => x[f.optionKey || 'name']) : [])
  if (f.type === 'textarea') return <textarea rows={4} className="input" value={value ?? ''} onChange={(e) => onChange(e.target.value)} required={f.required} />
  if (f.type === 'select') return (
    <select className="input" value={value ?? ''} onChange={(e) => onChange(typeof opts[0] === 'number' ? Number(e.target.value) : e.target.value)}>
      <option value="">Select…</option>{opts.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  )
  if (f.type === 'checkbox') return (
    <button type="button" onClick={() => onChange(!value)} className={`relative h-7 w-12 rounded-full transition-colors ${value ? 'bg-lime' : 'bg-white/15'}`}>
      <motion.span layout className={`absolute top-1 h-5 w-5 rounded-full bg-ink ${value ? 'right-1' : 'left-1'}`} />
    </button>
  )
  if (f.type === 'progress') return <div className="flex items-center gap-3"><input type="range" min="0" max="100" value={value ?? 0} onChange={(e) => onChange(Number(e.target.value))} className="flex-1 accent-lime" /><span className="w-10 text-sm">{value ?? 0}%</span></div>
  if (f.type === 'color') return <input type="color" className="h-11 w-20 cursor-pointer rounded-lg border border-white/10 bg-ink" value={value || '#c8ff3d'} onChange={(e) => onChange(e.target.value)} />
  const t = f.type === 'money' || f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : f.type === 'email' ? 'email' : 'text'
  return <input type={t} className="input" value={value ?? ''} required={f.required} onChange={(e) => onChange(t === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value)} />
}

export default function CrudPage({ config, rowActions, summary }) {
  const store = useStore()
  const { db } = store
  const rows = db[config.collection]
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('All')
  const [editing, setEditing] = useState(null) // null | {} (new) | record
  const [confirm, setConfirm] = useState(null)
  const cols = config.fields.filter((f) => f.col)
  const filterVals = config.filterBy ? ['All', ...new Set(rows.map((r) => r[config.filterBy]).filter(Boolean))] : []

  const list = useMemo(() => rows.filter((r) =>
    (filter === 'All' || r[config.filterBy] === filter) &&
    (!q || Object.values(r).some((v) => String(v).toLowerCase().includes(q.toLowerCase())))
  ), [rows, q, filter, config.filterBy])

  const save = (e) => {
    e.preventDefault()
    const { id, ...data } = editing
    id ? store.update(config.collection, id, data) : store.add(config.collection, data)
    setEditing(null)
  }

  return (
    <div>
      <PageHeader title={config.title} subtitle={config.subtitle}>
        <button onClick={() => download(`${config.collection}.csv`, toCSV(list, config.fields))} className="btn-ghost py-2"><Download size={16} /> Export</button>
        <button onClick={() => setEditing({})} className="btn-lime py-2"><Plus size={16} /> Add {config.singular}</button>
      </PageHeader>

      {summary && summary(rows)}

      <div className="card p-0">
        <div className="flex flex-col gap-3 border-b border-white/10 p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative md:w-72"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" /><input className="input pl-9" placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          {filterVals.length > 2 && (
            <div className="flex flex-wrap gap-1">
              {filterVals.map((v) => (
                <button key={v} onClick={() => setFilter(v)} className={`relative rounded-lg px-3 py-1.5 text-xs font-medium ${filter === v ? 'text-ink' : 'text-white/60 hover:text-white'}`}>
                  {filter === v && <motion.span layoutId={`flt-${config.collection}`} className="absolute inset-0 rounded-lg bg-lime" />}<span className="relative">{v}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-white/40"><tr>{cols.map((c) => <th key={c.key} className="whitespace-nowrap px-4 py-3 font-medium">{c.label}</th>)}<th className="px-4 py-3" /></tr></thead>
            <tbody>
              <AnimatePresence initial={false}>
                {list.map((r) => (
                  <motion.tr key={r.id} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="border-t border-white/5 hover:bg-white/[0.02]">
                    {cols.map((c) => <td key={c.key} className="whitespace-nowrap px-4 py-3"><Cell f={c} v={r[c.key]} currency={db.settings.currency} /></td>)}
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        {rowActions && rowActions(r, store)}
                        <button onClick={() => setEditing(r)} className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white" title="Edit"><Pencil size={15} /></button>
                        <button onClick={() => setConfirm(r)} className="rounded-lg p-2 text-white/60 hover:bg-red-500/10 hover:text-red-300" title="Delete"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {!list.length && <p className="p-10 text-center text-white/40">Nothing here yet.</p>}
        </div>
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? `Edit ${config.singular}` : `New ${config.singular}`} wide>
        {editing && (
          <form onSubmit={save} className="grid gap-4 md:grid-cols-2">
            {config.fields.map((f) => (
              <div key={f.key} className={f.type === 'textarea' ? 'md:col-span-2' : ''}>
                <label className="label">{f.label}</label>
                <Field f={f} db={db} value={editing[f.key]} onChange={(v) => setEditing({ ...editing, [f.key]: v })} />
              </div>
            ))}
            <div className="flex justify-end gap-2 md:col-span-2"><button type="button" onClick={() => setEditing(null)} className="btn-ghost py-2">Cancel</button><button className="btn-lime py-2">Save</button></div>
          </form>
        )}
      </Modal>

      <Modal open={!!confirm} onClose={() => setConfirm(null)} title={`Delete ${config.singular.toLowerCase()}?`}>
        <p className="mb-6 text-white/60">This can't be undone.</p>
        <div className="flex justify-end gap-2"><button onClick={() => setConfirm(null)} className="btn-ghost py-2">Cancel</button>
          <button onClick={() => { store.remove(config.collection, confirm.id); setConfirm(null) }} className="btn bg-red-500 py-2 text-white hover:bg-red-400">Delete</button></div>
      </Modal>
    </div>
  )
}
