import { FAQSection } from '@/components/marketing/FAQSection'

export default function FAQPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <h1 className="font-display text-4xl sm:text-5xl text-charcoal">Frequently Asked Questions</h1>
        <p className="mt-4 text-charcoal-muted max-w-lg mx-auto">
          Everything you need to know about Chewawa dental chews.
        </p>
      </div>
      <FAQSection />
    </div>
  )
}
