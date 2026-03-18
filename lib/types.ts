export type DogSize = 'small' | 'medium' | 'large'

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
  dogSizes: DogSize[]
  weightGrams: number
  stock: number
  features: string[]
  ingredients: string
  rating: number
  reviewCount: number
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

export const PLAN_DETAILS: Record<SubscriptionPlan, { name: string; chews: number; price: number; description: string }> = {
  basic:    { name: 'Starter',  chews: 2, price: 2999,  description: '2 dental chews per month' },
  premium:  { name: 'Popular',  chews: 4, price: 4499,  description: '4 dental chews per month' },
  ultimate: { name: 'Ultimate', chews: 6, price: 5999,  description: '6 dental chews + bonus toy' },
}

export const DOG_SIZE_LABELS: Record<DogSize, { label: string; weight: string }> = {
  small:  { label: 'Small',  weight: 'Under 10kg' },
  medium: { label: 'Medium', weight: '10-25kg' },
  large:  { label: 'Large',  weight: 'Over 25kg' },
}
