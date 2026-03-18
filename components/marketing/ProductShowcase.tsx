'use client'
import Link from 'next/link'
import { getFeaturedProducts } from '@/data/products'
import { ProductCard } from '../product/ProductCard'
import { Button } from '../ui/Button'

export function ProductShowcase() {
  const featured = getFeaturedProducts()

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-heading text-terracotta tracking-wider uppercase mb-3">Our Products</p>
          <h2 className="font-display text-3xl sm:text-4xl text-charcoal">
            Chews your dog will love
          </h2>
          <p className="mt-4 text-charcoal-muted max-w-lg mx-auto">
            Every chew is naturally sourced, Australian-made, and designed to keep teeth clean and dogs happy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
