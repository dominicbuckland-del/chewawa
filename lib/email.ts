import { Resend } from 'resend'

let _resend: Resend | null = null

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

interface OrderItem {
  name: string
  quantity: number
  price: number
  dogSize?: string
}

interface OrderDetails {
  orderId: string
  customerName: string
  customerEmail: string
  items: OrderItem[]
  total: number
  shippingAddress: {
    line1?: string
    line2?: string
    city?: string
    state?: string
    postal_code?: string
    country?: string
  }
}

/** Send order confirmation to customer */
export async function sendOrderConfirmation(order: OrderDetails) {
  const resend = getResend()
  if (!resend) {
    console.log('Resend not configured -- skipping customer email')
    return
  }

  const itemsHtml = order.items.map(item =>
    `<tr>
      <td style="padding:8px 0;border-bottom:1px solid #E8DDD0">${item.name}${item.dogSize ? ` (${item.dogSize})` : ''}</td>
      <td style="padding:8px 0;border-bottom:1px solid #E8DDD0;text-align:center">${item.quantity}</td>
      <td style="padding:8px 0;border-bottom:1px solid #E8DDD0;text-align:right">$${(item.price * item.quantity / 100).toFixed(2)}</td>
    </tr>`
  ).join('')

  const addr = order.shippingAddress
  const addressLine = [addr.line1, addr.line2, addr.city, addr.state, addr.postal_code].filter(Boolean).join(', ')

  await resend.emails.send({
    from: 'Chewawa <orders@chewawa.com.au>',
    to: order.customerEmail,
    subject: `Order confirmed! #${order.orderId.slice(0, 8).toUpperCase()}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#2C2C2C">
        <div style="background:#2D5A3D;padding:24px;text-align:center;border-radius:12px 12px 0 0">
          <h1 style="color:#FFF8F0;margin:0;font-size:24px">chewawa</h1>
        </div>
        <div style="padding:32px 24px;background:#FFF8F0;border:1px solid #E8DDD0;border-top:none;border-radius:0 0 12px 12px">
          <h2 style="margin:0 0 8px;color:#2D5A3D">Thanks for your order, ${order.customerName}!</h2>
          <p style="color:#6B6B6B;margin:0 0 24px">Your dog is going to love this. We're preparing your order now.</p>

          <table style="width:100%;border-collapse:collapse;margin:0 0 24px">
            <thead>
              <tr style="border-bottom:2px solid #2D5A3D">
                <th style="text-align:left;padding:8px 0;color:#2D5A3D">Item</th>
                <th style="text-align:center;padding:8px 0;color:#2D5A3D">Qty</th>
                <th style="text-align:right;padding:8px 0;color:#2D5A3D">Price</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding:12px 0;font-weight:bold;color:#2D5A3D">Total</td>
                <td style="padding:12px 0;font-weight:bold;text-align:right;color:#2D5A3D">$${(order.total / 100).toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <div style="background:white;padding:16px;border-radius:8px;border:1px solid #E8DDD0">
            <p style="margin:0 0 4px;font-weight:bold;color:#2D5A3D">Shipping to:</p>
            <p style="margin:0;color:#6B6B6B">${addressLine}</p>
          </div>

          <p style="color:#6B6B6B;margin:24px 0 0;font-size:14px">
            Free shipping Australia-wide. You'll receive tracking details once your order ships.
          </p>
        </div>
      </div>
    `,
  })
}

/** Forward order to supplier for fulfilment */
export async function sendSupplierNotification(order: OrderDetails) {
  const resend = getResend()
  const supplierEmail = process.env.SUPPLIER_EMAIL

  if (!resend || !supplierEmail) {
    console.log('Resend or supplier email not configured -- skipping supplier notification')
    return false
  }

  const itemsList = order.items.map(item =>
    `- ${item.quantity}x ${item.name}${item.dogSize ? ` (${item.dogSize})` : ''}`
  ).join('\n')

  const addr = order.shippingAddress
  const addressBlock = [
    order.customerName,
    addr.line1,
    addr.line2,
    `${addr.city} ${addr.state} ${addr.postal_code}`,
    addr.country
  ].filter(Boolean).join('\n')

  await resend.emails.send({
    from: 'Chewawa Orders <orders@chewawa.com.au>',
    to: supplierEmail,
    subject: `NEW ORDER #${order.orderId.slice(0, 8).toUpperCase()} - Ship to ${order.customerName}`,
    html: `
      <pre style="font-family:monospace;font-size:14px">
ORDER #${order.orderId.slice(0, 8).toUpperCase()}
Date: ${new Date().toLocaleDateString('en-AU')}

ITEMS:
${itemsList}

SHIP TO:
${addressBlock}

CUSTOMER EMAIL: ${order.customerEmail}
ORDER TOTAL: $${(order.total / 100).toFixed(2)}

Please ship and reply with tracking number.
      </pre>
    `,
  })

  return true
}
