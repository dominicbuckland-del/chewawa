'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from './CartProvider'
import { CartDrawer } from './cart/CartDrawer'
import { Logo } from './Logo'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { itemCount, isOpen, setIsOpen } = useCart()

  const links = [
    { href: '/products', label: 'Shop' },
    { href: '/subscribe', label: 'Subscribe' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
  ]

  return (
    <>
      <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-sand shadow-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Logo size="sm" />
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-heading text-charcoal hover:text-forest transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Cart + Mobile toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-charcoal hover:text-forest transition-colors"
                aria-label="Open cart"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-terracotta text-white text-xs font-heading w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-charcoal"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-sand"
            >
              <div className="px-4 py-4 space-y-3 bg-cream">
                {links.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-base font-heading text-charcoal hover:text-forest transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartDrawer open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
