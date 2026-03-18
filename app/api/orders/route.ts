import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  // Simple admin auth via query param (replace with proper auth later)
  const adminKey = req.nextUrl.searchParams.get('key')
  if (adminKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { getServiceClient } = await import('@/lib/supabase-server')
    const supabase = getServiceClient()

    const status = req.nextUrl.searchParams.get('status')
    let query = supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(50)

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json({ orders: data })
  } catch (err) {
    console.error('Orders fetch error:', err)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  const adminKey = req.nextUrl.searchParams.get('key')
  if (adminKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { orderId, status, trackingNumber } = await req.json()
    const { getServiceClient } = await import('@/lib/supabase-server')
    const supabase = getServiceClient()

    const updates: Record<string, string> = {}
    if (status) updates.status = status
    if (trackingNumber) updates.tracking_number = trackingNumber

    const { error } = await supabase.from('orders').update(updates).eq('id', orderId)
    if (error) throw error

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Order update error:', err)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}
