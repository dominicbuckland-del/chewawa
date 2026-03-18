'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'Are Chewawa dental chews safe for all dogs?',
    a: 'Our chews are designed for dogs of all sizes and ages. We have specific products for puppies (8 weeks+), adults, and seniors. Always supervise your dog during chewing and choose the right size for your breed.',
  },
  {
    q: 'How often should my dog have a dental chew?',
    a: 'We recommend one dental chew per day for optimal dental health. Our subscriptions are designed around daily use, but you can adjust frequency to suit your dog\'s needs.',
  },
  {
    q: 'Can I pause or cancel my subscription?',
    a: 'Absolutely. You can pause, skip a delivery, change your plan, or cancel anytime from your account dashboard. No lock-in contracts, no cancellation fees.',
  },
  {
    q: 'What ingredients are in your chews?',
    a: 'All our chews are made from natural, Australian-sourced ingredients. We use single-protein recipes with no artificial colours, flavours, or preservatives. Full ingredient lists are on each product page.',
  },
  {
    q: 'How long does shipping take?',
    a: 'We offer free standard shipping Australia-wide, which typically takes 3-5 business days. Express shipping is available at checkout for 1-2 business day delivery.',
  },
  {
    q: 'Do vets actually recommend these?',
    a: 'Yes. Our dental chews are formulated in consultation with veterinary dental specialists and tested to reduce plaque buildup by up to 70%. We\'re proud to be recommended by vets across Australia.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-heading text-terracotta tracking-wider uppercase mb-3">FAQ</p>
          <h2 className="font-display text-3xl sm:text-4xl text-charcoal">
            Common questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-sand rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-cream-dark/30 transition-colors"
              >
                <span className="text-sm font-heading text-charcoal pr-4">{faq.q}</span>
                <motion.svg
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 text-charcoal-muted flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-sm text-charcoal-muted leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
