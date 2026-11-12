import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useStore } from '../../store/Store'

// Shows once per browser session.
export default function Preloader() {
  const { db } = useStore()
  const root = useRef(null)
  const [done, setDone] = useState(() => { try { return sessionStorage.getItem('kyvra-loaded') === '1' } catch { return false } })

  useGSAP(() => {
    if (done) return
    const counter = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => { try { sessionStorage.setItem('kyvra-loaded', '1') } catch {} setDone(true) },
    })
    tl.from('.pl-word', { yPercent: 110, duration: 0.8, ease: 'power4.out', stagger: 0.08 })
      .to(counter, { v: 100, duration: 1.4, ease: 'power2.inOut', onUpdate: () => { const el = root.current?.querySelector('.pl-count'); if (el) el.textContent = Math.round(counter.v) + '%' } }, 0)
      .to('.pl-bar', { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, 0)
      .to(root.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '+=0.2')
  }, { scope: root, dependencies: [done] })

  if (done) return null
  return (
    <div ref={root} className="fixed inset-0 z-[80] flex flex-col justify-between bg-lime p-8 text-ink">
      <div className="flex flex-wrap gap-x-3 overflow-hidden">
        {db.settings.tagline.split(' ').map((w, i) => <span key={i} className="pl-word h-display inline-block text-4xl md:text-6xl">{w}</span>)}
      </div>
      <div>
        <div className="pl-count h-display text-[22vw] leading-none md:text-[14vw]">0%</div>
        <div className="pl-bar mt-4 h-1 origin-left scale-x-0 bg-ink" />
      </div>
    </div>
  )
}
