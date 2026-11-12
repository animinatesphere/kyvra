import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { statusColors } from './configs'

export function Badge({ value }) {
  return <span className={`badge ${statusColors[value] || 'bg-white/10 text-white/70'}`}>{value}</span>
}

export function Modal({ open, onClose, title, children, wide }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
          <motion.div onMouseDown={(e) => e.stopPropagation()} initial={{ y: 40, scale: 0.96, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-white/10 bg-coal p-6 ${wide ? 'max-w-3xl' : 'max-w-xl'}`}>
            <div className="mb-6 flex items-center justify-between"><h3 className="text-lg font-semibold">{title}</h3><button onClick={onClose} className="rounded-lg p-1 hover:bg-white/10"><X size={18} /></button></div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div><h1 className="text-2xl font-bold md:text-3xl">{title}</h1>{subtitle && <p className="mt-1 text-sm text-white/50">{subtitle}</p>}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

export function Progress({ value }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10"><motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} className="h-full rounded-full bg-lime" /></div>
      <span className="text-xs text-white/60">{value}%</span>
    </div>
  )
}

export function toCSV(rows, fields) {
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  return [fields.map((f) => esc(f.label)).join(','), ...rows.map((r) => fields.map((f) => esc(r[f.key])).join(','))].join('\n')
}

export function download(name, text, type = 'text/csv') {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([text], { type }))
  a.download = name; a.click(); URL.revokeObjectURL(a.href)
}
