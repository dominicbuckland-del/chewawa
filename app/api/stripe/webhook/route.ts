import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getServiceClient } from '@/lib/supabase-server'
import { sendOrderConfirmation, sendSupplierNotification } from '@/lib/email'
import type Stripe from 'stripe'

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const stripe = getStripe()

  // Get line items for order details
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id)

  const items = lineItems.data.map(item => ({
    name: item.description || 'Unknown product',
    quantity: item.quantity || 1,
    price: item.amount_total || 0,
  }))

  const sessionAny = session as unknown as Record<string, unknown>
  const shippingDetails = sessionAny.shipping_details as { address?: Record<string, string>; name?: string } | undefined
  const shipping = shippingDetails?.address || {}
  const customerName = shippingDetails?.name || session.customer_details?.name || 'Customer'
  const customerEmail = session.customer_details?.email || ''

  // Create order in Supabase
  let orderId = ''
  try {
    const supabase = getServiceClient()
    const { data, error } = await supabase.from('orders').insert({
      stripe_session_id: session.id,
      stripe_payment_intent: typeof session.payment_intent === 'string' ? session.payment_intent : null,
      customer_email: customerEmail,
      customer_name: customerName,
      status: 'paid',
      total: session.amount_total || 0,
      items,
      shipping_address: shipping,
    }).select('id').single()

    if (error) {
      console.error('Supabase order insert error:', error)
      orderId = session.id // fallback
    } else {
      orderId = data.id
    }
  } catch {
    console.error('Supabase not configured -- order logged but not persisted')
    orderId = session.id
  }

  const orderDetails = {
    orderId,
    customerName,
    customerEmail,
    items,
    total: session.amount_total || 0,
    shippingAddress: shipping,
  }

  // Send customer confirmation email
  await sendOrderConfirmation(orderDetails).catch(err =>
    console.error('Customer email failed:', err)
  )

  // Forward order to supplier
  const supplierNotified = await sendSupplierNotification(orderDetails).catch(err => {
    console.error('Supplier notification failed:', err)
    return false
  })

  // Update supplier notification status
  if (supplierNotified && orderId !== session.id) {
    try {
      const supabase = getServiceClient()
      await supabase.from('orders').update({
        supplier_notified: true,
        supplier_notified_at: new Date().toISOString(),
      }).eq('id', orderId)
    } catch {}
  }

  console.log(`Order ${orderId} created for ${customerEmail}`)
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
  }

  try {
    const event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case 'customer.subscription.created': {
        console.log('Subscription created:', (event.data.object as Stripe.Subscription).id)
        try {
          const sub = event.data.object as Stripe.Subscription
          const supabase = getServiceClient()
          await supabase.from('subscriptions').insert({
            stripe_subscription_id: sub.id,
            stripe_customer_id: typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
            customer_email: '',
            plan: 'premium',
            status: sub.status === 'active' ? 'active' : 'past_due',
          })
        } catch {}
        break
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        try {
          const supabase = getServiceClient()
          const statusMap: Record<string, string> = {
            active: 'active', past_due: 'past_due', canceled: 'cancelled', paused: 'paused'
          }
          await supabase.from('subscriptions').update({
            status: statusMap[sub.status] || sub.status,
          }).eq('stripe_subscription_id', sub.id)
        } catch {}
        break
      }

      case 'customer.subscription.deleted': {
        try {
          const supabase = getServiceClient()
          await supabase.from('subscriptions').update({
            status: 'cancelled',
          }).eq('stripe_subscription_id', (event.data.object as Stripe.Subscription).id)
        } catch {}
        break
      }

      default:
        console.log('Unhandled event:', event.type)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 })
  }
}
