import { Suspense } from 'react'
import Converter from '../components/Converter'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <section className="container-max py-20">
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:.5}} className="mb-10">
          <p className="subtle">Setups.Space</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Trade-grade visuals. Consultant-grade UX.</h2>
        </motion.div>
        <Suspense fallback={<div className="container-max">Loading…</div>}>
          <Converter />
        </Suspense>
      </section>

      <section className="container-max pb-24 text-center">
        <Link href="/contact" className="btn">Let’s talk</Link>
      </section>
    </div>
  )
}
