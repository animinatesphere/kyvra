import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function ProjectCard({ p, i = 0, tall = false }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: (i % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group"
      data-cursor
    >
      <div className={`relative overflow-hidden rounded-3xl ${tall ? 'aspect-[4/5]' : 'aspect-[4/3]'}`} style={{ background: p.color }}>
        <motion.div className="absolute inset-0" whileHover={{ scale: 1.06 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,.35), transparent 45%), radial-gradient(circle at 80% 90%, rgba(0,0,0,.45), transparent 55%), ${p.color}` }}>
          <div className="absolute inset-0 grid place-items-center px-6">
            <span className="h-display text-center text-4xl text-ink/80 md:text-6xl">{p.title}</span>
          </div>
        </motion.div>
        <div className="absolute right-5 top-5 grid h-12 w-12 scale-0 place-items-center rounded-full bg-ink text-lime transition-transform duration-300 group-hover:scale-100">
          <ArrowUpRight />
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl uppercase">{p.title}</h3>
          <p className="text-sm text-bone/60">{p.summary}</p>
        </div>
        <span className="shrink-0 text-sm text-bone/50">{p.year}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {String(p.services).split(',').map((s) => <span key={s} className="rounded-full border border-white/15 px-3 py-1 text-xs text-bone/70">{s.trim()}</span>)}
      </div>
    </motion.article>
  )
}
