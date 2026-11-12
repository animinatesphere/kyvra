import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useStore } from '../../store/Store'
import PageHero from '../../components/site/PageHero'

export default function Blog() {
  const { db } = useStore()
  const posts = db.posts.filter((p) => p.status === 'Published')
  return (
    <>
      <PageHero eyebrow="Journal" title="Notes from the studio" intro="Ideas on design, development and growing a brand online." />
      <section className="container-x grid gap-6 pb-24 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <motion.article key={p.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }} className="card group flex flex-col justify-between p-8">
            <div>
              <div className="mb-6 flex justify-between text-xs uppercase tracking-widest text-bone/50"><span className="text-lime">{p.category}</span><span>{p.date}</span></div>
              <h3 className="h-display mb-3 text-3xl group-hover:text-lime">{p.title}</h3>
              <p className="text-bone/60">{p.excerpt}</p>
            </div>
            <div className="mt-8 flex items-center justify-between text-sm text-bone/60"><span>By {p.author}</span><ArrowUpRight className="transition-transform group-hover:rotate-45" /></div>
          </motion.article>
        ))}
        {!posts.length && <p className="text-bone/60">No posts yet.</p>}
      </section>
    </>
  )
}
