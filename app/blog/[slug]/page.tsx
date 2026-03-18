'use client'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogBySlug } from '@/data/blog-posts'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export default function BlogPostPage() {
  const params = useParams()
  const post = getBlogBySlug(params.slug as string)

  if (!post) return notFound()

  // Simple markdown-like rendering: split by ## for headings, rest as paragraphs
  const sections = post.content.split('\n\n').map((block, i) => {
    if (block.startsWith('## ')) {
      return (
        <h2 key={i} className="font-heading text-xl text-charcoal mt-8 mb-3">
          {block.replace('## ', '')}
        </h2>
      )
    }
    if (block.startsWith('- ')) {
      const items = block.split('\n').filter(l => l.startsWith('- '))
      return (
        <ul key={i} className="space-y-2 my-4">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-charcoal-muted leading-relaxed">
              <span className="text-forest mt-1.5 flex-shrink-0">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" /></svg>
              </span>
              {item.replace('- ', '')}
            </li>
          ))}
        </ul>
      )
    }
    if (block.startsWith('1. ')) {
      const items = block.split('\n').filter(l => /^\d+\. /.test(l))
      return (
        <ol key={i} className="space-y-2 my-4 list-decimal list-inside">
          {items.map((item, j) => (
            <li key={j} className="text-charcoal-muted leading-relaxed">
              {item.replace(/^\d+\. /, '')}
            </li>
          ))}
        </ol>
      )
    }
    return (
      <p key={i} className="text-charcoal-muted leading-relaxed my-4">
        {block}
      </p>
    )
  })

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link href="/blog" className="text-sm text-forest hover:underline mb-6 inline-block">
          &larr; Back to blog
        </Link>

        {/* Header */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <Badge key={tag} variant="default">{tag}</Badge>
          ))}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-charcoal leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 mt-4 text-sm text-charcoal-muted">
          <span>{post.author}</span>
          <span>{new Date(post.publishedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span>{post.readTime} min read</span>
        </div>

        {/* Cover image placeholder */}
        <div className="w-full h-64 bg-sand/50 rounded-2xl mt-8" />

        {/* Content */}
        <article className="mt-8">
          {sections}
        </article>

        {/* CTA */}
        <div className="mt-12 p-8 bg-forest/5 rounded-2xl text-center">
          <h3 className="font-heading text-lg text-charcoal">Ready to protect your dog&apos;s teeth?</h3>
          <p className="text-sm text-charcoal-muted mt-2">
            VOHC-accepted dental chews, sized for your breed. Subscribe and save 15%.
          </p>
          <div className="mt-4">
            <Link href="/products">
              <Button variant="primary">Shop Dental Chews</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
