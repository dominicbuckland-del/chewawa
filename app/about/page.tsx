'use client'
import { motion } from 'framer-motion'

const values = [
  { title: 'Natural First', description: 'Every ingredient is traceable, natural, and sourced from Australian suppliers. No shortcuts.' },
  { title: 'Vet-Backed Science', description: 'Our formulas are developed with veterinary dental specialists. Not marketing teams.' },
  { title: 'Dogs Over Profits', description: 'We\'d rather make a product that works than one that sells. Turns out, doing both is possible.' },
]

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-heading text-terracotta tracking-wider uppercase mb-3">Our Story</p>
          <h1 className="font-display text-4xl sm:text-5xl text-charcoal">
            We started with a stinky dog
          </h1>
          <p className="mt-6 text-charcoal-muted leading-relaxed max-w-2xl mx-auto">
            Chewawa was born when our founder&apos;s dog, Biscuit, had breath that could clear a room
            and a vet bill that could clear a bank account. There had to be a better way to keep
            dogs&apos; teeth clean without the drama.
          </p>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-card mb-16"
        >
          <h2 className="font-display text-2xl text-charcoal mb-4">The problem was obvious</h2>
          <div className="space-y-4 text-charcoal-muted leading-relaxed">
            <p>
              Most dental chews on the shelf are full of artificial ingredients, break apart in seconds,
              and do almost nothing for dental health. The ones that actually work cost a fortune and
              taste like cardboard (we assume -- we didn&apos;t try them).
            </p>
            <p>
              So we partnered with veterinary dental specialists and Australian ingredient suppliers to
              build something different: dental chews that dogs genuinely love, made from ingredients
              you can actually pronounce, at a price that doesn&apos;t hurt.
            </p>
            <p>
              Every Chewawa product is made right here in Australia. We know exactly where every
              ingredient comes from, and we test every batch for quality and safety before it ships.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-forest/5 rounded-2xl p-6 text-center"
            >
              <h3 className="font-heading text-base text-forest mb-2">{value.title}</h3>
              <p className="text-sm text-charcoal-muted">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
