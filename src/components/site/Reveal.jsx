import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Splits text into words and reveals them on scroll with GSAP. */
export function SplitHeading({ text, as: Tag = 'h2', className = '', delay = 0, onLoad = false }) {
  const ref = useRef(null)
  useGSAP(() => {
    gsap.from(ref.current.querySelectorAll('.sw'), {
      yPercent: 115, rotate: 4, duration: 1, ease: 'power4.out', stagger: 0.06, delay,
      scrollTrigger: onLoad ? undefined : { trigger: ref.current, start: 'top 85%' },
    })
  }, { scope: ref })
  return (
    <Tag ref={ref} className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
          <span className="sw inline-block">{w}&nbsp;</span>
        </span>
      ))}
    </Tag>
  )
}

/** Fades & lifts children (elements with .rv) into view on scroll. */
export function Reveal({ children, className = '', stagger = 0.1 }) {
  const ref = useRef(null)
  useGSAP(() => {
    const items = ref.current.querySelectorAll('.rv')
    gsap.from(items.length ? items : ref.current, {
      y: 60, opacity: 0, duration: 1, ease: 'power3.out', stagger,
      scrollTrigger: { trigger: ref.current, start: 'top 85%' },
    })
  }, { scope: ref })
  return <div ref={ref} className={className}>{children}</div>
}

/** Counts a number up when scrolled into view. */
export function Counter({ to, suffix = '', className = '' }) {
  const ref = useRef(null)
  useGSAP(() => {
    const o = { v: 0 }
    gsap.to(o, {
      v: to, duration: 2, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 90%' },
      onUpdate: () => { if (ref.current) ref.current.textContent = Math.round(o.v) + suffix },
    })
  }, { scope: ref })
  return <span ref={ref} className={className}>0{suffix}</span>
}
