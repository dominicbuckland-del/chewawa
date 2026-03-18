'use client'
import { cn } from '@/lib/utils'
import type { DogSize } from '@/lib/types'
import { DOG_SIZE_LABELS } from '@/lib/types'

interface DogSizeSelectorProps {
  value: DogSize
  onChange: (size: DogSize) => void
  available?: DogSize[]
  className?: string
}

export function DogSizeSelector({ value, onChange, available = ['small', 'medium', 'large'], className }: DogSizeSelectorProps) {
  return (
    <div className={cn('flex gap-2', className)}>
      {(Object.keys(DOG_SIZE_LABELS) as DogSize[]).map(size => {
        const isAvailable = available.includes(size)
        const isSelected = value === size
        const { label, weight } = DOG_SIZE_LABELS[size]

        return (
          <button
            key={size}
            onClick={() => isAvailable && onChange(size)}
            disabled={!isAvailable}
            className={cn(
              'flex-1 flex flex-col items-center gap-1 px-4 py-3 rounded-xl border-2 transition-all duration-150',
              isSelected
                ? 'border-forest bg-forest/5 text-forest'
                : isAvailable
                  ? 'border-sand bg-white text-charcoal hover:border-forest/30'
                  : 'border-sand/50 bg-sand/20 text-charcoal/30 cursor-not-allowed',
            )}
          >
            <span className="text-sm font-heading">{label}</span>
            <span className="text-xs text-charcoal-muted">{weight}</span>
          </button>
        )
      })}
    </div>
  )
}
