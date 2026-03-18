import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  max?: number
  size?: 'sm' | 'md'
  className?: string
}

export function StarRating({ rating, max = 5, size = 'md', className }: StarRatingProps) {
  const sizeClass = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5'

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: max }, (_, i) => {
        const fill = Math.min(1, Math.max(0, rating - i))
        return (
          <svg key={i} className={cn(sizeClass, 'flex-shrink-0')} viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`star-${i}-${rating}`}>
                <stop offset={`${fill * 100}%`} stopColor="#D4725C" />
                <stop offset={`${fill * 100}%`} stopColor="#E8DDD0" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#star-${i}-${rating})`}
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        )
      })}
    </div>
  )
}
