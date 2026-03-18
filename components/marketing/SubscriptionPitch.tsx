'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '../ui/Button'

const benefits = [
  'Save 15% on every order',
  'Free shipping, always',
  'Pause or cancel anytime',
  'Swap sizes as your dog grows',
  'Early access to new products',
  'Birthday treat for your pup',
]

export function SubscriptionPitch() {
  return (
    <section className="py-20 md:py-28 bg-forest text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-sm font-heading text-sage tracking-wider uppercase mb-3">Subscribe & Save</p>
            <h2 className="font-display text-3xl sm:text-4xl leading-tight">
              Never run out of chews again
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Set it and forget it. Fresh dental chews delivered on your schedule,
              with 15% off every order. Your dog&apos;s teeth will thank you.
            </p>

            <ul className="mt-8 space-y-3">
              {benefits.map((benefit, i) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-3 text-sm text-white/80"
                >
                  <svg className="w-5 h-5 text-sage flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {benefit}
                </motion.li>
              ))}
            </ul>

            <div className="mt-10">
              <Link href="/subscribe">
                <Button variant="primary" size="lg">
                  Build Your Box
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Visual placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-forest-light rounded-3xl flex items-center justify-center">
              <div className="text-center">
                <p className="font-display text-6xl text-sage/30">15%</p>
                <p className="font-heading text-sm text-white/40 mt-2">off every order</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-terracotta/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-sage/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
