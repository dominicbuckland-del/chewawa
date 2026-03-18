'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useCart } from '../CartProvider'
import { formatPrice } from '@/lib/utils'
import { Button } from '../ui/Button'
import { QuantitySelector } from '../ui/QuantitySelector'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-sand">
              <h2 className="text-lg font-heading text-charcoal">Your Cart</h2>
              <button onClick={onClose} className="p-2 text-charcoal/60 hover:text-charcoal transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-charcoal-muted mb-4">Your cart is empty</p>
                  <Button variant="secondary" size="sm" onClick={onClose}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={`${item.productId}-${item.dogSize}`} className="flex gap-4 bg-white rounded-xl p-4">
                      <div className="w-16 h-16 bg-sand rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-heading text-charcoal truncate">{item.name}</h3>
                        <p className="text-xs text-charcoal-muted capitalize mt-0.5">{item.dogSize}</p>
                        {item.isSubscription && (
                          <span className="text-xs text-terracotta font-heading">Subscribe & Save</span>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <QuantitySelector
                            value={item.quantity}
                            onChange={(q) => updateQuantity(item.productId, item.dogSize, q)}
                            className="scale-90 origin-left"
                          />
                          <span className="text-sm font-heading text-charcoal">
                            {formatPrice((item.isSubscription && item.subscriptionPrice ? item.subscriptionPrice : item.price) * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.dogSize)}
                        className="text-charcoal/30 hover:text-terracotta transition-colors self-start"
                        aria-label="Remove item"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-4 border-t border-sand space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-charcoal-muted">Subtotal</span>
                  <span className="text-lg font-heading text-charcoal">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-charcoal-muted">Shipping calculated at checkout</p>
                <Link href="/cart" onClick={onClose}>
                  <Button variant="primary" size="lg" className="w-full">
                    Checkout
                  </Button>
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-xs text-charcoal-muted hover:text-terracotta transition-colors"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
