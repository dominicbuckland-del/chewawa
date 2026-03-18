# Chewawa -- Claude Code Instructions

## Autonomous Operation
- Work autonomously without asking for confirmation on local, reversible changes
- Do not pause to ask about editing, creating, or deleting files
- Only ask the user for input when genuinely blocked

## Project Overview
Next.js 14 App Router e-commerce store for Chewawa -- Australian dental chews for dogs.
Subscription + one-time purchase model. Stripe for payments, Supabase for auth + data.

## Tech Stack
- Next.js 14 App Router, TypeScript, Tailwind CSS
- Framer Motion for animations
- Stripe (Checkout + Billing) for payments
- Supabase (PostgreSQL + Auth) for backend
- Vercel for deployment

## Design Tokens (Tailwind)
- `bg-cream` / `text-cream` = `#FFF8F0` (background)
- `bg-forest` / `text-forest` = `#2D5A3D` (primary)
- `bg-terracotta` / `text-terracotta` = `#D4725C` (CTA/accent)
- `text-charcoal` = `#2C2C2C` (body text)
- `bg-sage` = `#A8C5A0` (secondary)
- `bg-sand` = `#E8DDD0` (borders/dividers)

## Fonts
- Display: Fredoka (`--font-display`) -- logo, hero headlines, section titles
- Body: Nunito (`--font-body`) -- body text, UI, navigation

## Order Flow
1. Customer adds to cart -> clicks checkout
2. POST /api/checkout creates Stripe Checkout Session
3. Customer pays on Stripe hosted page
4. Stripe webhook (POST /api/stripe/webhook) fires checkout.session.completed
5. Webhook creates order in Supabase `orders` table
6. Webhook sends customer confirmation email via Resend
7. Webhook forwards order to supplier email for fulfilment
8. Supplier ships, you update tracking via admin dashboard (/admin)

## Environment Variables Needed
- STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
- NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
- RESEND_API_KEY
- SUPPLIER_EMAIL (where order forwarding emails go)
- ADMIN_API_KEY (simple auth for /admin and /api/orders)

## Coding Conventions
- All components use Tailwind + custom tokens
- Framer Motion for animations (whileInView, initial/animate, AnimatePresence)
- Server components where possible; 'use client' only when needed
- Prices stored in cents (integer), displayed via formatCurrency()
- cn() utility for class merging (lib/utils.ts)

## Key Directories
- `components/ui/` -- design system primitives
- `components/marketing/` -- homepage sections
- `components/product/` -- product display components
- `components/cart/` -- cart system
- `data/` -- static product data (Phase 1)
- `lib/` -- utilities, Stripe client, Supabase clients
- `hooks/` -- custom React hooks
