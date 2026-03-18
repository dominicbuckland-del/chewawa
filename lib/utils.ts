import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely, resolving conflicts */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format currency for display (AUD) */
export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
  }).format(cents / 100)
}

/** Format a price from cents to a short display string */
export function formatPrice(cents: number): string {
  const dollars = cents / 100
  return dollars % 1 === 0 ? `$${dollars}` : `$${dollars.toFixed(2)}`
}

/** Calculate subscription savings percentage */
export function savingsPercent(oneTimePrice: number, subscriptionPrice: number): number {
  return Math.round(((oneTimePrice - subscriptionPrice) / oneTimePrice) * 100)
}
