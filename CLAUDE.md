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
- Display: Central Avenue (`--font-display`) -- logo, hero headlines
- Heading: TT Norms Bold (`--font-heading`) -- subheadings, product names, nav
- Body: New Grotesk Square SIX (`--font-body`) -- body text, UI

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
