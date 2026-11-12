import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, ArrowUpRight } from 'lucide-react'
import { useStore } from '../../store/Store'
import PageHero from '../../components/site/PageHero'

export default function Services() {
  const { db } = useStore()
  const list = db.services.filter((s) => s.active)
  const [open, setOpen] = useState(list[0]?.id)
  return (
    <>
      <PageHero eyebrow="What we do" title="Everything your brand needs" intro="Pick one service or let us run the whole thing. Every engagement starts with a free discovery call." />
      <section className="container-x pb-24">
        <div className="border-t border-white/10">
          {list.map((s, i) => {
            const isOpen = open === s.id
            return (
              <div key={s.id} className="border-b border-white/10">
                <button onClick={() => setOpen(isOpen ? null : s.id)} className="group flex w-full items-center gap-6 py-8 text-left">
                  <span className="font-display text-2xl text-bone/40">0{i + 1}</span>
                  <span className={`h-display flex-1 text-4xl transition-colors md:text-7xl ${isOpen ? 'text-lime' : 'group-hover:text-lime'}`}>{s.title}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="grid h-12 w-12 place-items-center rounded-full border border-white/20"><Plus /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                      <div className="grid gap-6 pb-10 md:grid-cols-3 md:pl-16">
                        <p className="text-lg text-bone/70 md:col-span-2">{s.description}</p>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">{s.tags.split(',').map((t) => <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs">{t.trim()}</span>)}</div>
                          <p className="text-bone/60">From <span className="font-display text-3xl text-bone">{db.settings.currency}{Number(s.price).toLocaleString()}</span></p>
                          <Link to="/contact" className="btn-lime">Get a quote <ArrowUpRight size={16} /></Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
