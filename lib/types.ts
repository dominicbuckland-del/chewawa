export type DogSize = 'small' | 'medium' | 'large'
export type BoxSlot = 'daily-dental' | 'natural-chew' | 'breed-spotlight'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number              // cents
  subscriptionPrice: number  // cents (discounted)
  images: string[]
  category: string
  boxSlot: BoxSlot           // which subscription box slot this fills
  dogSizes: DogSize[]
  weightGrams: number
  stock: number
  features: string[]
  ingredients: string
  rating: number
  reviewCount: number
  vohcAccepted?: boolean     // VOHC seal of acceptance
  breedNote?: string         // breed-specific education note
}

export interface CartItem {
  productId: string
  name: string
  slug: string
  price: number
  image: string
  dogSize: DogSize
  quantity: number
  isSubscription: boolean
  subscriptionPrice?: number
}

export interface Review {
  id: string
  productId: string
  rating: number
  title: string
  comment: string
  dogName: string
  dogBreed: string
  verifiedPurchase: boolean
  createdAt: string
  authorName: string
}

export type SubscriptionPlan = 'basic' | 'premium' | 'ultimate'
export type SubscriptionFrequency = 'monthly' | 'biweekly'

export interface SubscriptionConfig {
  plan: SubscriptionPlan
  frequency: SubscriptionFrequency
  dogSize: DogSize
}

export const PLAN_DETAILS: Record<SubscriptionPlan, { name: string; items: string; price: number; description: string; slots: BoxSlot[] }> = {
  basic:    { name: 'Essential',  items: 'Daily dental chew (30-pack)', price: 3499,  description: 'VOHC-accepted daily dental chew sized for your dog', slots: ['daily-dental'] },
  premium:  { name: 'Complete',   items: 'Daily dental + natural chew', price: 4999,  description: 'Daily dental chew plus a premium natural enrichment chew', slots: ['daily-dental', 'natural-chew'] },
  ultimate: { name: 'Breed Box',  items: 'Full curated box',           price: 6499,  description: 'Daily dental, natural chew, plus breed-specific spotlight product with education card', slots: ['daily-dental', 'natural-chew', 'breed-spotlight'] },
}

export const DOG_SIZE_LABELS: Record<DogSize, { label: string; weight: string }> = {
  small:  { label: 'Small',  weight: 'Under 10kg' },
  medium: { label: 'Medium', weight: '10-25kg' },
  large:  { label: 'Large',  weight: 'Over 25kg' },
}
