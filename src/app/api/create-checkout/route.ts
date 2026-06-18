import { NextRequest, NextResponse } from 'next/server';

// Forwards to Supabase's create-checkout-link Edge Function (which holds the
// Paystack secret). The browser only ever talks to this route, never to
// Supabase or Paystack directly.

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  let body: { device_id?: string; email?: string; plan?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const { device_id, email, plan } = body;
  if (!device_id || !/^[0-9a-fA-F]{64}$/.test(device_id)) {
    return NextResponse.json({ error: 'invalid_device_id' }, { status: 400 });
  }
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  }
  if (plan !== 'monthly' && plan !== 'annual') {
    return NextResponse.json({ error: 'invalid_plan' }, { status: 400 });
  }

  const base = process.env.SUPABASE_URL;
  if (!base) {
    return NextResponse.json({ error: 'server_misconfigured' }, { status: 500 });
  }

  try {
    const resp = await fetch(`${base}/functions/v1/create-checkout-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ device_id: device_id.toLowerCase(), email, plan }),
      cache: 'no-store',
    });
    const data = await resp.json();
    if (!resp.ok || !data?.checkout_url) {
      return NextResponse.json({ error: 'checkout_failed' }, { status: 502 });
    }
    return NextResponse.json({ checkout_url: data.checkout_url });
  } catch {
    return NextResponse.json({ error: 'upstream_error' }, { status: 502 });
  }
}
