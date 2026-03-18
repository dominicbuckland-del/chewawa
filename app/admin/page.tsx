'use client'
import { useState } from 'react'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface Order {
  id: string
  customer_name: string
  customer_email: string
  status: string
  total: number
  items: { name: string; quantity: number; price: number }[]
  shipping_address: Record<string, string>
  tracking_number: string | null
  supplier_notified: boolean
  created_at: string
}

const statusColors: Record<string, 'default' | 'new' | 'sale' | 'bestseller'> = {
  paid: 'new',
  processing: 'sale',
  shipped: 'bestseller',
  delivered: 'default',
  cancelled: 'default',
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [apiKey, setApiKey] = useState('')
  const [authenticated, setAuthenticated] = useState(false)

  async function fetchOrders() {
    setLoading(true)
    try {
      const res = await fetch(`/api/orders?key=${apiKey}`)
      if (res.ok) {
        const data = await res.json()
        setOrders(data.orders || [])
        setAuthenticated(true)
      } else {
        alert('Invalid admin key')
      }
    } catch {
      alert('Failed to fetch orders')
    }
    setLoading(false)
  }

  async function updateOrder(orderId: string, updates: { status?: string; trackingNumber?: string }) {
    await fetch(`/api/orders?key=${apiKey}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, ...updates }),
    })
    fetchOrders()
  }

  if (!authenticated) {
    return (
      <div className="py-24 max-w-md mx-auto px-4 text-center">
        <h1 className="font-display text-3xl text-charcoal mb-6">Admin Dashboard</h1>
        <input
          type="password"
          placeholder="Admin API key"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          className="w-full px-4 py-3 border-2 border-sand rounded-xl mb-4 text-sm"
          onKeyDown={e => e.key === 'Enter' && fetchOrders()}
        />
        <Button variant="secondary" className="w-full" onClick={fetchOrders}>
          Access Dashboard
        </Button>
      </div>
    )
  }

  const revenue = orders.filter(o => o.status !== 'cancelled' && o.status !== 'refunded').reduce((sum, o) => sum + o.total, 0)
  const pendingOrders = orders.filter(o => o.status === 'paid').length

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl text-charcoal mb-8">Order Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-card">
            <p className="text-xs text-charcoal-muted">Total Orders</p>
            <p className="text-2xl font-heading text-charcoal mt-1">{orders.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-card">
            <p className="text-xs text-charcoal-muted">Revenue</p>
            <p className="text-2xl font-heading text-forest mt-1">{formatPrice(revenue)}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-card">
            <p className="text-xs text-charcoal-muted">Pending Shipment</p>
            <p className="text-2xl font-heading text-terracotta mt-1">{pendingOrders}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-card">
            <p className="text-xs text-charcoal-muted">Avg Order Value</p>
            <p className="text-2xl font-heading text-charcoal mt-1">
              {orders.length > 0 ? formatPrice(Math.round(revenue / orders.length)) : '$0'}
            </p>
          </div>
        </div>

        {/* Orders table */}
        {loading ? (
          <p className="text-charcoal-muted text-center py-12">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-card">
            <p className="text-charcoal-muted">No orders yet. They will appear here once customers start buying.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl p-6 shadow-card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-heading text-sm text-charcoal">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </span>
                      <Badge variant={statusColors[order.status] || 'default'}>
                        {order.status}
                      </Badge>
                      {order.supplier_notified && (
                        <span className="text-xs text-forest">Supplier notified</span>
                      )}
                    </div>
                    <p className="text-sm text-charcoal-muted mt-1">
                      {order.customer_name} ({order.customer_email})
                    </p>
                    <p className="text-xs text-charcoal-muted">
                      {new Date(order.created_at).toLocaleDateString('en-AU', {
                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-lg text-charcoal">{formatPrice(order.total)}</p>
                    <p className="text-xs text-charcoal-muted">
                      {order.items?.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-sand">
                  {order.status === 'paid' && (
                    <Button size="sm" variant="secondary" onClick={() => updateOrder(order.id, { status: 'processing' })}>
                      Mark Processing
                    </Button>
                  )}
                  {(order.status === 'paid' || order.status === 'processing') && (
                    <Button size="sm" variant="primary" onClick={() => {
                      const tracking = prompt('Enter tracking number:')
                      if (tracking) updateOrder(order.id, { status: 'shipped', trackingNumber: tracking })
                    }}>
                      Mark Shipped
                    </Button>
                  )}
                  {order.status === 'shipped' && (
                    <Button size="sm" variant="ghost" onClick={() => updateOrder(order.id, { status: 'delivered' })}>
                      Mark Delivered
                    </Button>
                  )}
                  {order.tracking_number && (
                    <span className="text-xs text-charcoal-muted self-center">
                      Tracking: {order.tracking_number}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
