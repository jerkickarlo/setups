import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <section className="container-max py-16">
      <motion.h1 initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:.5}} className="hero-title mb-6">
        About Setups.Space
      </motion.h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="subtle">We build modern, minimal, and blazingly fast interfaces for IT consulting scenarios — from ITSM to ITAM dashboards and analytics. Precision, performance, and polish.</p>
        </div>
        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-3">What we do</h2>
          <ul className="list-disc pl-6 subtle space-y-2">
            <li>ITSM/ITAM implementations and audits</li>
            <li>Converter & analytics tools with live market data</li>
            <li>Design systems, motion design, and product strategy</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
