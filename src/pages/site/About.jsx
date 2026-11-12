import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Heart, Zap, Eye, Users } from 'lucide-react'
import { useStore } from '../../store/Store'
import PageHero from '../../components/site/PageHero'
import { SplitHeading, Reveal, Counter } from '../../components/site/Reveal'

const values = [
  { icon: Eye, t: 'Craft first', d: 'Every pixel and every line of code is considered. Good enough is never the goal.' },
  { icon: Zap, t: 'Move fast', d: 'Short feedback loops, weekly demos and no surprise invoices.' },
  { icon: Heart, t: 'Honest partners', d: 'We tell you what will actually work — even when it is not what you expected.' },
  { icon: Users, t: 'One team', d: 'Strategy, design, development and growth under one roof. No hand-offs.' },
]

export default function About() {
  const { db } = useStore()
  const s = db.settings
  return (
    <>
      <PageHero eyebrow="About us" title="A small crew with big ambitions"
        intro={`${s.agencyName} was founded in ${s.foundedYear} with one idea: brands deserve a partner that handles the whole picture — not just a website. Today we are a tight team of designers, developers and strategists working with clients around the world.`} />

      <section className="container-x grid gap-10 py-16 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-lime via-[#7be0a0] to-[#3d8bff]">
          <div className="h-display absolute inset-0 grid place-items-center text-[30vw] text-ink/20 md:text-[14vw]">{s.agencyName[0]}</div>
        </motion.div>
        <Reveal className="flex flex-col justify-center space-y-6 text-lg text-bone/70">
          <p className="rv eyebrow">Our story</p>
          <p className="rv text-3xl font-medium leading-snug text-bone">We started as two friends building websites for musicians. Then those musicians needed brands, bookings, apps and campaigns.</p>
          <p className="rv">So we grew. Not into a faceless agency, but into a studio where the people you meet on day one are the people doing the work. We care about results you can measure — more customers, more bookings, more sales — and work that makes you proud.</p>
          <div className="rv grid grid-cols-2 gap-6 pt-4">
            <div><Counter to={120} suffix="+" className="h-display text-6xl text-lime" /><p className="text-sm uppercase tracking-widest">Projects</p></div>
            <div><Counter to={12} className="h-display text-6xl text-lime" /><p className="text-sm uppercase tracking-widest">Countries</p></div>
          </div>
        </Reveal>
      </section>

      <section className="container-x py-24">
        <SplitHeading text="What we believe" className="h-display mb-12 text-6xl md:text-8xl" />
        <Reveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: I, t, d }) => (
            <motion.div key={t} whileHover={{ y: -8, borderColor: '#c8ff3d' }} className="rv card p-8">
              <I className="mb-8 text-lime" size={32} />
              <h3 className="h-display mb-2 text-3xl">{t}</h3>
              <p className="text-bone/60">{d}</p>
            </motion.div>
          ))}
        </Reveal>
      </section>

      <section className="container-x py-24">
        <SplitHeading text="Meet the roster" className="h-display mb-12 text-6xl md:text-8xl" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {db.team.map((m, i) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group">
              <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-3xl" style={{ background: m.color }}>
                <div className="h-display absolute inset-0 grid place-items-center text-8xl text-ink/30 transition-transform duration-700 group-hover:scale-125">
                  {m.name.split(' ').map((n) => n[0]).join('')}
                </div>
              </div>
              <h3 className="font-display text-2xl uppercase">{m.name}</h3>
              <p className="text-sm text-lime">{m.role}</p>
              <p className="mt-1 text-sm text-bone/60">{m.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="careers" className="container-x py-24">
        <SplitHeading text="Join our team" className="h-display mb-10 text-6xl md:text-8xl" />
        <div className="divide-y divide-white/10 border-y border-white/10">
          {db.jobs.filter((j) => j.open).map((j) => (
            <Link key={j.id} to="/contact" className="group flex items-center justify-between py-6">
              <div><h3 className="font-display text-3xl uppercase transition-colors group-hover:text-lime">{j.title}</h3><p className="text-sm text-bone/60">{j.type} · {j.location}</p></div>
              <ArrowUpRight className="transition-transform group-hover:rotate-45" />
            </Link>
          ))}
          {!db.jobs.some((j) => j.open) && <p className="py-6 text-bone/60">No open roles right now — send us your portfolio anyway.</p>}
        </div>
      </section>
    </>
  )
}
