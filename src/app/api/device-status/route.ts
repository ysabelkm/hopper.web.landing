import { NextRequest, NextResponse } from 'next/server';

// Proxies the Supabase check-entitlement Edge Function so the browser never
// needs a Supabase key. Returns the signed token (or null) plus a decoded,
// human-readable status for the /accounts page to display.
//
// Env (Vercel project settings, server-side only):
//   SUPABASE_URL          — e.g. https://<ref>.supabase.co  (no /functions/v1 suffix)
//   HOPPER_PROXY_SECRET   — shared secret authenticating this proxy to the
//                           Edge Functions (must match the Supabase env var of
//                           the same name; requests are rejected without it)

export const runtime = 'nodejs';

interface TokenPayload {
  device_id: string;
  plan: string;
  period_end: string;
  grace_until: string;
}

function decodePayload(token: string | null): TokenPayload | null {
  if (!token) return null;
  try {
    const [b64] = token.split('.');
    const norm = b64.replace(/-/g, '+').replace(/_/g, '/');
    const json = Buffer.from(norm, 'base64').toString('utf-8');
    return JSON.parse(json) as TokenPayload;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const deviceId = req.nextUrl.searchParams.get('device_id') ?? '';
  if (!/^[0-9a-fA-F]{64}$/.test(deviceId)) {
    return NextResponse.json({ error: 'invalid_device_id' }, { status: 400 });
  }

  const base = process.env.SUPABASE_URL;
  if (!base) {
    return NextResponse.json({ error: 'server_misconfigured' }, { status: 500 });
  }

  try {
    const resp = await fetch(`${base}/functions/v1/check-entitlement`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hopper-proxy-secret': process.env.HOPPER_PROXY_SECRET ?? '',
      },
      body: JSON.stringify({ device_id: deviceId.toLowerCase() }),
      cache: 'no-store',
    });
    // An upstream failure must NOT be reported as "no subscription": a 401 or
    // 500 body has no `token`, which would otherwise decode to null and tell a
    // paying customer they have nothing. Only a 200 means the answer is real.
    if (!resp.ok) {
      const err = await resp.json().catch(() => null);
      console.error('device-status upstream failed:', resp.status, err?.error);
      return NextResponse.json({ error: 'upstream_error' }, { status: 502 });
    }

    const data = await resp.json();
    const payload = decodePayload(data?.token ?? null);

    return NextResponse.json({
      hasSubscription: !!payload,
      plan: payload?.plan ?? null,
      periodEnd: payload?.period_end ?? null,
      graceUntil: payload?.grace_until ?? null,
      autoRenew: data?.auto_renew ?? null,
    });
  } catch {
    return NextResponse.json({ error: 'upstream_error' }, { status: 502 });
  }
}
