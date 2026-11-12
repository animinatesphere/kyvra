import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40 })
  const sy = useSpring(y, { stiffness: 500, damping: 40 })
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e) => setHover(!!e.target.closest('a, button, [data-cursor]'))
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over) }
  }, [x, y])

  return (
    <motion.div
      className="cursor-dot pointer-events-none fixed left-0 top-0 z-[70] hidden rounded-full bg-lime mix-blend-difference md:block"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: hover ? 56 : 12, height: hover ? 56 : 12 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    />
  )
}
