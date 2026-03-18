import Link from 'next/link'
import { Logo } from './Logo'

const footerLinks = {
  Shop: [
    { href: '/products', label: 'All Products' },
    { href: '/subscribe', label: 'Subscribe & Save' },
    { href: '/products/variety-pack', label: 'Variety Pack' },
  ],
  Company: [
    { href: '/about', label: 'Our Story' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
  ],
  Support: [
    { href: '/faq', label: 'Help Centre' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-forest text-cream/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center">
              <Logo size="sm" color="white" />
            </Link>
            <p className="mt-4 text-sm text-cream/60 leading-relaxed">
              Australian-made dental chews that clean teeth and keep tails wagging.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-heading text-sm text-white mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-cream/60 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream/40">
            &copy; {new Date().getFullYear()} Chewawa. All rights reserved. Australian owned and operated.
          </p>
          <div className="flex items-center gap-4 text-cream/40">
            <span className="text-xs">Made with care in Australia</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
