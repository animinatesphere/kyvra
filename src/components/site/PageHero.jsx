import { SplitHeading } from './Reveal'
import { motion } from 'framer-motion'

export default function PageHero({ eyebrow, title, intro }) {
  return (
    <section className="container-x pb-16 pt-40 md:pt-48">
      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="eyebrow mb-6">{eyebrow}</motion.p>
      <SplitHeading as="h1" onLoad text={title} className="h-display max-w-6xl text-6xl sm:text-7xl md:text-[9rem]" />
      {intro && (
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 max-w-2xl text-lg text-bone/70">
          {intro}
        </motion.p>
      )}
    </section>
  )
}
