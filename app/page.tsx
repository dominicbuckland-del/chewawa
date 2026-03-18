import { HeroSection } from '@/components/marketing/HeroSection'
import { ProductShowcase } from '@/components/marketing/ProductShowcase'
import { TrustSignals } from '@/components/marketing/TrustSignals'
import { HowItWorks } from '@/components/marketing/HowItWorks'
import { SubscriptionPitch } from '@/components/marketing/SubscriptionPitch'
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection'
import { FAQSection } from '@/components/marketing/FAQSection'
import { CTABanner } from '@/components/marketing/CTABanner'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSignals />
      <ProductShowcase />
      <HowItWorks />
      <SubscriptionPitch />
      <TestimonialsSection />
      <FAQSection />
      <CTABanner />
    </>
  )
}
