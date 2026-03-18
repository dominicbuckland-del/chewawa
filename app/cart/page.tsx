'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/components/CartProvider'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { QuantitySelector } from '@/components/ui/QuantitySelector'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  async function handleCheckout() {
    setCheckoutLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            name: item.name,
            price: item.isSubscription && item.subscriptionPrice ? item.subscriptionPrice : item.price,
            quantity: item.quantity,
            image: item.image || undefined,
          })),
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Checkout failed. Please try again.')
        setCheckoutLoading(false)
      }
    } catch {
      alert('Something went wrong. Please try again.')
      setCheckoutLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="max-w-md mx-auto px-4">
          <h1 className="font-display text-3xl text-charcoal mb-4">Your cart is empty</h1>
          <p className="text-charcoal-muted mb-8">
            Looks like you haven&apos;t added any chews yet. Your dog is waiting.
          </p>
          <Link href="/products">
            <Button variant="primary" size="lg">Browse Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl sm:text-4xl text-charcoal mb-10">Your Cart</h1>

        <div className="space-y-4">
          {items.map(item => {
            const price = item.isSubscription && item.subscriptionPrice ? item.subscriptionPrice : item.price
            return (
              <div key={`${item.productId}-${item.dogSize}`} className="flex gap-4 bg-white rounded-2xl p-6 shadow-card">
                <div className="w-20 h-20 bg-sand rounded-xl flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-heading text-base text-charcoal">{item.name}</h3>
                      <p className="text-xs text-charcoal-muted capitalize mt-0.5">{item.dogSize} dog</p>
                      {item.isSubscription && (
                        <span className="text-xs text-terracotta font-heading">Subscribe & Save</span>
                      )}
                    </div>
                    <span className="font-heading text-charcoal">{formatPrice(price * item.quantity)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(q) => updateQuantity(item.productId, item.dogSize, q)}
                    />
                    <button
                      onClick={() => removeItem(item.productId, item.dogSize)}
                      className="text-sm text-charcoal-muted hover:text-terracotta transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-card">
          <div className="flex justify-between items-center pb-4 border-b border-sand">
            <span className="text-charcoal-muted">Subtotal</span>
            <span className="text-xl font-heading text-charcoal">{formatPrice(total)}</span>
          </div>
          <p className="text-xs text-charcoal-muted mt-3">Shipping calculated at checkout. Free on all orders.</p>
          <Button variant="primary" size="lg" className="w-full mt-6" onClick={handleCheckout} loading={checkoutLoading}>
            {checkoutLoading ? 'Redirecting to checkout...' : 'Proceed to Checkout'}
          </Button>
          <div className="flex justify-between mt-4">
            <Link href="/products" className="text-sm text-forest hover:underline">
              Continue shopping
            </Link>
            <button onClick={clearCart} className="text-sm text-charcoal-muted hover:text-terracotta transition-colors">
              Clear cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
