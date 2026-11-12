import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../../store/Store'
import PageHero from '../../components/site/PageHero'
import ProjectCard from '../../components/site/ProjectCard'

export default function Work() {
  const { db } = useStore()
  const cats = ['All', ...new Set(db.portfolio.map((p) => p.category))]
  const [cat, setCat] = useState('All')
  const list = db.portfolio.filter((p) => cat === 'All' || p.category === cat)
  return (
    <>
      <PageHero eyebrow="Selected work" title="Work we are proud of" intro="Brands, platforms and products we have designed, built and grown with our clients." />
      <section className="container-x pb-24">
        <div className="mb-12 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`relative rounded-full px-5 py-2 text-sm font-medium ${cat === c ? 'text-ink' : 'text-bone/70 hover:text-bone'}`}>
              {cat === c && <motion.span layoutId="work-pill" className="absolute inset-0 rounded-full bg-lime" />}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>
        <motion.div layout className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {list.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                <ProjectCard p={p} i={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  )
}
