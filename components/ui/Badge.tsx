import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'sale' | 'new' | 'bestseller'

const variantClasses: Record<BadgeVariant, string> = {
  default:    'bg-sand text-charcoal',
  sale:       'bg-terracotta text-white',
  new:        'bg-forest text-white',
  bestseller: 'bg-sage text-forest-dark',
}

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-heading',
      variantClasses[variant],
      className,
    )}>
      {children}
    </span>
  )
}
