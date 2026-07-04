import { NextRequest, NextResponse } from 'next/server';

// Forwards to Supabase's manage-subscription Edge Function (which holds the
// Flutterwave secret). Toggles auto-renewal on/off for a device.

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  let body: { device_id?: string; action?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const { device_id, action } = body;
  if (!device_id || !/^[0-9a-fA-F]{64}$/.test(device_id)) {
    return NextResponse.json({ error: 'invalid_device_id' }, { status: 400 });
  }
  if (action !== 'enable' && action !== 'disable') {
    return NextResponse.json({ error: 'invalid_action' }, { status: 400 });
  }

  const base = process.env.SUPABASE_URL;
  if (!base) {
    return NextResponse.json({ error: 'server_misconfigured' }, { status: 500 });
  }

  try {
    const resp = await fetch(`${base}/functions/v1/manage-subscription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ device_id: device_id.toLowerCase(), action }),
      cache: 'no-store',
    });
    const data = await resp.json();
    if (!resp.ok) {
      return NextResponse.json({ error: data?.error ?? 'manage_failed' }, { status: 502 });
    }
    return NextResponse.json({ ok: true, auto_renew: data.auto_renew });
  } catch {
    return NextResponse.json({ error: 'upstream_error' }, { status: 502 });
  }
}
