import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight, ArrowDown, Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { useStore } from '../../store/Store'
import Marquee from '../../components/site/Marquee'
import Magnetic from '../../components/site/Magnetic'
import ProjectCard from '../../components/site/ProjectCard'
import { SplitHeading, Reveal, Counter } from '../../components/site/Reveal'

gsap.registerPlugin(ScrollTrigger)

const brands = ['NIGHTFALL', 'ORBIT', 'MAISON VERDE', 'PULSE', 'ATLAS', 'LUMEN', 'KITE LABS', 'RIDGE', 'SOLACE', 'BLOOM']

function Hero() {
  const { db } = useStore()
  const s = db.settings
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useGSAP(() => {
    gsap.to('.blob', { y: 'random(-40, 40)', x: 'random(-40, 40)', duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true, repeatRefresh: true, stagger: 0.5 })
  }, { scope: ref })

  return (
    <section ref={ref} className="relative flex min-h-screen items-end overflow-hidden pb-16 pt-32">
      <motion.div style={{ y, rotate }} className="pointer-events-none absolute inset-0">
        <div className="blob absolute -right-20 top-24 h-72 w-72 rounded-full bg-lime/30 blur-3xl md:h-[28rem] md:w-[28rem]" />
        <div className="blob absolute bottom-10 left-10 h-60 w-60 rounded-full bg-flame/25 blur-3xl" />
        <div className="blob absolute left-1/2 top-1/3 h-40 w-40 rounded-full bg-[#3d8bff]/20 blur-3xl" />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="container-x relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-widest text-bone/70">
          <Sparkles size={14} className="text-lime" /> Full-service digital agency · Est. {s.foundedYear}
        </motion.div>

        <SplitHeading as="h1" onLoad delay={0.1} text={s.heroTitle} className="h-display max-w-6xl text-[15vw] md:text-[9.5vw]" />
        <SplitHeading as="p" onLoad delay={0.45} text="We're the team that handles it all." className="h-display text-outline mt-2 max-w-6xl text-[9vw] md:text-[5vw]" />

        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="max-w-md text-lg text-bone/70">
            {s.heroSubtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1, type: 'spring' }} className="flex items-center gap-4">
            <Magnetic><Link to="/contact" className="btn-lime px-8 py-4 text-base">Connect with us <ArrowUpRight size={18} /></Link></Magnetic>
            <Magnetic><a href="#work" className="grid h-14 w-14 place-items-center rounded-full border border-white/20"><ArrowDown className="animate-bounce" size={20} /></a></Magnetic>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

function Intro() {
  const ref = useRef(null)
  const text = 'We partner with ambitious brands to design, build and grow their digital world. Websites, apps, identity, content and campaigns — one team, one vision, zero hand-offs.'
  useGSAP(() => {
    gsap.fromTo(ref.current.querySelectorAll('.iw'), { opacity: 0.15 }, {
      opacity: 1, stagger: 0.05, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'bottom 45%', scrub: true },
    })
  }, { scope: ref })
  return (
    <section className="container-x py-32">
      <p className="eyebrow mb-8">Who we are</p>
      <p ref={ref} className="max-w-5xl text-3xl font-medium leading-tight md:text-5xl">
        {text.split(' ').map((w, i) => <span key={i} className="iw">{w} </span>)}
      </p>
      <Link to="/about" className="btn-ghost mt-10">More about us <ArrowUpRight size={16} /></Link>
    </section>
  )
}

function FeaturedWork() {
  const { db } = useStore()
  const items = db.portfolio.filter((p) => p.featured).slice(0, 4)
  return (
    <section id="work" className="container-x py-24">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SplitHeading text="Showing off our work" className="h-display text-6xl md:text-8xl" />
        <Link to="/work" className="btn-ghost self-start md:self-auto">All projects <ArrowUpRight size={16} /></Link>
      </div>
      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
        {items.map((p, i) => <div key={p.id} className={i % 2 ? 'md:mt-32' : ''}><ProjectCard p={p} i={i} tall /></div>)}
      </div>
    </section>
  )
}

function ServicesScroller() {
  const { db } = useStore()
  const items = db.services.filter((s) => s.active)
  const wrap = useRef(null)
  const track = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      const dist = () => track.current.scrollWidth - window.innerWidth + 80
      gsap.to(track.current, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: wrap.current, start: 'top top', end: () => '+=' + dist(), scrub: 1, pin: true, invalidateOnRefresh: true },
      })
    })
    return () => mm.revert()
  }, { scope: wrap, dependencies: [items.length] })

  return (
    <section ref={wrap} className="overflow-hidden bg-bone py-24 text-ink md:flex md:h-screen md:flex-col md:justify-center">
      <div className="container-x mb-12">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-flame">What we do</p>
        <h2 className="h-display text-6xl md:text-8xl">This is what we do best</h2>
      </div>
      <div ref={track} className="flex flex-col gap-6 px-5 md:w-max md:flex-row md:px-10">
        {items.map((s, i) => (
          <motion.div key={s.id} whileHover={{ y: -10 }} className="group flex min-h-[22rem] flex-col justify-between rounded-3xl bg-ink p-8 text-bone md:w-[26rem]">
            <div className="flex items-start justify-between">
              <span className="font-display text-6xl text-lime">0{i + 1}</span>
              <ArrowUpRight className="transition-transform group-hover:rotate-45" />
            </div>
            <div>
              <h3 className="h-display mb-3 text-4xl">{s.title}</h3>
              <p className="mb-5 text-bone/60">{s.description}</p>
              <div className="flex flex-wrap gap-2">{s.tags.split(',').map((t) => <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs">{t.trim()}</span>)}</div>
            </div>
          </motion.div>
        ))}
        <Link to="/services" className="grid min-h-[12rem] place-items-center rounded-3xl border-2 border-dashed border-ink/30 p-8 md:w-[20rem]">
          <span className="h-display text-center text-4xl">All services <ArrowUpRight className="inline" /></span>
        </Link>
      </div>
    </section>
  )
}

function Stats() {
  const { db } = useStore()
  const years = new Date().getFullYear() - db.settings.foundedYear
  const stats = [
    { n: 120, s: '+', l: 'Projects launched' },
    { n: 48, s: '', l: 'Happy clients' },
    { n: years, s: '', l: 'Years creating' },
    { n: 98, s: '%', l: 'Client retention' },
  ]
  return (
    <section className="container-x grid grid-cols-2 gap-8 py-28 md:grid-cols-4">
      {stats.map((x) => (
        <div key={x.l} className="border-t border-white/15 pt-6">
          <Counter to={x.n} suffix={x.s} className="h-display block text-7xl text-lime md:text-8xl" />
          <p className="mt-2 text-sm uppercase tracking-widest text-bone/60">{x.l}</p>
        </div>
      ))}
    </section>
  )
}

function Process() {
  const steps = [
    ['Discover', 'Workshops, research and a clear plan of what success looks like.'],
    ['Design', 'Identity, UX and interface design with rapid prototypes you can click.'],
    ['Build', 'Clean, fast, accessible code — tested on every device.'],
    ['Grow', 'Launch, measure and keep improving with SEO, content and ads.'],
  ]
  return (
    <section className="container-x py-24">
      <SplitHeading text="How we work" className="h-display mb-14 text-6xl md:text-8xl" />
      <Reveal className="grid gap-6 md:grid-cols-4">
        {steps.map(([t, d], i) => (
          <div key={t} className="rv card relative overflow-hidden p-8">
            <span className="absolute -right-4 -top-6 font-display text-[9rem] leading-none text-white/[0.04]">{i + 1}</span>
            <p className="eyebrow mb-6">Step 0{i + 1}</p>
            <h3 className="h-display mb-3 text-4xl">{t}</h3>
            <p className="text-bone/60">{d}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function Testimonials() {
  const { db } = useStore()
  const list = db.testimonials.filter((t) => t.active)
  const [i, setI] = useState(0)
  if (!list.length) return null
  const t = list[i % list.length]
  const go = (d) => setI((v) => (v + d + list.length) % list.length)
  return (
    <section className="container-x py-24">
      <p className="eyebrow mb-10">Kind words</p>
      <div className="relative min-h-[18rem]">
        <AnimatePresence mode="wait">
          <motion.blockquote key={t.id} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.5 }}>
            <div className="mb-6 flex gap-1">{Array.from({ length: t.rating }).map((_, k) => <Star key={k} size={18} className="fill-lime text-lime" />)}</div>
            <p className="max-w-5xl text-3xl font-medium leading-tight md:text-5xl">“{t.quote}”</p>
            <footer className="mt-8 text-bone/60"><span className="font-semibold text-bone">{t.name}</span> — {t.company}</footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>
      <div className="mt-10 flex gap-3">
        <button onClick={() => go(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/20 hover:border-lime"><ChevronLeft /></button>
        <button onClick={() => go(1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/20 hover:border-lime"><ChevronRight /></button>
      </div>
    </section>
  )
}

function CTA() {
  const { db } = useStore()
  return (
    <section className="px-5 py-24 md:px-10">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[2.5rem] bg-lime px-8 py-20 text-ink md:px-20 md:py-28">
        <SplitHeading text={`We've been creating since ${db.settings.foundedYear}`} className="h-display max-w-4xl text-6xl md:text-8xl" />
        <p className="mt-6 max-w-xl text-lg text-ink/70">Got an idea, a launch date or a brand that needs a glow-up? Let's make it happen.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Magnetic><Link to="/contact" className="btn bg-ink px-8 py-4 text-bone hover:bg-coal">Start a project <ArrowUpRight size={18} /></Link></Magnetic>
          <Magnetic><Link to="/about#careers" className="btn border border-ink/30 px-8 py-4 hover:bg-ink/10">Join our team</Link></Magnetic>
        </div>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-24 -right-24 hidden h-80 w-80 rounded-full border-[3rem] border-ink/10 md:block" />
      </motion.div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <div className="border-y border-white/10 py-8">
        <Marquee items={brands.map((b) => <span className="h-display mx-10 text-4xl text-bone/30 transition-colors hover:text-lime md:text-5xl">{b} <span className="ml-10 text-lime">✦</span></span>)} />
      </div>
      <Intro />
      <FeaturedWork />
      <ServicesScroller />
      <Stats />
      <Process />
      <div className="-rotate-2 bg-flame py-5">
        <Marquee speed={20} reverse items={['Brand', 'Web', 'Apps', 'Content', 'SEO', 'Motion'].map((w) => <span className="h-display mx-8 text-5xl text-ink">{w} ✦</span>)} />
      </div>
      <Testimonials />
      <CTA />
    </>
  )
}
