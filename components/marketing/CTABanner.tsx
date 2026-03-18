'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '../ui/Button'

export function CTABanner() {
  return (
    <section className="py-20 md:py-28 bg-terracotta text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl"
        >
          Give your dog the smile they deserve
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-white/80 max-w-lg mx-auto"
        >
          Start with a single chew or build a subscription. Either way, your dog wins.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/products">
            <Button
              size="lg"
              className="bg-white text-terracotta font-heading hover:bg-cream hover:-translate-y-0.5 active:translate-y-0"
            >
              Shop Now
            </Button>
          </Link>
          <Link href="/subscribe">
            <Button
              size="lg"
              className="bg-transparent text-white border-2 border-white/30 hover:border-white/60 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0"
            >
              Subscribe & Save 15%
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Decorative */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-terracotta-light/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-terracotta-dark/30 rounded-full blur-3xl" />
    </section>
  )
}
