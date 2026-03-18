'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '../ui/Button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-heading text-sage tracking-wider uppercase mb-4"
          >
            Australian-made dental chews
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight"
          >
            Clean teeth.{' '}
            <span className="text-sage">Happy dog.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-white/70 leading-relaxed max-w-lg"
          >
            Premium dental chews that actually work. Vet-recommended, naturally sourced,
            and delivered to your door. Subscribe and save 15%.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Link href="/products">
              <Button variant="primary" size="lg">
                Shop Now
              </Button>
            </Link>
            <Link href="/subscribe">
              <Button
                size="lg"
                className="bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0"
              >
                Build a Subscription
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex flex-wrap gap-6 text-sm text-white/50"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-sage" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Free shipping Australia-wide
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-sage" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Pause or cancel anytime
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-sage" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Vet recommended
            </span>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-sage/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-terracotta/10 rounded-full blur-3xl" />
    </section>
  )
}
