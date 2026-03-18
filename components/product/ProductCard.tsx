'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { Card, CardBody } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { StarRating } from '../ui/StarRating'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const savings = Math.round(((product.price - product.subscriptionPrice) / product.price) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`/products/${product.slug}`}>
        <Card variant="product" className="group overflow-hidden">
          {/* Image placeholder */}
          <div className="aspect-square bg-sand/50 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-charcoal-muted/30">
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25c0 .828.672 1.5 1.5 1.5z" />
              </svg>
            </div>
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {product.reviewCount > 200 && <Badge variant="bestseller">Best Seller</Badge>}
              {savings > 0 && <Badge variant="sale">Save {savings}%</Badge>}
            </div>
          </div>

          <CardBody>
            <h3 className="font-heading text-base text-charcoal group-hover:text-forest transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-charcoal-muted mt-1 line-clamp-2">{product.shortDescription}</p>

            <div className="flex items-center gap-2 mt-3">
              <StarRating rating={product.rating} size="sm" />
              <span className="text-xs text-charcoal-muted">({product.reviewCount})</span>
            </div>

            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-lg font-heading text-charcoal">{formatPrice(product.price)}</span>
              {product.subscriptionPrice < product.price && (
                <span className="text-sm text-terracotta font-heading">
                  {formatPrice(product.subscriptionPrice)} /sub
                </span>
              )}
            </div>
          </CardBody>
        </Card>
      </Link>
    </motion.div>
  )
}
