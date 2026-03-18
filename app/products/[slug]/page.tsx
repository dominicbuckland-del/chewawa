'use client'
import { useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import { getProductBySlug } from '@/data/products'
import { formatPrice, savingsPercent } from '@/lib/utils'
import { useCart } from '@/components/CartProvider'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StarRating } from '@/components/ui/StarRating'
import { DogSizeSelector } from '@/components/ui/DogSizeSelector'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import type { DogSize } from '@/lib/types'

export default function ProductDetailPage() {
  const params = useParams()
  const product = getProductBySlug(params.slug as string)
  const { addItem } = useCart()

  const [selectedSize, setSelectedSize] = useState<DogSize>(product?.dogSizes[0] || 'medium')
  const [quantity, setQuantity] = useState(1)
  const [isSubscription, setIsSubscription] = useState(false)

  if (!product) return notFound()

  const savings = savingsPercent(product.price, product.subscriptionPrice)
  const activePrice = isSubscription ? product.subscriptionPrice : product.price

  function handleAddToCart() {
    addItem({
      productId: product!.id,
      name: product!.name,
      slug: product!.slug,
      price: product!.price,
      image: product!.images[0] || '',
      dogSize: selectedSize,
      isSubscription,
      subscriptionPrice: product!.subscriptionPrice,
      quantity,
    })
  }

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square bg-white rounded-3xl shadow-card flex items-center justify-center">
            <div className="text-charcoal-muted/20">
              <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25c0 .828.672 1.5 1.5 1.5z" />
              </svg>
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              {product.reviewCount > 200 && <Badge variant="bestseller">Best Seller</Badge>}
              {savings > 0 && <Badge variant="sale">Save {savings}% with subscription</Badge>}
            </div>

            <h1 className="font-display text-3xl sm:text-4xl text-charcoal">{product.name}</h1>

            <div className="flex items-center gap-3 mt-3">
              <StarRating rating={product.rating} />
              <span className="text-sm text-charcoal-muted">({product.reviewCount} reviews)</span>
            </div>

            <p className="text-charcoal-muted mt-4 leading-relaxed">{product.description}</p>

            {/* Purchase type toggle */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setIsSubscription(false)}
                className={`flex-1 p-4 rounded-xl border-2 text-left transition-all ${
                  !isSubscription ? 'border-forest bg-forest/5' : 'border-sand'
                }`}
              >
                <span className="text-sm font-heading text-charcoal block">One-time purchase</span>
                <span className="text-lg font-heading text-charcoal mt-1 block">{formatPrice(product.price)}</span>
              </button>
              <button
                onClick={() => setIsSubscription(true)}
                className={`flex-1 p-4 rounded-xl border-2 text-left transition-all ${
                  isSubscription ? 'border-terracotta bg-terracotta/5' : 'border-sand'
                }`}
              >
                <span className="text-sm font-heading text-terracotta block">Subscribe & Save {savings}%</span>
                <span className="text-lg font-heading text-charcoal mt-1 block">
                  {formatPrice(product.subscriptionPrice)}
                  <span className="text-xs text-charcoal-muted font-sans"> /delivery</span>
                </span>
              </button>
            </div>

            {/* Dog size */}
            <div className="mt-6">
              <label className="text-sm font-heading text-charcoal mb-2 block">Dog Size</label>
              <DogSizeSelector value={selectedSize} onChange={setSelectedSize} available={product.dogSizes} />
            </div>

            {/* Quantity + add to cart */}
            <div className="mt-6 flex items-end gap-4">
              <div>
                <label className="text-sm font-heading text-charcoal mb-2 block">Quantity</label>
                <QuantitySelector value={quantity} onChange={setQuantity} />
              </div>
              <Button variant="primary" size="lg" className="flex-1" onClick={handleAddToCart}>
                Add to Cart -- {formatPrice(activePrice * quantity)}
              </Button>
            </div>

            {/* Features */}
            <div className="mt-10 pt-8 border-t border-sand">
              <h3 className="font-heading text-sm text-charcoal mb-4">Key Benefits</h3>
              <ul className="space-y-2">
                {product.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-charcoal-muted">
                    <svg className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ingredients */}
            <div className="mt-6 pt-6 border-t border-sand">
              <h3 className="font-heading text-sm text-charcoal mb-2">Ingredients</h3>
              <p className="text-sm text-charcoal-muted">{product.ingredients}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
