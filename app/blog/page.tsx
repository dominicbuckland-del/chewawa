'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { blogPosts } from '@/data/blog-posts'
import { Card, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export default function BlogPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-heading text-terracotta tracking-wider uppercase mb-3">Blog</p>
          <h1 className="font-display text-4xl sm:text-5xl text-charcoal">
            The dental health library
          </h1>
          <p className="mt-4 text-charcoal-muted max-w-lg mx-auto">
            Evidence-based guides to keeping your dog&apos;s teeth healthy. Written for Australian pet owners.
          </p>
        </div>

        <div className="space-y-6">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card variant="product" className="overflow-hidden">
                  <CardBody className="flex flex-col sm:flex-row gap-6">
                    <div className="w-full sm:w-48 h-32 bg-sand/50 rounded-xl flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="default">{tag}</Badge>
                        ))}
                      </div>
                      <h2 className="font-heading text-lg text-charcoal group-hover:text-forest transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-charcoal-muted mt-2 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-charcoal-muted">
                        <span>{post.readTime} min read</span>
                        <span>{new Date(post.publishedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
