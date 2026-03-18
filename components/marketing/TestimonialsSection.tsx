'use client'
import { motion } from 'framer-motion'
import { StarRating } from '../ui/StarRating'
import { Card, CardBody } from '../ui/Card'

const testimonials = [
  {
    name: 'Sarah M.',
    dogName: 'Cooper',
    breed: 'Golden Retriever',
    rating: 5,
    text: 'Cooper goes absolutely mental when the Chewawa box arrives. His breath used to clear a room -- now I actually let him lick my face again.',
  },
  {
    name: 'James T.',
    dogName: 'Biscuit',
    breed: 'French Bulldog',
    rating: 5,
    text: 'Our vet noticed the difference after just one month. Less plaque, healthier gums. Biscuit thinks they\'re treats. Everyone wins.',
  },
  {
    name: 'Michelle K.',
    dogName: 'Luna',
    breed: 'Border Collie',
    rating: 5,
    text: 'The subscription is genius. I never have to remember to buy dental chews and Luna gets excited every time the box shows up.',
  },
  {
    name: 'David R.',
    dogName: 'Rex',
    breed: 'German Shepherd',
    rating: 4,
    text: 'Finally a dental chew that lasts more than 30 seconds with a large dog. The Power Chew Bone keeps Rex busy for ages.',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-heading text-terracotta tracking-wider uppercase mb-3">Reviews</p>
          <h2 className="font-display text-3xl sm:text-4xl text-charcoal">
            Dogs (and their humans) love us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card variant="content" className="h-full">
                <CardBody className="flex flex-col h-full">
                  <StarRating rating={t.rating} size="sm" />
                  <p className="text-sm text-charcoal leading-relaxed mt-4 flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-4 pt-4 border-t border-sand">
                    <p className="text-sm font-heading text-charcoal">{t.name}</p>
                    <p className="text-xs text-charcoal-muted">{t.dogName} the {t.breed}</p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
