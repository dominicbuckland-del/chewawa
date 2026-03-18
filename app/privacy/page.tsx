export default function PrivacyPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl text-charcoal mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-sm text-charcoal-muted leading-relaxed">
          <p>Last updated: March 2026</p>

          <h2 className="font-heading text-base text-charcoal mt-8">Information We Collect</h2>
          <p>When you visit our site or make a purchase, we collect personal information you provide including your name, email, shipping address, and payment details. Payment processing is handled securely by Stripe -- we never store your card details.</p>

          <h2 className="font-heading text-base text-charcoal mt-8">How We Use Your Information</h2>
          <p>We use your information to process orders, manage subscriptions, send order confirmations and shipping updates, and improve our products and services. We may send marketing emails if you opt in -- you can unsubscribe anytime.</p>

          <h2 className="font-heading text-base text-charcoal mt-8">Data Sharing</h2>
          <p>We do not sell your personal information. We share data only with service providers necessary to operate our business: Stripe (payments), our shipping provider, and Vercel (hosting).</p>

          <h2 className="font-heading text-base text-charcoal mt-8">Cookies</h2>
          <p>We use essential cookies to keep your cart and session active. We may use analytics cookies to understand how our site is used. You can disable cookies in your browser settings.</p>

          <h2 className="font-heading text-base text-charcoal mt-8">Your Rights</h2>
          <p>Under Australian Privacy Act 1988, you have the right to access, correct, or delete your personal information. Contact us at hello@chewawa.com.au to make a request.</p>

          <h2 className="font-heading text-base text-charcoal mt-8">Contact</h2>
          <p>For privacy-related questions, email hello@chewawa.com.au.</p>
        </div>
      </div>
    </div>
  )
}
