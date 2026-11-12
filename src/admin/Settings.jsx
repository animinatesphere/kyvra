import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Download, Upload, RotateCcw } from 'lucide-react'
import { useStore } from '../store/Store'
import { Modal, PageHeader, download } from './ui'

const groups = [
  ['Brand', [['agencyName', 'Agency name'], ['tagline', 'Tagline (preloader)'], ['foundedYear', 'Founded year', 'number'], ['currency', 'Currency symbol']]],
  ['Homepage hero', [['heroTitle', 'Headline'], ['heroSubtitle', 'Sub-headline', 'textarea']]],
  ['Contact', [['email', 'Email'], ['phone', 'Phone'], ['address', 'Address / locations']]],
  ['Social links', [['instagram', 'Instagram URL'], ['twitter', 'X / Twitter URL'], ['linkedin', 'LinkedIn URL'], ['dribbble', 'Dribbble URL']]],
]

export default function Settings() {
  const { db, saveSettings, reset } = useStore()
  const [f, setF] = useState(db.settings)
  const [saved, setSaved] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const file = useRef(null)

  const submit = (e) => { e.preventDefault(); saveSettings({ ...f, foundedYear: Number(f.foundedYear) }); setSaved(true); setTimeout(() => setSaved(false), 2000) }
  const importJSON = (e) => {
    const r = new FileReader()
    r.onload = () => { try { localStorage.setItem('kyvra-store-v1', r.result); window.location.reload() } catch { alert('Invalid backup file') } }
    if (e.target.files[0]) r.readAsText(e.target.files[0])
  }

  return (
    <div>
      <PageHeader title="Settings" subtitle="Changes update the public website instantly.">
        <AnimatePresence>{saved && <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="badge bg-lime/15 py-2 text-lime"><Check size={14} className="mr-1" /> Saved</motion.span>}</AnimatePresence>
        <button form="settings" className="btn-lime py-2">Save changes</button>
      </PageHeader>

      <form id="settings" onSubmit={submit} className="grid gap-4 xl:grid-cols-2">
        {groups.map(([g, fields]) => (
          <div key={g} className="card">
            <p className="mb-4 font-semibold">{g}</p>
            <div className="space-y-4">
              {fields.map(([k, l, t]) => (
                <div key={k}><label className="label">{l}</label>
                  {t === 'textarea'
                    ? <textarea rows={3} className="input" value={f[k] ?? ''} onChange={(e) => setF({ ...f, [k]: e.target.value })} />
                    : <input type={t || 'text'} className="input" value={f[k] ?? ''} onChange={(e) => setF({ ...f, [k]: e.target.value })} />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </form>

      <div className="card mt-4">
        <p className="mb-1 font-semibold">Data</p>
        <p className="mb-4 text-sm text-white/50">This demo stores data in your browser. Back it up, restore it, or reset to the sample data.</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => download('kyvra-backup.json', JSON.stringify(db, null, 2), 'application/json')} className="btn-ghost py-2"><Download size={15} /> Export backup</button>
          <button onClick={() => file.current.click()} className="btn-ghost py-2"><Upload size={15} /> Import backup</button>
          <input ref={file} type="file" accept="application/json" hidden onChange={importJSON} />
          <button onClick={() => setConfirm(true)} className="btn border border-red-500/30 py-2 text-red-300 hover:bg-red-500/10"><RotateCcw size={15} /> Reset demo data</button>
        </div>
      </div>

      <Modal open={confirm} onClose={() => setConfirm(false)} title="Reset all data?">
        <p className="mb-6 text-white/60">Every lead, project, invoice and setting goes back to the sample data.</p>
        <div className="flex justify-end gap-2"><button onClick={() => setConfirm(false)} className="btn-ghost py-2">Cancel</button>
          <button onClick={() => { reset(); setConfirm(false); window.location.reload() }} className="btn bg-red-500 py-2 text-white">Reset</button></div>
      </Modal>
    </div>
  )
}
