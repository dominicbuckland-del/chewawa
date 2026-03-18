import { cn } from '@/lib/utils'

type Variant = 'product' | 'content' | 'highlight'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant
}

const variantClasses: Record<Variant, string> = {
  product:   'bg-white rounded-2xl shadow-product hover:shadow-product-lift hover:-translate-y-1 transition-all duration-300',
  content:   'bg-white rounded-2xl shadow-card',
  highlight: 'bg-forest text-white rounded-2xl shadow-card',
}

export function Card({ variant = 'content', className, children, ...props }: CardProps) {
  return (
    <div className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </div>
  )
}

export function CardBody({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  )
}
