import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Mail, Phone, MapPin, Send } from 'lucide-react'
import { useStore } from '../../store/Store'
import PageHero from '../../components/site/PageHero'

const budgets = ['Under £3k', '£3k – £5k', '£5k – £10k', '£10k+']

export default function Contact() {
  const { db, add } = useStore()
  const s = db.settings
  const empty = { name: '', email: '', company: '', service: db.services[0]?.title || '', budget: budgets[1], message: '' }
  const [f, setF] = useState(empty)
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    // Saved as a lead in the admin panel (Admin → Leads). Hook this up to your API / email service for production.
    add('leads', { ...f, status: 'New', date: new Date().toISOString().slice(0, 10) })
    setSent(true); setF(empty)
  }

  return (
    <>
      <PageHero eyebrow="Contact" title="Let's build something loud" intro="Tell us about your project. We reply within one working day." />
      <section className="container-x grid gap-12 pb-24 lg:grid-cols-3">
        <div className="space-y-6">
          {[[Mail, s.email, `mailto:${s.email}`], [Phone, s.phone, `tel:${s.phone}`], [MapPin, s.address]].map(([I, t, h]) => (
            <a key={t} href={h} className="card flex items-center gap-4 hover:border-lime"><I className="text-lime" /><span>{t}</span></a>
          ))}
        </div>
        <div className="card relative p-8 lg:col-span-2">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-16 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }} className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-lime text-ink"><Check size={36} /></motion.div>
                <h3 className="h-display text-5xl">Message sent!</h3>
                <p className="mt-3 text-bone/60">Thanks — we'll be in touch shortly.</p>
                <button onClick={() => setSent(false)} className="btn-ghost mt-8">Send another</button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-5 md:grid-cols-2">
                <div><label className="label">Name</label><input required className="input" value={f.name} onChange={set('name')} placeholder="Your name" /></div>
                <div><label className="label">Email</label><input required type="email" className="input" value={f.email} onChange={set('email')} placeholder="you@company.com" /></div>
                <div><label className="label">Company</label><input className="input" value={f.company} onChange={set('company')} placeholder="Company name" /></div>
                <div><label className="label">Service</label>
                  <select className="input" value={f.service} onChange={set('service')}>{db.services.map((x) => <option key={x.id}>{x.title}</option>)}</select></div>
                <div className="md:col-span-2"><label className="label">Budget</label>
                  <div className="flex flex-wrap gap-2">{budgets.map((b) => (
                    <button type="button" key={b} onClick={() => setF({ ...f, budget: b })} className={`rounded-full border px-4 py-2 text-sm ${f.budget === b ? 'border-lime bg-lime text-ink' : 'border-white/15'}`}>{b}</button>
                  ))}</div></div>
                <div className="md:col-span-2"><label className="label">Project details</label><textarea required rows={5} className="input" value={f.message} onChange={set('message')} placeholder="Tell us about goals, timeline, links…" /></div>
                <div className="md:col-span-2"><button className="btn-lime px-8 py-4">Send message <Send size={16} /></button></div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
