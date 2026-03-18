'use client'
import { useState } from 'react'
import { products } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import type { DogSize } from '@/lib/types'

export default function ProductsPage() {
  const [sizeFilter, setSizeFilter] = useState<DogSize | 'all'>('all')

  const filtered = sizeFilter === 'all'
    ? products
    : products.filter(p => p.dogSizes.includes(sizeFilter))

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl text-charcoal">Our Chews</h1>
          <p className="mt-4 text-charcoal-muted max-w-lg mx-auto">
            Every chew is naturally sourced, Australian-made, and designed to keep teeth clean.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-10">
          {(['all', 'small', 'medium', 'large'] as const).map(size => (
            <button
              key={size}
              onClick={() => setSizeFilter(size)}
              className={`px-4 py-2 rounded-xl text-sm font-heading transition-all ${
                sizeFilter === size
                  ? 'bg-forest text-white'
                  : 'bg-white text-charcoal border border-sand hover:border-forest/30'
              }`}
            >
              {size === 'all' ? 'All Sizes' : `${size.charAt(0).toUpperCase() + size.slice(1)} Dogs`}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
