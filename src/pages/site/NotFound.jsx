import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <section className="container-x grid min-h-[80vh] place-items-center text-center">
      <div><h1 className="h-display text-[30vw] leading-none text-lime md:text-[18vw]">404</h1><p className="mb-8 text-bone/60">This page wandered off.</p><Link to="/" className="btn-lime">Back home</Link></div>
    </section>
  )
}
