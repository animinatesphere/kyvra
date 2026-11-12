import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Marquee({ items, speed = 30, reverse = false, className = '' }) {
  const track = useRef(null)
  useGSAP(() => {
    const tween = gsap.to(track.current, { xPercent: reverse ? 50 : -50, duration: speed, ease: 'none', repeat: -1 })
    if (reverse) gsap.set(track.current, { xPercent: -50 })
    const el = track.current.parentElement
    const slow = () => gsap.to(tween, { timeScale: 0.25, duration: 0.4 })
    const fast = () => gsap.to(tween, { timeScale: 1, duration: 0.4 })
    el.addEventListener('mouseenter', slow); el.addEventListener('mouseleave', fast)
    return () => { el.removeEventListener('mouseenter', slow); el.removeEventListener('mouseleave', fast) }
  }, { scope: track })

  const row = [...items, ...items]
  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={track} className="flex w-max items-center">
        {row.map((it, i) => <div key={i} className="shrink-0">{it}</div>)}
      </div>
    </div>
  )
}
