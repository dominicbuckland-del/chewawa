import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { eventType, productId, productSlug, dogSize, source, metadata } = await req.json()

    // Extract UTM params from referrer or metadata
    const utm = {
      utm_source: metadata?.utm_source || null,
      utm_medium: metadata?.utm_medium || null,
      utm_campaign: metadata?.utm_campaign || null,
    }

    // Try to persist to Supabase if configured
    try {
      const { getServiceClient } = await import('@/lib/supabase-server')
      const supabase = getServiceClient()
      await supabase.from('analytics_events').insert({
        event_type: eventType,
        product_id: productId || null,
        product_slug: productSlug || null,
        dog_size: dogSize || null,
        source: source || null,
        ...utm,
        metadata: metadata || {},
      })
    } catch {
      // Supabase not configured -- log to console
      console.log('Analytics event:', { eventType, productSlug, dogSize, source })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid event' }, { status: 400 })
  }
}
