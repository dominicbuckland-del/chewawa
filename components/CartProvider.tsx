'use client'
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { CartItem, DogSize } from '@/lib/types'

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (productId: string, dogSize: DogSize) => void
  updateQuantity: (productId: string, dogSize: DogSize, quantity: number) => void
  clearCart: () => void
  itemCount: number
  total: number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | null>(null)

const STORAGE_KEY = 'chewawa-cart'

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setItems(loadCart())
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) saveCart(items)
  }, [items, mounted])

  const addItem = useCallback((newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === newItem.productId && i.dogSize === newItem.dogSize)
      if (existing) {
        return prev.map(i =>
          i.productId === newItem.productId && i.dogSize === newItem.dogSize
            ? { ...i, quantity: i.quantity + (newItem.quantity || 1) }
            : i
        )
      }
      return [...prev, { ...newItem, quantity: newItem.quantity || 1 }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((productId: string, dogSize: DogSize) => {
    setItems(prev => prev.filter(i => !(i.productId === productId && i.dogSize === dogSize)))
  }, [])

  const updateQuantity = useCallback((productId: string, dogSize: DogSize, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, dogSize)
      return
    }
    setItems(prev => prev.map(i =>
      i.productId === productId && i.dogSize === dogSize ? { ...i, quantity } : i
    ))
  }, [removeItem])

  const clearCart = useCallback(() => setItems([]), [])

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const total = items.reduce((sum, i) => {
    const price = i.isSubscription && i.subscriptionPrice ? i.subscriptionPrice : i.price
    return sum + price * i.quantity
  }, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, total, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
