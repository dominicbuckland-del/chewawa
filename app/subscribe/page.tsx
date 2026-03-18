'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { DogSizeSelector } from '@/components/ui/DogSizeSelector'
import { Card, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import type { DogSize, SubscriptionPlan } from '@/lib/types'
import { PLAN_DETAILS } from '@/lib/types'

export default function SubscribePage() {
  const [dogSize, setDogSize] = useState<DogSize>('medium')
  const [plan, setPlan] = useState<SubscriptionPlan>('premium')
  const [frequency, setFrequency] = useState<'monthly' | 'biweekly'>('monthly')

  const selectedPlan = PLAN_DETAILS[plan]

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-heading text-terracotta tracking-wider uppercase mb-3">Subscribe & Save 15%</p>
          <h1 className="font-display text-4xl sm:text-5xl text-charcoal">
            Build your chew box
          </h1>
          <p className="mt-4 text-charcoal-muted max-w-lg mx-auto">
            Choose your dog&apos;s size, pick a plan, and we&apos;ll deliver fresh dental chews on your schedule.
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Step 1: Dog Size */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-heading text-lg text-charcoal mb-4">1. What size is your dog?</h2>
            <DogSizeSelector value={dogSize} onChange={setDogSize} />
          </motion.div>

          {/* Step 2: Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-heading text-lg text-charcoal mb-4">2. Choose your plan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(Object.entries(PLAN_DETAILS) as [SubscriptionPlan, typeof PLAN_DETAILS[SubscriptionPlan]][]).map(([key, details]) => (
                <button
                  key={key}
                  onClick={() => setPlan(key)}
                  className="text-left"
                >
                  <Card
                    variant={plan === key ? 'highlight' : 'content'}
                    className={`h-full transition-all ${plan === key ? 'ring-2 ring-forest' : 'hover:shadow-product-lift'}`}
                  >
                    <CardBody>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-heading text-base ${plan === key ? 'text-white' : 'text-charcoal'}`}>
                          {details.name}
                        </span>
                        {key === 'premium' && <Badge variant="sale">Most Popular</Badge>}
                      </div>
                      <p className={`text-2xl font-heading ${plan === key ? 'text-white' : 'text-charcoal'}`}>
                        {formatPrice(details.price)}
                        <span className={`text-xs font-sans ${plan === key ? 'text-white/60' : 'text-charcoal-muted'}`}>/month</span>
                      </p>
                      <p className={`text-sm mt-2 ${plan === key ? 'text-white/70' : 'text-charcoal-muted'}`}>
                        {details.description}
                      </p>
                    </CardBody>
                  </Card>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Step 3: Frequency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="font-heading text-lg text-charcoal mb-4">3. Delivery frequency</h2>
            <div className="flex gap-3">
              <button
                onClick={() => setFrequency('monthly')}
                className={`flex-1 p-4 rounded-xl border-2 text-left transition-all ${
                  frequency === 'monthly' ? 'border-forest bg-forest/5' : 'border-sand bg-white'
                }`}
              >
                <span className="font-heading text-sm text-charcoal block">Monthly</span>
                <span className="text-xs text-charcoal-muted">Delivered every 4 weeks</span>
              </button>
              <button
                onClick={() => setFrequency('biweekly')}
                className={`flex-1 p-4 rounded-xl border-2 text-left transition-all ${
                  frequency === 'biweekly' ? 'border-forest bg-forest/5' : 'border-sand bg-white'
                }`}
              >
                <span className="font-heading text-sm text-charcoal block">Bi-weekly</span>
                <span className="text-xs text-charcoal-muted">Delivered every 2 weeks</span>
              </button>
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-card"
          >
            <h2 className="font-heading text-lg text-charcoal mb-4">Your subscription</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal-muted">Plan</span>
                <span className="font-heading text-charcoal">{selectedPlan.name} ({selectedPlan.chews} chews)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-muted">Dog size</span>
                <span className="font-heading text-charcoal capitalize">{dogSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-muted">Frequency</span>
                <span className="font-heading text-charcoal">{frequency === 'monthly' ? 'Every 4 weeks' : 'Every 2 weeks'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-muted">Shipping</span>
                <span className="font-heading text-forest">Free</span>
              </div>
              <div className="border-t border-sand pt-3 flex justify-between">
                <span className="text-charcoal font-heading">Total per delivery</span>
                <span className="text-xl font-heading text-charcoal">{formatPrice(selectedPlan.price)}</span>
              </div>
            </div>
            <Button variant="primary" size="lg" className="w-full mt-6">
              Start Subscription
            </Button>
            <p className="text-xs text-charcoal-muted text-center mt-3">
              Cancel or pause anytime. No lock-in contracts.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
